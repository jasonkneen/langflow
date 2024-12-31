/**
 * Base class for all node types
 */
class BaseNode {
  constructor() {
    this.id = null;
    this.type = "base";
    this.inputs = {};
    this.outputs = {};
    this.data = null;
  }

  /**
   * Set node ID
   * @param {string} id Node ID
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Configure node inputs
   * @param {Object} inputs Input configuration
   * Example:
   * {
   *   inputName: {
   *     type: 'string|number|boolean|array|object',
   *     required: true|false,
   *     description: 'Input description',
   *     default: defaultValue
   *   }
   * }
   */
  setInputs(inputs) {
    this.inputs = inputs;
  }

  /**
   * Configure node outputs
   * @param {Object} outputs Output configuration
   * Example:
   * {
   *   outputName: {
   *     type: 'string|number|boolean|array|object',
   *     description: 'Output description'
   *   }
   * }
   */
  setOutputs(outputs) {
    this.outputs = outputs;
  }

  /**
   * Set node data/configuration
   * @param {Object} data Node configuration data
   */
  setData(data) {
    this.data = data;
  }

  /**
   * Validate input values against configured inputs
   * @param {Object} inputValues Input values to validate
   * @returns {boolean} Whether inputs are valid
   * @throws {Error} If validation fails
   */
  validateInputs(inputValues) {
    // Check all required inputs are present
    for (const [key, config] of Object.entries(this.inputs)) {
      if (config.required && !(key in inputValues)) {
        throw new Error(`Missing required input: ${key}`);
      }

      // If value provided, validate type
      if (key in inputValues && inputValues[key] !== null) {
        const value = inputValues[key];
        const expectedType = config.type.toLowerCase();
        const actualType = Array.isArray(value) ? "array" : typeof value;

        if (actualType !== expectedType) {
          throw new Error(
            `Invalid type for input ${key}. Expected ${expectedType}, got ${actualType}`,
          );
        }
      }
    }
    return true;
  }

  /**
   * Execute node logic
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Output values
   */
  async execute(inputs) {
    throw new Error("Execute method must be implemented");
  }

  /**
   * Get node metadata
   * @returns {Object} Node metadata
   */
  getMetadata() {
    return {
      id: this.id,
      type: this.type,
      inputs: this.inputs,
      outputs: this.outputs,
      data: this.data,
    };
  }

  /**
   * Convert node to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      data: this.data,
      inputs: Object.entries(this.inputs).reduce((acc, [key, config]) => {
        acc[key] = {
          type: config.type,
          required: config.required,
          description: config.description,
          default: config.default,
        };
        return acc;
      }, {}),
      outputs: Object.entries(this.outputs).reduce((acc, [key, config]) => {
        acc[key] = {
          type: config.type,
          description: config.description,
        };
        return acc;
      }, {}),
    };
  }
}

module.exports = BaseNode;
