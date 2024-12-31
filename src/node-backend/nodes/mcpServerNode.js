const BaseNode = require("./baseNode");
const axios = require("axios");

/**
 * Node type for MCP (Model Completion Protocol) servers
 */
class MCPServerNode extends BaseNode {
  constructor() {
    super();
    this.type = "mcpserver";
    this.endpoint = null;
    this.apiKey = null;

    // Configure default inputs based on MCP protocol
    this.setInputs({
      prompt: {
        type: "string",
        required: true,
        description: "Input prompt",
      },
      system_prompt: {
        type: "string",
        required: false,
        description: "System prompt",
      },
      temperature: {
        type: "number",
        required: false,
        default: 0.7,
        description: "Sampling temperature",
      },
      max_tokens: {
        type: "number",
        required: false,
        description: "Maximum tokens to generate",
      },
      stop_sequences: {
        type: "array",
        required: false,
        description: "Sequences that will stop generation",
      },
      top_p: {
        type: "number",
        required: false,
        default: 1,
        description: "Nucleus sampling threshold",
      },
    });

    // Configure default outputs
    this.setOutputs({
      completion: {
        type: "string",
        description: "Generated completion",
      },
      usage: {
        type: "object",
        description: "Token usage statistics",
      },
      finish_reason: {
        type: "string",
        description: "Reason why the completion finished",
      },
    });
  }

  /**
   * Set the MCP server endpoint and API key
   * @param {string} endpoint Server endpoint URL
   * @param {string} apiKey Optional API key
   */
  setEndpoint(endpoint, apiKey = null) {
    if (!endpoint) {
      throw new Error("Endpoint URL is required");
    }
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  /**
   * Execute MCP server request
   * @param {Object} inputs Input values
   * @returns {Promise<Object>} Server response
   */
  async execute(inputs) {
    this.validateInputs(inputs);

    if (!this.endpoint) {
      throw new Error("No endpoint configured");
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
      }

      // Make request to MCP server
      const response = await axios.post(
        this.endpoint,
        {
          prompt: inputs.prompt,
          system_prompt: inputs.system_prompt,
          temperature: inputs.temperature,
          max_tokens: inputs.max_tokens,
          stop_sequences: inputs.stop_sequences,
          top_p: inputs.top_p,
        },
        {
          headers,
          timeout: 30000, // 30 second timeout
        },
      );

      return {
        completion: response.data.completion,
        usage: response.data.usage,
        finish_reason: response.data.finish_reason,
      };
    } catch (error) {
      if (error.response) {
        throw new Error(
          `MCP server error: ${error.response.data.error || error.response.statusText}`,
        );
      } else if (error.code === "ECONNABORTED") {
        throw new Error("MCP server request timed out");
      }
      throw error;
    }
  }

  /**
   * Get server metadata
   */
  getMetadata() {
    const metadata = super.getMetadata();
    metadata.endpoint = this.endpoint;
    metadata.hasApiKey = !!this.apiKey;
    return metadata;
  }
}

module.exports = MCPServerNode;
