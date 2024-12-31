require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// CORS configuration middleware
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type']
}));

// Handle preflight requests
app.options("*", cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type']
}));

app.use(express.json());

// Health check endpoint
// Health check endpoint
app.get('/api/v1/health_check', (req, res) => {
  res.json({ status: 'OK' });
});

// Auto login endpoint (no authentication in development)
app.get('/api/v1/auto_login', (req, res) => {
  res.json({
    access_token: 'dev_token',
    token_type: 'bearer',
    user: {
      id: 1,
      username: 'dev',
      is_superuser: true
    }
  });
});

// Logout endpoint
app.post('/api/v1/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Handle React routes by serving index.html for non-API requests
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    next();
  }
});

// Serve static files with proper MIME types and security headers
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      // Set proper MIME types with charset
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      } else if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css; charset=utf-8");
      } else if (filePath.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
      } else if (filePath.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
      } else if (filePath.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      } else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      }

      // Security and caching headers
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader(
        "Content-Security-Policy",
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; img-src 'self' data: blob:; font-src 'self' data:;",
      );
    },
    index: "index.html",
    fallthrough: true,
    dotfiles: "ignore",
    etag: true,
    lastModified: true,
  }),
);

// Base API path
const API_BASE = "/api/v1";

// Mock component data for /all endpoint matching APIObjectType structure
const mockComponents = {
  agents: {
    MCPServer: {
      base_classes: ["BaseNode"],
      description: "MCP Server component for handling agent tasks",
      display_name: "MCP Server",
      documentation: "https://docs.example.com/mcp-server",
      template: {
        base_url: {
          type: "str",
          required: true,
          placeholder: "http://localhost:8000",
          list: false,
          show: true,
          readonly: false,
          value: "http://localhost:8000",
          name: "base_url",
          display_name: "Base URL",
          advanced: false
        }
      },
      icon: "🤖",
      beta: false,
      official: true,
      field_order: ["base_url"]
    },
    ESModule: {
      base_classes: ["BaseNode"],
      description: "ES6 Module component for importing and using JavaScript modules",
      display_name: "ES6 Module",
      documentation: "https://docs.example.com/es-module",
      template: {
        module_path: {
          type: "str",
          required: true,
          placeholder: "./modules/example.js",
          list: false,
          show: true,
          readonly: false,
          name: "module_path",
          display_name: "Module Path",
          advanced: false
        }
      },
      icon: "📦",
      beta: false,
      official: true,
      field_order: ["module_path"]
    }
  },
  functions: {
    JSFunction: {
      base_classes: ["BaseNode"],
      description: "JavaScript function component for custom code execution",
      display_name: "JS Function",
      documentation: "https://docs.example.com/js-function",
      template: {
        code: {
          type: "str",
          required: true,
          placeholder: "function example() { return 'Hello World'; }",
          list: false,
          show: true,
          readonly: false,
          multiline: true,
          name: "code",
          display_name: "Function Code",
          advanced: false
        }
      },
      icon: "⚡",
      beta: false,
      official: true,
      field_order: ["code"]
    }
  },
  classes: {
    JSClass: {
      base_classes: ["BaseNode"],
      description: "JavaScript class component for object-oriented implementations",
      display_name: "JS Class",
      documentation: "https://docs.example.com/js-class",
      template: {
        class_code: {
          type: "str",
          required: true,
          placeholder: "class Example { constructor() {} }",
          list: false,
          show: true,
          readonly: false,
          multiline: true,
          name: "class_code",
          display_name: "Class Code",
          advanced: false
        }
      },
      icon: "🏗️",
      beta: false,
      official: true,
      field_order: ["class_code"]
    }
  }
};

// GET /api/v1/all - Get all component types
app.get(`${API_BASE}/all`, (req, res) => {
  res.json(mockComponents);
});

// Flow storage (in-memory for now)
const flows = new Map();

