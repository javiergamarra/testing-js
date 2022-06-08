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
  configService = null; // FIXME
});

describe("RestrictOrganizationMiddleware limits which organizations can write", () => {
  test("a valid organization can write", () => {
    const middleware = new RestrictOrganizationMiddleware(configService);

    const next = null; // FIXME

    middleware.use({ path: "/organizations/furps" }, null, next); // FIXME

    // expect(configService.get.mock.calls.).toEqual(2); // FIXME
    // expect(next.mock.calls.length).toEqual(1); // FIXME
    // expect(next.mock.calls[0].length).toEqual(0); // FIXME
  });

  test("any organization can write in the local environment", () => {
    const middleware = new RestrictOrganizationMiddleware({ get: jest.fn().mockReturnValue("local") });

    const next = null; // FIXME

    middleware.use({ path: "/organizations/furps" }, null, next);  // FIXME

    expect(next).toHaveBeenCalledTimes(1);
  });

  test("a random organization can not write", () => {
    const middleware = new RestrictOrganizationMiddleware({ get: jest.fn().mockReturnValue("production") });

    const next = null; // FIXME

    middleware.use({ path: "/organizations/non-writable-org" }, jest.fn(), next); // FIXME

    expect(null).toThrowError( // FIXME
      new Error(
        `Only the ${RestrictOrganizationMiddleware.organizationsRegex} organization is allowed on write operation`
      )
    );
    expect(next).toHaveBeenCalledTimes(0);
  });
});
