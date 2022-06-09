import ConfigService from "./config-service";

export class RestrictOrganizationMiddleware {
  configService;

  constructor(configService) {
    this.configService = configService;
  }

  static organizationsRegex = ["furps", "furps_trantor"].join("|");

  static correctOrganizationRegex = new RegExp(
    `/organizations/(${RestrictOrganizationMiddleware.organizationsRegex})`,
    "i"
  );

  // eslint-disable-next-line consistent-return
  use(request, _response, next) {
    const nodeEnv = this.configService.get("NODE_ENV");
    const plasticDbHost = this.configService.get("PLASTIC_DB_HOST");
    if ((nodeEnv === "local" || nodeEnv === "local-plastic") && plasticDbHost === "localhost") {
      return next();
    }

    if (!RestrictOrganizationMiddleware.correctOrganizationRegex.test(request.path)) {
      throw new Error(
        `Only the ${RestrictOrganizationMiddleware.organizationsRegex} organization is allowed on write operation`
      );
    }

    next();
  }
}

jest.mock("./config-service");

describe("ConfigService can be mocked", () => {
  let configService;

  beforeEach(() => {
    configService = new ConfigService();
    configService.get.mockReturnValue("production");
  });

  test("a valid organization can write", () => {
    const middleware = new RestrictOrganizationMiddleware(configService);
    const next = jest.fn();

    middleware.use({ path: "/organizations/furpsw" }, jest.fn(), next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test("an invalid organization can not write", () => {
    const middleware = new RestrictOrganizationMiddleware(configService);
    const next = jest.fn();

    expect(() => middleware.use({ path: "/organizations/pepe" }, jest.fn(), next)).toThrowError();

    expect(next).toHaveBeenCalledTimes(0);
  });

  test("an invalid organization can write in local environment", () => {
    const middleware = new RestrictOrganizationMiddleware(configService);
    configService.get.mockReturnValue("local");
    const next = jest.fn();

    expect(() => middleware.use({ path: "/organizations/pepe" }, jest.fn(), next)).toThrowError();

    expect(next).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    configService.get.mockReset();
  });
});