// Helper to create a flow with default values
const createFlow = (flowData) => {
  const now = new Date().toISOString();
  return {
    id: flowData.id || Date.now().toString(),
    name: flowData.name || "Untitled Flow",
    description: flowData.description || "",
    data: flowData.data || null,
    endpoint_name: flowData.endpoint_name || null,
    style: flowData.style || {
      emoji: "🔄",
      color: "#3b82f6",
      flow_id: flowData.id || Date.now().toString(),
    },
    is_component: flowData.is_component || false,
    last_tested_version: flowData.last_tested_version || null,
    updated_at: now,
    date_created: flowData.date_created || now,
    parent: flowData.parent || null,
    folder: flowData.folder || null,
    user_id: flowData.user_id || null,
    icon: flowData.icon || null,
    gradient: flowData.gradient || null,
    tags: flowData.tags || [],
    icon_bg_color: flowData.icon_bg_color || null,
    folder_id: flowData.folder_id || null,
    webhook: flowData.webhook || false,
    locked: flowData.locked || null,
  };
};

// GET /api/v1/flows - List all flows with proper pagination
app.get(`${API_BASE}/flows`, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const flowList = Array.from(flows.values());
  const start = (page - 1) * size;
  const end = start + size;
  const paginatedFlows = flowList.slice(start, end);

  // Match frontend pagination type
  res.json({
    total: flowList.length,
    flows: paginatedFlows.map(flow => ({
      id: flow.id,
      name: flow.name,
      description: flow.description,
      style: flow.style,
      is_component: flow.is_component || false,
      last_tested_version: flow.last_tested_version,
      updated_at: flow.updated_at,
      data: flow.data,
      folder_id: flow.folder_id,
      user_id: flow.user_id,
      tags: flow.tags || []
    })),
    page,
    page_size: size,
    total_pages: Math.ceil(flowList.length / size),
  });
});

// POST /api/v1/flows - Create new flow
app.post(`${API_BASE}/flows`, (req, res) => {
  const flow = createFlow(req.body);
  flows.set(flow.id, flow);
  res.status(201).json(flow);
});

// GET /api/v1/flows/{id} - Get specific flow
app.get(`${API_BASE}/flows/:id`, (req, res) => {
  const flow = flows.get(req.params.id);
  if (!flow) {
    return res.status(404).json({ error: "Flow not found" });
  }
  res.json(flow);
});

// PUT /api/v1/flows/{id} - Update flow
app.put(`${API_BASE}/flows/:id`, (req, res) => {
  const existingFlow = flows.get(req.params.id);
  if (!existingFlow) {
    return res.status(404).json({ error: "Flow not found" });
  }

  const updatedFlow = createFlow({
    ...existingFlow,
    ...req.body,
    id: req.params.id,
    updated_at: new Date().toISOString(),
  });

  flows.set(req.params.id, updatedFlow);
  res.json(updatedFlow);
});

// DELETE /api/v1/flows/{id} - Delete flow
app.delete(`${API_BASE}/flows/:id`, (req, res) => {
  const flow = flows.get(req.params.id);
  if (!flow) {
    return res.status(404).json({ error: "Flow not found" });
  }
  flows.delete(req.params.id);
  res.status(204).send();
});

// POST /api/v1/validate - Validate flow
app.post(`${API_BASE}/validate`, (req, res) => {
  res.json({ valid: true });
});

// GET /api/v1/flows/download/{flow_id} - Download flow
app.get(`${API_BASE}/flows/download/:id`, (req, res) => {
  const flow = flows.get(req.params.id);
  if (!flow) {
    return res.status(404).json({ error: "Flow not found" });
  }
  res.json(flow);
});

