# API Reference

Complete API documentation for the Watsonx Visualization MCP Server.

## Table of Contents

- [Tools](#tools)
  - [generate_visualization](#generate_visualization)
  - [analyze_data](#analyze_data)
  - [create_dashboard](#create_dashboard)
- [Data Formats](#data-formats)
- [Chart Types](#chart-types)
- [Output Formats](#output-formats)
- [Error Handling](#error-handling)

## Tools

### generate_visualization

Generate a single visualization with automatic chart type selection and comprehensive analysis.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Object/Array | Yes | - | JSON data to visualize |
| `chartType` | String | No | Auto-selected | Specific chart type to use |
| `outputFormat` | String | No | `"html"` | Output format: `"html"`, `"png"`, or `"word"` |
| `includeAnalysis` | Boolean | No | `true` | Include data analysis and insights |
| `title` | String | No | Auto-generated | Chart title |
| `options` | Object | No | `{}` | Additional chart configuration |

#### Example Request

```json
{
  "name": "generate_visualization",
  "arguments": {
    "data": [
      {"month": "Jan", "sales": 1200, "profit": 300},
      {"month": "Feb", "sales": 1500, "profit": 450},
      {"month": "Mar", "sales": 1800, "profit": 600}
    ],
    "title": "Q1 Sales Performance",
    "outputFormat": "html",
    "includeAnalysis": true
  }
}
```

#### Response

```json
{
  "success": true,
  "chartType": "line",
  "outputFormat": "html",
  "analysis": {
    "summary": "Analysis of 3 data points with an average value of 1500...",
    "statistics": {
      "count": 3,
      "mean": 1500,
      "median": 1500,
      "min": 1200,
      "max": 1800
    },
    "trends": {
      "overall": "strong upward",
      "direction": "increasing",
      "strength": 0.95
    },
    "insights": [
      {
        "type": "trend",
        "message": "Strong increasing trend detected",
        "impact": "high"
      }
    ]
  },
  "output": "/path/to/output/visualization-line-2024-03-23.html",
  "message": "Successfully generated line visualization in html format"
}
```

---

### analyze_data

Perform comprehensive data analysis without generating a visualization.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `data` | Object/Array | Yes | - | JSON data to analyze |
| `analysisType` | String | No | `"summary"` | Type of analysis: `"statistical"`, `"trend"`, `"correlation"`, or `"summary"` |

#### Example Request

```json
{
  "name": "analyze_data",
  "arguments": {
    "data": [
      {"product": "A", "sales": 1200, "cost": 800},
      {"product": "B", "sales": 1500, "cost": 900},
      {"product": "C", "sales": 1800, "cost": 1000}
    ],
    "analysisType": "statistical"
  }
}
```

#### Response

```json
{
  "success": true,
  "analysisType": "statistical",
  "results": {
    "count": 3,
    "mean": 1500,
    "median": 1500,
    "standardDeviation": 244.95,
    "min": 1200,
    "max": 1800,
    "range": 600,
    "q1": 1200,
    "q3": 1800,
    "iqr": 600,
    "variance": 60000,
    "skewness": 0,
    "kurtosis": -1.5,
    "outliers": []
  }
}
```

---

### create_dashboard

Create a comprehensive dashboard with multiple visualizations.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `datasets` | Array | Yes | - | Array of dataset configurations |
| `outputFormat` | String | No | `"html"` | Output format: `"html"` or `"word"` |
| `dashboardTitle` | String | No | `"Data Analysis Dashboard"` | Dashboard title |

#### Dataset Configuration

Each dataset in the `datasets` array should have:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | Object/Array | Yes | Data for this visualization |
| `chartType` | String | No | Chart type (auto-selected if not provided) |
| `title` | String | No | Title for this chart |
| `options` | Object | No | Additional chart options |

#### Example Request

```json
{
  "name": "create_dashboard",
  "arguments": {
    "datasets": [
      {
        "data": [{"category": "A", "value": 100}],
        "chartType": "pie",
        "title": "Distribution"
      },
      {
        "data": [{"month": "Jan", "sales": 1200}],
        "chartType": "line",
        "title": "Trend"
      }
    ],
    "dashboardTitle": "Sales Dashboard",
    "outputFormat": "html"
  }
}
```

#### Response

```json
{
  "success": true,
  "dashboardTitle": "Sales Dashboard",
  "componentsCount": 2,
  "outputFormat": "html",
  "output": "/path/to/output/dashboard-2024-03-23.html",
  "message": "Successfully generated dashboard with 2 visualizations"
}
```

---

## Data Formats

The MCP server supports multiple data formats:

### Array of Objects

Most common format for structured data:

```json
[
  {"category": "A", "value": 100, "target": 120},
  {"category": "B", "value": 200, "target": 180},
  {"category": "C", "value": 150, "target": 160}
]
```

### Simple Object

Key-value pairs for simple categorical data:

```json
{
  "Category A": 100,
  "Category B": 200,
  "Category C": 150
}
```

### Time Series

Data with temporal dimension:

```json
[
  {"date": "2024-01-01", "sales": 1200, "expenses": 800},
  {"date": "2024-02-01", "sales": 1500, "expenses": 900},
  {"date": "2024-03-01", "sales": 1800, "expenses": 1000}
]
```

### Network/Graph

Source-target relationships:

```json
[
  {"source": "A", "target": "B", "value": 10},
  {"source": "B", "target": "C", "value": 20},
  {"source": "A", "target": "C", "value": 15}
]
```

### Gantt/Timeline

Task-based data with start and end dates:

```json
[
  {"task": "Planning", "start": "2024-01-01", "end": "2024-01-15"},
  {"task": "Development", "start": "2024-01-16", "end": "2024-02-28"},
  {"task": "Testing", "start": "2024-03-01", "end": "2024-03-15"}
]
```

---

## Chart Types

The server supports 40+ chart types with automatic selection:

### Basic Charts
- `bar` - Horizontal bar chart
- `column` - Vertical bar chart
- `line` - Line chart for trends
- `area` - Area chart with fill
- `pie` - Pie chart for part-to-whole

### Stacked Charts
- `stacked bar` - Stacked horizontal bars
- `stacked column` - Stacked vertical bars

### Statistical Charts
- `boxplot` - Box and whisker plot
- `scatter` - Scatter plot for correlation
- `bubble` - Bubble chart with size dimension
- `heatmap` - Heat map for 2D data

### Hierarchical Charts
- `sunburst` - Sunburst diagram
- `tree map` - Tree map visualization
- `hierarchy bubble` - Hierarchical bubble chart
- `packed bubble` - Packed bubble chart

### Temporal Charts
- `dual axes lines` - Dual Y-axis line chart
- `dual axes column` - Dual Y-axis column chart
- `line and column` - Combined line and column

### Specialized Charts
- `waterfall` - Waterfall chart for cumulative data
- `gantt chart` - Gantt chart for project timelines
- `radar` - Radar/spider chart
- `wordcloud` - Word cloud visualization
- `network` - Network graph
- `tornado` - Tornado chart
- `bullet` - Bullet chart for KPIs
- `kpi` - KPI display
- `radial` - Radial chart
- `spiral` - Spiral chart
- `marimekko` - Marimekko chart
- `decision tree` - Decision tree visualization

### Tabular
- `table` - Data table
- `crosstab` - Cross-tabulation table

### Geographic
- `map` - Geographic map
- `legacy map` - Legacy map format

---

## Output Formats

### HTML

Interactive, responsive visualizations using Plotly.js:

```json
{
  "outputFormat": "html"
}
```

**Features:**
- Interactive tooltips
- Zoom and pan
- Responsive design
- IBM Carbon Design styling
- Embedded analysis

### PNG

Static images for reports and presentations:

```json
{
  "outputFormat": "png"
}
```

**Features:**
- High resolution (1200x800 default)
- Suitable for printing
- Embedded in documents

### Word

Professional documents with analysis:

```json
{
  "outputFormat": "word"
}
```

**Features:**
- DOCX format
- Includes full analysis
- Professional formatting
- Ready for reports

---

## Error Handling

### Error Response Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error: <error message>"
    }
  ],
  "isError": true
}
```

### Common Errors

#### Invalid Data

```json
{
  "error": "Data array is empty"
}
```

**Solution:** Ensure data array contains at least one element.

#### Unknown Chart Type

```json
{
  "error": "Unknown tool: invalid_chart_type"
}
```

**Solution:** Use a supported chart type or let the system auto-select.

#### Missing Required Parameter

```json
{
  "error": "Missing required parameter: data"
}
```

**Solution:** Include all required parameters in your request.

---

## Advanced Options

### Chart Options

Additional configuration for fine-tuning visualizations:

```json
{
  "options": {
    "width": 1200,
    "height": 800,
    "xAxisLabel": "Time Period",
    "yAxisLabel": "Revenue ($)",
    "color": "#0f62fe",
    "seriesName": "Sales Data",
    "theme": "light"
  }
}
```

### Analysis Options

Control the depth and type of analysis:

```json
{
  "includeAnalysis": true,
  "analysisType": "comprehensive"
}
```

---

## Rate Limits

No rate limits are currently enforced for local deployments. For production deployments, consider implementing rate limiting based on your infrastructure.

---

## Versioning

Current API version: **1.0.0**

The API follows semantic versioning. Breaking changes will increment the major version number.

---

## Support

For API questions or issues:
- GitHub Issues: [Create an issue](https://github.com/tdognin/watsonx-visualization-mcp/issues)
- Documentation: [Main README](../README.md)
- Examples: [Examples directory](../examples/)