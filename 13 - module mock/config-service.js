class ConfigService {
  map;

  constructor(map) {
    this.map = map;
  }

  get(key) {
    return this.map.get(key);
  }
}

export default ConfigService;
