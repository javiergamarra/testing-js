export class RestrictOrganizationMiddleware {
  configService;

  constructor(configService) {
    this.configService = configService;
  }

  static organizationsRegex = ['furps', 'furps_trantor'].join('|');

  static correctOrganizationRegex = new RegExp(
    `/organizations/(${RestrictOrganizationMiddleware.organizationsRegex})`,
    'i'
  );

  // eslint-disable-next-line consistent-return
  use(request, _response, next) {
    const nodeEnv = this.configService.get('NODE_ENV');
    const plasticDbHost = this.configService.get('PLASTIC_DB_HOST');
    if ((nodeEnv === 'local' || nodeEnv === 'local-plastic') && plasticDbHost === 'localhost') {
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
