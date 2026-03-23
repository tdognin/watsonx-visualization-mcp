#!/usr/bin/env node

/**
 * MCP Server for IBM watsonx Orchestrate
 * Automated Data Visualization and Analysis Tools
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { VisualizationEngine } from '../visualization-engine/index.js';
import { AnalysisEngine } from '../analysis-engine/index.js';
import { OutputGenerator } from '../output-generators/index.js';
import { ChartTypeSelector } from '../utils/chart-type-selector.js';

class WatsonxVisualizationServer {
  constructor() {
    this.server = new Server(
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

    this.visualizationEngine = new VisualizationEngine();
    this.analysisEngine = new AnalysisEngine();
    this.outputGenerator = new OutputGenerator();
    this.chartTypeSelector = new ChartTypeSelector();

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'generate_visualization',
          description: 'Generate data visualizations from JSON data with automatic chart type selection, analysis, and multiple output formats (HTML, PNG, Word)',
          inputSchema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                description: 'JSON data to visualize',
              },
              chartType: {
                type: 'string',
                description: 'Chart type (optional - will auto-select if not provided). Supported: area, boxplot, bar, column, bubble, bullet, crosstab, data player, decision tree, driven analysis, dual axes column, dual axes lines, heatmap, hierarchy bubble, kpi, legacy map, line, line and column, map, marimekko, network, packed bubble, pie, point, radar, radial, scatter, spiral, stacked bar, stacked column, summary, sunburst, table, tornado, tree map, waterfall, wordcloud, gantt chart',
              },
              outputFormat: {
                type: 'string',
                description: 'Output format: html (default), png, word',
                enum: ['html', 'png', 'word'],
              },
              includeAnalysis: {
                type: 'boolean',
                description: 'Include data analysis and synthesis (default: true)',
              },
              title: {
                type: 'string',
                description: 'Chart title (optional)',
              },
              options: {
                type: 'object',
                description: 'Additional chart configuration options',
              },
            },
            required: ['data'],
          },
        },
        {
          name: 'analyze_data',
          description: 'Perform comprehensive data analysis and generate insights without visualization',
          inputSchema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                description: 'JSON data to analyze',
              },
              analysisType: {
                type: 'string',
                description: 'Type of analysis: statistical, trend, correlation, summary',
                enum: ['statistical', 'trend', 'correlation', 'summary'],
              },
            },
            required: ['data'],
          },
        },
        {
          name: 'create_dashboard',
          description: 'Create a comprehensive dashboard with multiple visualizations and analysis',
          inputSchema: {
            type: 'object',
            properties: {
              datasets: {
                type: 'array',
                description: 'Array of datasets with their configurations',
                items: {
                  type: 'object',
                  properties: {
                    data: { type: 'object' },
                    chartType: { type: 'string' },
                    title: { type: 'string' },
                  },
                },
              },
              outputFormat: {
                type: 'string',
                description: 'Output format: html (default), word',
                enum: ['html', 'word'],
              },
              dashboardTitle: {
                type: 'string',
                description: 'Dashboard title',
              },
            },
            required: ['datasets'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'generate_visualization':
            return await this.handleGenerateVisualization(args);
          
          case 'analyze_data':
            return await this.handleAnalyzeData(args);
          
          case 'create_dashboard':
            return await this.handleCreateDashboard(args);
          
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
  }

  async handleGenerateVisualization(args) {
    const {
      data,
      chartType,
      outputFormat = 'html',
      includeAnalysis = true,
      title,
      options = {},
    } = args;

    // Auto-select chart type if not provided
    const selectedChartType = chartType || 
      this.chartTypeSelector.selectChartType(data);

    // Generate analysis if requested
    let analysis = null;
    if (includeAnalysis) {
      analysis = await this.analysisEngine.analyze(data, selectedChartType);
    }

    // Generate visualization
    const visualization = await this.visualizationEngine.generate({
      data,
      chartType: selectedChartType,
      title: title || `${selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)} Chart`,
      options,
    });

    // Generate output in requested format
    const output = await this.outputGenerator.generate({
      visualization,
      analysis,
      format: outputFormat,
      chartType: selectedChartType,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            chartType: selectedChartType,
            outputFormat,
            analysis: analysis?.summary,
            output: output.path || output.content,
            message: `Successfully generated ${selectedChartType} visualization in ${outputFormat} format`,
          }, null, 2),
        },
      ],
    };
  }

  async handleAnalyzeData(args) {
    const { data, analysisType = 'summary' } = args;

    const analysis = await this.analysisEngine.performAnalysis(data, analysisType);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            analysisType,
            results: analysis,
          }, null, 2),
        },
      ],
    };
  }

  async handleCreateDashboard(args) {
    const {
      datasets,
      outputFormat = 'html',
      dashboardTitle = 'Data Analysis Dashboard',
    } = args;

    const dashboardComponents = [];

    // Process each dataset
    for (const dataset of datasets) {
      const chartType = dataset.chartType || 
        this.chartTypeSelector.selectChartType(dataset.data);

      const analysis = await this.analysisEngine.analyze(dataset.data, chartType);
      
      const visualization = await this.visualizationEngine.generate({
        data: dataset.data,
        chartType,
        title: dataset.title || `${chartType} Chart`,
        options: dataset.options || {},
      });

      dashboardComponents.push({
        visualization,
        analysis,
        chartType,
        title: dataset.title,
      });
    }

    // Generate dashboard output
    const output = await this.outputGenerator.generateDashboard({
      components: dashboardComponents,
      format: outputFormat,
      title: dashboardTitle,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            dashboardTitle,
            componentsCount: dashboardComponents.length,
            outputFormat,
            output: output.path || output.content,
            message: `Successfully generated dashboard with ${dashboardComponents.length} visualizations`,
          }, null, 2),
        },
      ],
    };
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('watsonx Visualization MCP server running on stdio');
  }
}

// Start the server
const server = new WatsonxVisualizationServer();
server.run().catch(console.error);

// Made with Bob
