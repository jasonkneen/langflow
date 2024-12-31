/**
 * Function node implementation
 */
class FunctionNode {
  constructor() {
    this.type = 'function';
    this.inputs = {};
    this.outputs = {};
    this.fn = null;
  }

  /**
   * Set the function to execute
   * @param {Function} fn Function to execute
   */
  setFunction(fn) {
    this.fn = fn;
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
   * Execute the function with given inputs
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Output values
   */
  async execute(inputs) {
    if (!this.fn) {
      throw new Error('No function set');
    }
    return await this.fn(inputs);
  }
}

module.exports = FunctionNode;
