# 🚀 Running Examples

This guide shows you how to use the watsonx-visualization-mcp package with practical examples.

## Prerequisites

```bash
# Install dependencies
npm install

# Start the MCP server
npm start
```

## Example 1: Sales Analysis

### Data File
See `sales-analysis.json` for the sample data structure.

### Using the MCP Server

Once the server is running, you can send requests to analyze and visualize the sales data:

```javascript
// Example MCP request
{
  "tool": "analyze_and_visualize",
  "arguments": {
    "data": [
      { "month": "Jan", "sales": 12500, "profit": 3200 },
      { "month": "Feb", "sales": 13800, "profit": 3500 },
      { "month": "Mar", "sales": 15200, "profit": 4100 }
    ],
    "chartType": "bar",
    "title": "Monthly Sales Analysis"
  }
}
```

### Expected Output
- Bar chart visualization (PNG)
- Statistical analysis
- Insights and recommendations

## Example 2: Customer Segmentation

### Data Structure
```json
[
  { "customer": "Customer A", "age": 25, "spending": 1200, "visits": 15 },
  { "customer": "Customer B", "age": 35, "spending": 2500, "visits": 25 }
]
```

### MCP Request
```javascript
{
  "tool": "analyze_and_visualize",
  "arguments": {
    "data": [...],
    "chartType": "scatter",
    "title": "Customer Segmentation: Age vs Spending",
    "xAxis": "age",
    "yAxis": "spending"
  }
}
```

## Example 3: Time Series Analysis

### Data File
See `project-timeline.json` for time series data structure.

### MCP Request
```javascript
{
  "tool": "analyze_and_visualize",
  "arguments": {
    "data": [...],
    "chartType": "line",
    "title": "Website Traffic Trend"
  }
}
```

## Using with Watsonx Orchestrate

1. **Configure the MCP Connection**
   - Follow the setup in `README.md`
   - Add the server to your Watsonx Orchestrate instance

2. **Create an Agent**
   - Use the visualization tools in your agent
   - Pass data from your workflows

3. **Example Agent Prompt**
   ```
   "Analyze the sales data and create a visualization showing the trend over time"
   ```

## Direct API Usage (Advanced)

If you want to use the modules directly in your Node.js code:

```javascript
import { AnalysisEngine } from './src/analysis-engine/index.js';
import { VisualizationEngine } from './src/visualization-engine/index.js';

// Analyze data
const analysisEngine = new AnalysisEngine();
const analysis = await analysisEngine.analyzeData(yourData);

// Generate visualization
const vizEngine = new VisualizationEngine();
const chart = await vizEngine.generateChart({
  type: 'bar',
  data: yourData,
  options: {
    title: 'My Chart',
    width: 800,
    height: 600
  }
});
```

## Testing the Examples

Run the unit tests to see the engines in action:

```bash
npm test
```

This will execute 35 tests covering:
- Chart type selection
- Data analysis
- Visualization generation
- Output formatting

## Sample Data Files

All example data files are in JSON format:

- `sales-analysis.json` - Monthly sales data
- `project-timeline.json` - Project milestones
- `network-connections.json` - Network topology data
- `sample-data.json` - Generic sample data

## Output Location

All generated visualizations and reports are saved to the `output/` directory:

```
output/
├── charts/           # Generated chart images
├── reports/          # HTML and Markdown reports
└── exports/          # CSV and JSON exports
```

## Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :3000

# Try a different port
PORT=3001 npm start
```

### Module import errors
The project uses ES modules. Make sure you're using Node.js v18 or higher:
```bash
node --version
```

### Chart generation fails
Ensure all dependencies are installed:
```bash
npm install
```

## Next Steps

1. Review the [API Documentation](../docs/API.md)
2. Check the [Watsonx Integration Guide](../docs/WATSONX_INTEGRATION.md)
3. Explore the [Contributing Guide](../CONTRIBUTING.md)

## Support

For issues or questions:
- Check the main [README.md](../README.md)
- Review the [CHANGELOG.md](../CHANGELOG.md)
- Open an issue on GitHub