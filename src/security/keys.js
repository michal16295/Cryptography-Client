class ClientKeys {
  keys = {};

  static setKeys(keys) {
    this.keys = keys;
  }
  static getKeys() {
    return this.keys;
  }
}
export default ClientKeys;
