class RestrictOrganizationMiddleware {
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

let configService;

beforeAll(() => {
  configService = { get: jest.fn().mockReturnValue("production") };
});

describe("RestrictOrganizationMiddleware limits which organizations can write", () => {
  test("a valid organization can write", () => {
    const middleware = new RestrictOrganizationMiddleware(configService);

    const next = jest.fn();

    middleware.use({ path: "/organizations/furps" }, jest.fn(), next);

    expect(configService.get.mock.calls.length).toEqual(2);
    expect(next.mock.calls.length).toEqual(1);
    expect(next.mock.calls[0].length).toEqual(0);
  });

  test("any organization can write in the local environment", () => {
    const middleware = new RestrictOrganizationMiddleware({ get: jest.fn().mockReturnValue("local") });

    const next = jest.fn();

    middleware.use({ path: "/organizations/furps" }, jest.fn(), next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test("a random organization can not write", () => {
    const middleware = new RestrictOrganizationMiddleware({ get: jest.fn().mockReturnValue("production") });

    const next = jest.fn();

    const fn = () => middleware.use({ path: "/organizations/non-writable-org" }, jest.fn(), next);

    expect(fn).toThrowError(
      new Error(
        `Only the ${RestrictOrganizationMiddleware.organizationsRegex} organization is allowed on write operation`
      )
    );
    expect(next).toHaveBeenCalledTimes(0);
  });
});
