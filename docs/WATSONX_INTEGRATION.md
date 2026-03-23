# Watsonx Orchestrate Integration Guide

Complete guide for integrating the Watsonx Visualization MCP Server with IBM Watsonx Orchestrate.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Prerequisites

Before integrating with Watsonx Orchestrate, ensure you have:

- **Node.js 18+** installed
- **IBM Watsonx Orchestrate** account with appropriate permissions
- **MCP Server** installed and tested locally
- **Network access** if using remote deployment

## Installation Methods

### Method 1: Local STDIO Connection (Recommended)

This method runs the MCP server locally and connects via standard input/output.

#### Step 1: Install Dependencies

```bash
cd watsonx-visualization-mcp
npm install
```

#### Step 2: Test the Server

```bash
npm start
```

You should see: `watsonx Visualization MCP server running on stdio`

#### Step 3: Configure in Watsonx Orchestrate

Add to your MCP configuration file (typically `~/.config/mcp/settings.json` or via Watsonx Orchestrate UI):

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": [
        "/absolute/path/to/watsonx-visualization-mcp/src/mcp-server/index.js"
      ],
      "env": {}
    }
  }
}
```

**Important:** Replace `/absolute/path/to/` with the actual path to your installation.

### Method 2: NPM Global Installation

Install the package globally for easier access:

```bash
npm install -g @tdognin/watsonx-visualization-mcp
```

Then configure:

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "watsonx-viz-mcp",
      "args": [],
      "env": {}
    }
  }
}
```

### Method 3: Remote Server Deployment

For team environments, deploy to a server:

#### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t watsonx-viz-mcp .
docker run -p 3000:3000 watsonx-viz-mcp
```

## Configuration

### Basic Configuration

Minimal configuration for Watsonx Orchestrate:

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": ["/path/to/src/mcp-server/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Advanced Configuration

With custom environment variables:

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": ["/path/to/src/mcp-server/index.js"],
      "env": {
        "NODE_ENV": "production",
        "OUTPUT_DIR": "/custom/output/path",
        "LOG_LEVEL": "info"
      },
      "timeout": 30000,
      "retries": 3
    }
  }
}
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `OUTPUT_DIR` | Output directory for generated files | `./output` |
| `LOG_LEVEL` | Logging level | `error` |

## Usage Examples

### Example 1: Generate Sales Chart

In Watsonx Orchestrate, create a prompt:

```
Generate a visualization of our Q1 sales data:
- January: $125,000
- February: $138,000
- March: $152,000

Include analysis and trends.
```

The MCP server will:
1. Automatically select the best chart type (line chart for temporal data)
2. Generate comprehensive statistical analysis
3. Detect the upward trend
4. Create an interactive HTML visualization

### Example 2: Create Project Timeline

```
Create a Gantt chart for our project:
- Requirements: Jan 1 to Jan 15
- Design: Jan 10 to Jan 30
- Development: Feb 1 to Mar 15
- Testing: Mar 10 to Mar 30
```

### Example 3: Analyze Data

```
Analyze this sales data and provide statistical insights:
Product A: 1200 units
Product B: 1500 units
Product C: 1800 units
Product D: 900 units
```

### Example 4: Create Dashboard

```
Create a dashboard with:
1. Sales by region (pie chart)
2. Monthly trend (line chart)
3. Top products (bar chart)

Use this data: [paste your data]
```

## Integration with Watsonx.ai

### Using as a Tool in Watsonx.ai

The MCP server can be used as a tool in Watsonx.ai workflows:

```python
# In your Watsonx.ai notebook or script
from ibm_watsonx_ai import APIClient

# Configure MCP tool
mcp_tool = {
    "name": "generate_visualization",
    "description": "Generate data visualizations",
    "parameters": {
        "data": {"type": "object"},
        "chartType": {"type": "string"},
        "outputFormat": {"type": "string"}
    }
}

