const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware
app.use((req, res, next) => {
  // Basic auth middleware
  const auth = {user: 'user', password: 'c202cd3deb91633fb5483a37b9d7e0ad'};
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (user && password && user === auth.user && password === auth.password) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).send('Authentication required.');
});

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from the frontend build
const staticPath = path.join(__dirname, '../frontend/dist');
console.log('Static files path:', staticPath);
app.use(express.static(staticPath));

// Handle React routing, return all requests to React app
app.get('*', function(req, res, next) {
  console.log('Handling request for path:', req.path);
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(staticPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Base API path
const API_BASE = "/api/v1";

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
      flow_id: flowData.id || Date.now().toString()
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
    locked: flowData.locked || null
  };
};

// GET /api/v1/flows - List all flows
app.get(`${API_BASE}/flows`, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const flowList = Array.from(flows.values());
  const start = (page - 1) * size;
  const end = start + size;
  const paginatedFlows = flowList.slice(start, end);
  
  res.json({
    total: flowList.length,
    items: paginatedFlows,
    page,
    size,
    pages: Math.ceil(flowList.length / size)
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
    updated_at: new Date().toISOString()
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
    edges: flow.data?.edges || []
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
    edges: flow.data?.edges || []
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
    const processedNodes = flow.data?.nodes?.map(node => ({
      id: node.id,
      type: node.type,
      output: inputs[node.id] || { message: "Node processed successfully" }
    })) || [];
    
    res.json({
      flow_id: req.params.flowId,
      status: "SUCCESS",
      result: processedNodes,
      outputs: processedNodes.reduce((acc, node) => {
        acc[node.id] = node.output;
        return acc;
      }, {})
    });
  } catch (error) {
    res.status(500).json({
      flow_id: req.params.flowId,
      status: "ERROR",
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

const PORT = process.env.PORT || 3001; // Match the frontend config port
app.listen(PORT, () => {
  console.log(`Node.js backend running on port ${PORT}`);
});
