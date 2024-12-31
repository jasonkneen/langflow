const BaseNode = require("./baseNode");

/**
 * Node type for executing JavaScript functions
 */
class FunctionNode extends BaseNode {
  constructor() {
    super();
    this.type = "function";
    this.fn = null;
  }

  /**
   * Set the function to execute and configure inputs/outputs
   * @param {Function} fn Function to execute
   */
  setFunction(fn) {
    if (typeof fn !== "function") {
      throw new Error("Must provide a function");
    }
    this.fn = fn;

    // Configure inputs based on function parameters
    const params = fn
      .toString()
      .match(/\(([^)]*)\)/)[1]
      .split(",")
      .map((param) => param.trim())
      .filter((param) => param);

    const inputs = {};
    params.forEach((param, index) => {
      inputs[param || `arg${index}`] = {
        type: "any",
        required: true,
        description: `Parameter ${index + 1} (${param || `arg${index}`})`,
      };
    });
    this.setInputs(inputs);

    // Configure default output
    this.setOutputs({
      result: {
        type: "any",
        description: "Function return value",
      },
    });
  }

  /**
   * Execute the function with inputs
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Function return value
   */
  async execute(inputs) {
    this.validateInputs(inputs);

    if (!this.fn) {
      throw new Error("No function set");
    }

    // Extract arguments in order specified by inputs configuration
    const args = Object.keys(this.inputs).map((key) => inputs[key]);

    try {
      // Call function with spread arguments
      const result = await this.fn(...args);

      // Handle different return types
      if (result && typeof result === "object") {
        return result;
      }
      return { result };
    } catch (error) {
      throw new Error(`Function execution failed: ${error.message}`);
    }
  }

  /**
   * Get function metadata including parameter info
   */
  getMetadata() {
    const metadata = super.getMetadata();
    if (this.fn) {
      metadata.parameters = this.fn.length;
      metadata.name = this.fn.name;
      metadata.source = this.fn.toString();
    }
    return metadata;
  }
}

module.exports = FunctionNode;