# Use in your workflow
result = client.tools.run(
    tool_name="generate_visualization",
    parameters={
        "data": sales_data,
        "chartType": "line",
        "outputFormat": "html"
    }
)
```

### Prompt Engineering Tips

For best results with Watsonx Orchestrate:

1. **Be Specific About Data Format**
   ```
   Good: "Create a line chart showing sales from Jan to Mar: Jan=1200, Feb=1500, Mar=1800"
   Bad: "Show me sales"
   ```

2. **Specify Output Format When Needed**
   ```
   "Generate a bar chart as PNG for my presentation"
   "Create an HTML dashboard for the web"
   ```

3. **Request Analysis Explicitly**
   ```
   "Analyze this data and show trends"
   "Include statistical insights"
   ```

4. **Use Natural Language**
   ```
   "What's the trend in our sales data?"
   "Compare regions using a stacked column chart"
   ```

## Troubleshooting

### Server Not Starting

**Problem:** MCP server fails to start

**Solutions:**
1. Check Node.js version: `node --version` (must be 18+)
2. Reinstall dependencies: `npm install`
3. Check for port conflicts
4. Review error logs

### Connection Timeout

**Problem:** Watsonx Orchestrate can't connect to MCP server

**Solutions:**
1. Verify the path in configuration is absolute
2. Check file permissions: `chmod +x src/mcp-server/index.js`
3. Test server manually: `npm start`
4. Increase timeout in configuration

### Chart Not Generating

**Problem:** Visualization fails to generate

**Solutions:**
1. Validate data format (must be valid JSON)
2. Check output directory permissions
3. Ensure sufficient disk space
4. Review error messages in response

### Missing Dependencies

**Problem:** Module not found errors

**Solutions:**
```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install

# For optional dependencies
npm install canvas --optional
npm install puppeteer --optional
```

## Best Practices

### 1. Data Preparation

- **Clean your data** before sending to the MCP server
- **Use consistent formats** for dates and numbers
- **Include meaningful labels** for categories
- **Limit data size** for better performance (< 10,000 rows)

### 2. Chart Selection

- **Let auto-selection work** for most cases
- **Override only when necessary** with specific chart types
- **Consider your audience** when choosing visualization types
- **Test different chart types** to find the best representation

### 3. Performance Optimization

- **Cache frequently used visualizations**
- **Use appropriate output formats** (HTML for web, PNG for reports)
- **Batch multiple charts** into dashboards when possible
- **Clean output directory** regularly

### 4. Security

- **Validate input data** before processing
- **Limit file system access** in production
- **Use environment variables** for sensitive configuration
- **Monitor resource usage** to prevent abuse

### 5. Error Handling

- **Always check response status**
- **Implement retry logic** for transient failures
- **Log errors** for debugging
- **Provide fallback options** for critical workflows

## Advanced Integration

### Custom Workflows

Create custom workflows in Watsonx Orchestrate that combine multiple tools:

```yaml
workflow:
  name: "Sales Analysis Pipeline"
  steps:
    - name: "Fetch Data"
      tool: "database_connector"
      
    - name: "Generate Visualization"
      tool: "watsonx-visualization"
      input: "${steps.fetch_data.output}"
      
    - name: "Send Report"
      tool: "email_sender"
      input: "${steps.generate_visualization.output}"
```

### Scheduled Reports

Set up automated report generation:

```json
{
  "schedule": "0 9 * * 1",
  "workflow": "weekly_sales_report",
  "tools": ["watsonx-visualization"],
  "output": "email"
}
```

## Support and Resources

### Documentation
- [Main README](../README.md)
- [API Reference](./API.md)
- [Examples](../examples/)

### Community
- GitHub Issues: [Report bugs](https://github.com/tdognin/watsonx-visualization-mcp/issues)
- Discussions: [Ask questions](https://github.com/tdognin/watsonx-visualization-mcp/discussions)

### IBM Resources
- [Watsonx Orchestrate Documentation](https://www.ibm.com/docs/en/watsonx/orchestrate)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [IBM Carbon Design System](https://carbondesignsystem.com/)

## Version Compatibility

| MCP Server | Watsonx Orchestrate | Node.js |
|------------|---------------------|---------|
| 1.0.x      | Latest              | 18+     |

## Changelog

### Version 1.0.0
- Initial release
- 40+ chart types
- Intelligent chart selection
- Comprehensive analysis engine
- Multiple output formats
- Watsonx Orchestrate integration

---

**Need Help?** Open an issue on GitHub or consult the [API documentation](./API.md).