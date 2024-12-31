/**
 * Base class for implementing class-based nodes
 */
class ClassNode {
  constructor() {
    this.type = 'class';
    this.inputs = {};
    this.outputs = {};
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
   * Execute node logic
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Output values
   */
  async execute(inputs) {
    throw new Error('Execute method must be implemented');
  }
}

module.exports = ClassNode;