// POST /api/v1/auto_login - Auto login endpoint (disabled in development)
app.post(`${API_BASE}/auto_login`, (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/v1/all_types - Get all component types
app.get(`${API_BASE}/all_types`, (req, res) => {
  // Return available component types based on our mockComponents
  const types = {
    agents: Object.keys(mockComponents.agents || {}),
    functions: Object.keys(mockComponents.functions || {}),
    classes: Object.keys(mockComponents.classes || {}),
    chains: [],
    memories: [],
    llms: [],
    tools: [],
    embeddings: [],
    vectorstores: [],
    documentloaders: [],
    textsplitters: [],
    utilities: [],
    custom_components: [],
    prompts: [],
    retrievers: [],
    output_parsers: [],
    chat: [],
    cache: []
  };
  res.json(types);
});

// GET /api/v1/components - Get all components with proper APIObjectType structure
app.get(`${API_BASE}/components`, (req, res) => {
  // Return components in the exact shape expected by the frontend
  res.json({
    components: {
      agents: mockComponents.agents || {},
      functions: mockComponents.functions || {},
      classes: mockComponents.classes || {},
      chains: {},
      memories: {},
      llms: {},
      tools: {},
      embeddings: {},
      documentLoaders: {},
      vectorStores: {},
      textSplitters: {},
      utilities: {},
      custom_components: {},
      output_parsers: {}
    }
  });
});

// POST /api/v1/build/init/{flow_id} - Initialize flow build
app.post(`${API_BASE}/build/init/:flowId`, (req, res) => {
  const flow = flows.get(req.params.flowId);
  if (!flow) {
    return res.status(404).json({ error: "Flow not found" });
  }

  // Mock build initialization
  const buildStatus = {
    flow_id: req.params.flowId,
    status: "READY", // From BuildStatus enum in frontend
    message: "Flow build initialized",
    vertices: flow.data?.nodes || [],
    edges: flow.data?.edges || [],
  };

  res.json(buildStatus);
});

// GET /api/v1/build/{flow_id}/status - Get flow build status
app.get(`${API_BASE}/build/:flowId/status`, (req, res) => {
  const flow = flows.get(req.params.flowId);
  if (!flow) {
    return res.status(404).json({ error: "Flow not found" });
  }

  // Mock build status
  const buildStatus = {
    flow_id: req.params.flowId,
    status: "READY", // From BuildStatus enum in frontend
    message: "Flow is ready",
    vertices: flow.data?.nodes || [],
    edges: flow.data?.edges || [],
  };

  res.json(buildStatus);
});

// POST /api/v1/run/{flow_id} - Execute flow
app.post(`${API_BASE}/run/:flowId`, async (req, res) => {
  const flow = flows.get(req.params.flowId);
  if (!flow) {
    return res.status(404).json({ error: "Flow not found" });
  }

  try {
    // Mock flow execution with input processing
    const { inputs = {}, tweaks = {} } = req.body;

    // Process each node in the flow (mock implementation)
    const processedNodes =
      flow.data?.nodes?.map((node) => ({
        id: node.id,
        type: node.type,
        output: inputs[node.id] || { message: "Node processed successfully" },
      })) || [];

    res.json({
      flow_id: req.params.flowId,
      status: "SUCCESS",
      result: processedNodes,
      outputs: processedNodes.reduce((acc, node) => {
        acc[node.id] = node.output;
        return acc;
      }, {}),
    });
  } catch (error) {
    res.status(500).json({
      flow_id: req.params.flowId,
      status: "ERROR",
      error: error.message,
    });
  }
});

// POST /api/v1/validate - Validate flow
app.post(`${API_BASE}/validate`, (req, res) => {
  // Mock validation response
  res.json({
    valid: true,
    message: "Flow validation successful",
  });
});

// GET /api/v1/auto_login - Auto login endpoint
app.get(`${API_BASE}/auto_login`, (req, res) => {
  res.json({
    authenticated: true,
    username: "user",
  });
});

// GET /api/v1/components/list - List available components
app.get(`${API_BASE}/components/list`, (req, res) => {
  const componentList = Object.entries(mockComponents).reduce((acc, [type, components]) => {
    Object.entries(components).forEach(([name, details]) => {
      acc.push({
        id: `${type}-${name}`,
        name,
        type,
        ...details,
      });
    });
    return acc;
  }, []);

  res.json(componentList);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 8000; // Local development port
  app.listen(PORT, () => {
    console.log(`Node.js backend running on port ${PORT}`);
  });
}

module.exports = app;
