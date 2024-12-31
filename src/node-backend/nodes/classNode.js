const BaseNode = require('./baseNode');

/**
 * Node type for representing JavaScript classes
 */
class ClassNode extends BaseNode {
  constructor() {
    super();
    this.type = 'class';
    this.classInstance = null;
    this.ClassDefinition = null;


    // Default inputs for class nodes
    this.setInputs({
      constructorArgs: {
        type: 'array',
        required: false,
        description: 'Arguments to pass to class constructor',
        default: []
      },
      method: {
        type: 'string',
        required: false,
        description: 'Method to call on class instance',
        default: 'execute'
      },
      methodArgs: {
        type: 'array',
        required: false,
        description: 'Arguments to pass to method',
        default: []
      }
    });
  }

  /**
   * Set the class to be instantiated
   * @param {Function} ClassDefinition Class constructor
   */
  setClass(ClassDefinition) {
    if (typeof ClassDefinition !== 'function') {
      throw new Error('Class definition must be a constructor function');
    }
    this.ClassDefinition = ClassDefinition;

    // Update outputs based on class methods
    const methods = Object.getOwnPropertyNames(ClassDefinition.prototype)
      .filter(name => name !== 'constructor');
    
    const outputs = {};
    for (const method of methods) {
      outputs[method] = {
        type: 'any',
        description: `Return value of ${method} method`
      };
    }
    this.setOutputs(outputs);
  }

  /**
   * Execute node by instantiating class and calling method
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Method return value
   */
  async execute(inputs) {
    this.validateInputs(inputs);

    if (!this.ClassDefinition) {
      throw new Error('No class definition set');
    }

    // Create new instance if needed
    if (!this.classInstance) {
      const constructorArgs = inputs.constructorArgs || [];
      this.classInstance = new this.ClassDefinition(...constructorArgs);
    }

    // Call specified method
    const methodName = inputs.method || 'execute';
    if (typeof this.classInstance[methodName] !== 'function') {
      throw new Error(`Method ${methodName} not found on class instance`);
    }

    const methodArgs = inputs.methodArgs || [];
    const result = await this.classInstance[methodName](...methodArgs);

    return { result };
  }

  /**
   * Get class metadata including available methods
   */
  getMetadata() {
    const metadata = super.getMetadata();
    if (this.ClassDefinition) {
      metadata.methods = Object.getOwnPropertyNames(this.ClassDefinition.prototype)
        .filter(name => name !== 'constructor');
    }
    return metadata;
  }
}

module.exports = ClassNode;
