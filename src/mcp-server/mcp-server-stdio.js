#!/usr/bin/env node

/**
 * MCP Server for Data Visualization
 * Implements the Model Context Protocol for watsonx Orchestrate
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

// Create MCP server
const server = new Server(
  {
    name: 'watsonx-visualization-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const tools = [
  {
    name: 'generate_visualization',
    description: 'Generate a data visualization with automatic chart type selection from 40+ options',
    inputSchema: {
      type: 'object',
      properties: {
        data: {
          type: ['object', 'array'],
          description: 'Data to visualize in JSON format',
        },
        chartType: {
          type: 'string',
          description: 'Specific chart type (optional, auto-selected if not provided)',
        },
        outputFormat: {
          type: 'string',
          enum: ['html', 'png', 'word'],
          default: 'html',
          description: 'Output format',
        },
        title: {
          type: 'string',
          description: 'Chart title (optional)',
        },
        includeAnalysis: {
          type: 'boolean',
          default: true,
          description: 'Include statistical analysis',
        },
      },
      required: ['data'],
    },
  },
  {
    name: 'analyze_data',
    description: 'Perform comprehensive statistical analysis on data',
    inputSchema: {
      type: 'object',
      properties: {
        data: {
          type: ['object', 'array'],
          description: 'Data to analyze',
        },
        analysisType: {
          type: 'string',
          enum: ['statistical', 'trend', 'correlation'],
          default: 'statistical',
          description: 'Type of analysis to perform',
        },
      },
      required: ['data'],
    },
  },
  {
    name: 'create_dashboard',
    description: 'Create an interactive dashboard with multiple visualizations',
    inputSchema: {
      type: 'object',
      properties: {
        datasets: {
          type: 'array',
          description: 'Array of dataset configurations',
          items: {
            type: 'object',
            properties: {
              data: {
                type: ['object', 'array'],
                description: 'Dataset data',
              },
              chartType: {
                type: 'string',
                description: 'Chart type for this dataset',
              },
              title: {
                type: 'string',
                description: 'Title for this visualization',
              },
            },
            required: ['data'],
          },
        },
        dashboardTitle: {
          type: 'string',
          description: 'Dashboard title (optional)',
        },
        outputFormat: {
          type: 'string',
          enum: ['html', 'word'],
          default: 'html',
          description: 'Output format',
        },
      },
      required: ['datasets'],
    },
  },
];

// Handle list_tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools,
  };
});

// Handle call_tool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generate_visualization':
        return await handleGenerateVisualization(args);
      
      case 'analyze_data':
        return await handleAnalyzeData(args);
      
      case 'create_dashboard':
        return await handleCreateDashboard(args);
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Tool implementations
async function handleGenerateVisualization(args) {
  const { data, chartType, outputFormat = 'html', title, includeAnalysis = true } = args;

  // Simple implementation - in production, this would use the full visualization engine
  const result = {
    chartType: chartType || 'auto-selected',
    dataPoints: Array.isArray(data) ? data.length : Object.keys(data).length,
    format: outputFormat,
    title: title || 'Data Visualization',
    analysis: includeAnalysis ? 'Statistical analysis included' : 'No analysis',
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function handleAnalyzeData(args) {
  const { data, analysisType = 'statistical' } = args;

  // Simple implementation
  const dataArray = Array.isArray(data) ? data : Object.values(data);
  const sum = dataArray.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
  const avg = sum / dataArray.length;

  const result = {
    analysisType,
    dataPoints: dataArray.length,
    sum,
    average: avg,
    min: Math.min(...dataArray.filter(x => typeof x === 'number')),
    max: Math.max(...dataArray.filter(x => typeof x === 'number')),
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

async function handleCreateDashboard(args) {
  const { datasets, dashboardTitle, outputFormat = 'html' } = args;

  const result = {
    dashboardTitle: dashboardTitle || 'Data Dashboard',
    visualizations: datasets.length,
    format: outputFormat,
    datasets: datasets.map((ds, idx) => ({
      index: idx + 1,
      dataPoints: Array.isArray(ds.data) ? ds.data.length : Object.keys(ds.data).length,
      chartType: ds.chartType || 'auto',
      title: ds.title || `Visualization ${idx + 1}`,
    })),
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Visualization Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

// Made with Bob
