import ExtraService from "./extra-service";

class ConfigService {
  map;

  constructor(map) {
    this.map = map;
  }

  get(key) {
    return this.map.get(key);
  }

  sayHi() {
    return new ExtraService().sayHi();
  }
}

export default ConfigService;
