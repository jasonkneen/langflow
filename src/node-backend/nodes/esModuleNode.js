const BaseNode = require('./baseNode');

/**
 * Node type for ES6 modules
 */
class ESModuleNode extends BaseNode {
  constructor() {
    super();
    this.type = 'module';
    this.module = null;
    this.exportName = null;

    // Default inputs for module nodes
    this.setInputs({
      args: {
        type: 'array',
        required: false,
        description: 'Arguments to pass to exported function',
        default: []
      }
    });
  }

  /**
   * Set the ES6 module and export to use
   * @param {Object} module Imported module
   * @param {string} exportName Name of export to use
   */
  setModule(module, exportName = 'default') {
    this.module = module;
    this.exportName = exportName;

    // Configure inputs/outputs based on export type
    const moduleExport = this.module[this.exportName];
    if (typeof moduleExport === 'function') {
      // Function export - configure inputs based on parameters
      const params = moduleExport.toString()
        .match(/\(([^)]*)\)/)[1]
        .split(',')
        .map(param => param.trim())
        .filter(param => param);

      const inputs = {
        ...this.inputs,  // Keep default args input
        ...params.reduce((acc, param, index) => {
          acc[param || `arg${index}`] = {
            type: 'any',
            required: true,
            description: `Parameter ${index + 1} (${param || `arg${index}`})`
          };
          return acc;
        }, {})
      };
      this.setInputs(inputs);

      // Configure function output
      this.setOutputs({
        result: {
          type: 'any',
          description: 'Function return value'
        }
      });
    } else if (typeof moduleExport === 'object') {
      // Object export - expose properties as outputs
      const outputs = {};
      for (const [key, value] of Object.entries(moduleExport)) {
        outputs[key] = {
          type: typeof value,
          description: `${key} property`
        };
      }
      this.setOutputs(outputs);
    }
  }

  /**
   * Execute module export
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Export value or function result
   */
  async execute(inputs) {
    this.validateInputs(inputs);

    if (!this.module || !this.exportName) {
      throw new Error('No module or export specified');
    }

    const moduleExport = this.module[this.exportName];
    
    try {
      if (typeof moduleExport === 'function') {
        // Execute function export
        const args = inputs.args || [];
        const result = await moduleExport(...args);
        return { result };
      } else {
        // Return object export directly
        return moduleExport;
      }
    } catch (error) {
      throw new Error(`Module execution failed: ${error.message}`);
    }
  }

  /**
   * Get module metadata including exports info
   */
  getMetadata() {
    const metadata = super.getMetadata();
    if (this.module) {
      metadata.exports = Object.keys(this.module);
      metadata.currentExport = this.exportName;
    }
    return metadata;
  }
}

module.exports = ESModuleNode;
