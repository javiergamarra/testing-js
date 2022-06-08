import ConfigService from "./config-service";
import { RestrictOrganizationMiddleware } from "./restrict-middleware";

describe("ConfigService can be spied", () => {
  const configService = new ConfigService(
    new Map([
      ["NODE_ENV", "local"],
      ["PLASTIC_DB_HOST", "localhost"]
    ])
  );

  test("an invalid organization can write in local environment", () => {
    const middleware = new RestrictOrganizationMiddleware(configService);

    const spy = jest.spyOn(configService, "get");

    const next = jest.fn();

    middleware.use({ path: "/organizations/pepe" }, jest.fn(), next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual("NODE_ENV");
    expect(spy.mock.calls[1][0]).toEqual("PLASTIC_DB_HOST");
  });
});
