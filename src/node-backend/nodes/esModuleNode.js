/**
 * ES Module node implementation
 */
class ESModuleNode {
  constructor() {
    this.type = 'esmodule';
    this.inputs = {};
    this.outputs = {};
    this.module = null;
  }

  /**
   * Import and set the ES module
   * @param {string} modulePath Path to ES module
   */
  async setModule(modulePath) {
    this.module = await import(modulePath);
  }

  /**
   * Configure node inputs
   * @param {Object} inputs Input configuration
   */
  setInputs(inputs) {
    this.inputs = inputs;
  }

  /**
   * Configure node outputs
   * @param {Object} outputs Output configuration
   */
  setOutputs(outputs) {
    this.outputs = outputs;
  }

  /**
   * Execute module logic with given inputs
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Output values
   */
  async execute(inputs) {
    if (!this.module) {
      throw new Error('No module loaded');
    }
    return await this.module.default(inputs);
  }
}

export default ESModuleNode;
