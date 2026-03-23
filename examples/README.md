# Examples

This directory contains practical examples demonstrating the capabilities of the Watsonx Visualization MCP Server.

## Available Examples

### 1. Sales Analysis (`sales-analysis.json`)
**Use Case:** Quarterly sales performance tracking across multiple regions

**Data Structure:**
- Time series data (monthly)
- Multiple dimensions (regions)
- Multiple measures (sales, profit, units)

**Suggested Visualizations:**
- Stacked column chart for regional comparison
- Line chart for trend analysis
- Heatmap for pattern detection

**How to Use:**
```javascript
{
  "tool": "generate_visualization",
  "data": "<contents of sales-analysis.json>",
  "chartType": "stacked column",
  "title": "Q1 2024 Regional Sales Performance"
}
```

### 2. Project Timeline (`project-timeline.json`)
**Use Case:** Software development project tracking and milestone visualization

**Data Structure:**
- Task-based data
- Start and end dates
- Progress tracking
- Team assignments

**Suggested Visualizations:**
- Gantt chart for timeline view

**How to Use:**
```javascript
{
  "tool": "generate_visualization",
  "data": "<contents of project-timeline.json>",
  "chartType": "gantt chart",
  "title": "Software Development Timeline"
}
```

### 3. Network Connections (`network-connections.json`)
**Use Case:** Microservices architecture visualization and traffic analysis

**Data Structure:**
- Source-target relationships
- Connection weights (traffic volume)
- Connection types

**Suggested Visualizations:**
- Network graph for architecture overview

**How to Use:**
```javascript
{
  "tool": "generate_visualization",
  "data": "<contents of network-connections.json>",
  "chartType": "network",
  "title": "System Architecture Network"
}
```

## Testing Examples

You can test these examples using the MCP server:

### Using Node.js
```bash
node examples/test-example.js sales-analysis
```

### Using the MCP Server Directly
```bash
# Start the server
npm start

# In another terminal, send a request with example data
cat examples/sales-analysis.json | node -e "
  const data = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
  console.log(JSON.stringify({
    method: 'tools/call',
    params: {
      name: 'generate_visualization',
      arguments: {
        data: data.data,
        title: data.title,
        includeAnalysis: true
      }
    }
  }));
"
```

## Creating Your Own Examples

When creating new examples, follow this structure:

```json
{
  "title": "Example Title",
  "description": "Brief description of the use case",
  "data": [
    // Your data here
  ],
  "suggestedChartTypes": ["chart1", "chart2"],
  "insights": [
    "Key insight 1",
    "Key insight 2"
  ]
}
```

## Data Format Guidelines

### Time Series Data
```json
[
  { "date": "2024-01-01", "value": 100 },
  { "date": "2024-02-01", "value": 150 }
]
```

### Categorical Data
```json
[
  { "category": "A", "value": 100 },
  { "category": "B", "value": 200 }
]
```

### Network Data
```json
[
  { "source": "Node A", "target": "Node B", "value": 10 },
  { "source": "Node B", "target": "Node C", "value": 20 }
]
```

### Hierarchical Data
```json
[
  { "name": "Root", "parent": "", "value": 100 },
  { "name": "Child 1", "parent": "Root", "value": 50 },
  { "name": "Child 2", "parent": "Root", "value": 50 }
]
```

## Output Formats

All examples can be generated in multiple formats:

- **HTML**: Interactive, responsive visualizations
- **PNG**: Static images for reports
- **Word**: Professional documents with analysis

Specify the format in your request:
```javascript
{
  "outputFormat": "html" // or "png" or "word"
}
```

## Advanced Usage

### Creating Dashboards

Combine multiple examples into a single dashboard:

```javascript
{
  "tool": "create_dashboard",
  "datasets": [
    {
      "data": "<sales-analysis data>",
      "title": "Sales Performance",
      "chartType": "stacked column"
    },
    {
      "data": "<project-timeline data>",
      "title": "Project Timeline",
      "chartType": "gantt chart"
    }
  ],
  "dashboardTitle": "Executive Dashboard",
  "outputFormat": "html"
}
```

### Data Analysis Only

Get insights without visualization:

```javascript
{
  "tool": "analyze_data",
  "data": "<any example data>",
  "analysisType": "statistical" // or "trend", "correlation", "summary"
}
```

## Contributing Examples

To contribute new examples:

1. Create a JSON file following the structure above
2. Test it with the MCP server
3. Add documentation to this README
4. Submit a pull request

## Support

For questions or issues with examples:
- Check the main [README](../README.md)
- Review the [API documentation](../docs/API.md)
- Open an issue on GitHub