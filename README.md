# Watsonx Visualization MCP Server

A comprehensive Model Context Protocol (MCP) server for automated data visualization and analysis, designed for seamless integration with IBM Watsonx Orchestrate.

## 🎯 Overview

This MCP server provides intelligent data visualization tools that automatically:
- Select the most appropriate chart type based on data structure
- Generate comprehensive data analysis and insights
- Create visualizations in multiple formats (HTML, PNG, Word)
- Support 40+ chart types including advanced visualizations
- Provide statistical analysis, trend detection, and recommendations

## ✨ Features

### Intelligent Chart Selection
Automatically determines the best visualization type based on:
- Data structure and dimensions
- Temporal patterns
- Hierarchical relationships
- Statistical distributions
- Correlation patterns

### Supported Chart Types
- **Basic**: bar, column, line, area, pie
- **Stacked**: stacked bar, stacked column
- **Statistical**: boxplot, scatter, bubble, heatmap
- **Hierarchical**: sunburst, tree map, hierarchy bubble, packed bubble
- **Temporal**: line, area, dual axes lines, dual axes column
- **Specialized**: waterfall, gantt chart, radar, wordcloud, network, tornado
- **KPI**: kpi, bullet
- **Tabular**: table, crosstab
- **Geographic**: map, legacy map
- **Advanced**: marimekko, radial, spiral, decision tree

### Comprehensive Analysis
- Statistical measures (mean, median, std dev, quartiles, etc.)
- Trend detection and forecasting indicators
- Correlation analysis
- Outlier detection
- Pattern recognition
- Actionable recommendations

### Multiple Output Formats
- **HTML**: Interactive, responsive visualizations
- **PNG**: High-quality static images
- **Word**: Professional documents with analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- IBM Watsonx Orchestrate account

### Installation

**Note**: The package is not yet published on npm. Use local installation:

1. Clone the repository:
```bash
git clone https://github.com/tdognin/watsonx-visualization-mcp.git
cd watsonx-visualization-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Run tests to verify installation:
```bash
npm test
```

4. Start the MCP server:
```bash
npm start
```

**📖 Detailed installation guide**: [INSTALLATION_LOCALE.md](INSTALLATION_LOCALE.md)

## 🔧 Configuration

### MCP Server Configuration

The MCP server needs to be configured in your **system configuration file** (not in this project).

**📖 For detailed step-by-step instructions, see [GUIDE_CONFIGURATION_MCP.md](GUIDE_CONFIGURATION_MCP.md)**

Quick configuration example for `~/.config/mcp/settings.json`:

```json
{
  "mcpServers": {
    "watsonx-visualization": {
      "command": "node",
      "args": ["/FULL/PATH/TO/watsonx-visualization-mcp/src/mcp-server/index.js"],
      "env": {}
    }
  }
}
```

**⚠️ Important**: Replace `/FULL/PATH/TO/` with the actual path to your project directory.

### Watsonx Orchestrate Integration

**🚀 Quick Setup Guide**: [SETUP_WATSONX_ORCHESTRATE.md](SETUP_WATSONX_ORCHESTRATE.md) - Step-by-step guide to connect your local MCP server to Watsonx Orchestrate

**📖 Complete Documentation**: [WATSONX_INTEGRATION.md](docs/WATSONX_INTEGRATION.md) - Detailed integration guide with advanced options

## 📖 Usage

### Tool 1: generate_visualization

Generate a single visualization with automatic chart type selection and analysis.

**Parameters:**
- `data` (required): JSON data to visualize
- `chartType` (optional): Specific chart type (auto-selected if not provided)
- `outputFormat` (optional): 'html', 'png', or 'word' (default: 'html')
- `includeAnalysis` (optional): Include data analysis (default: true)
- `title` (optional): Chart title
- `options` (optional): Additional chart configuration

**Example:**
```json
{
  "data": [
    {"month": "Jan", "sales": 1200, "profit": 300},
    {"month": "Feb", "sales": 1500, "profit": 450},
    {"month": "Mar", "sales": 1800, "profit": 600}
  ],
  "title": "Q1 Sales Performance",
  "outputFormat": "html",
  "includeAnalysis": true
}
```

### Tool 2: analyze_data

Perform comprehensive data analysis without visualization.

**Parameters:**
- `data` (required): JSON data to analyze
- `analysisType` (optional): 'statistical', 'trend', 'correlation', or 'summary'

**Example:**
```json
{
  "data": [
    {"product": "A", "sales": 1200, "cost": 800},
    {"product": "B", "sales": 1500, "cost": 900}
  ],
  "analysisType": "statistical"
}
```

### Tool 3: create_dashboard

Create a comprehensive dashboard with multiple visualizations.

**Parameters:**
- `datasets` (required): Array of dataset configurations
- `outputFormat` (optional): 'html' or 'word' (default: 'html')
- `dashboardTitle` (optional): Dashboard title

**Example:**
```json
{
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
```

## 📊 Data Format Examples

### Simple Object Format
```json
{
  "Category A": 100,
  "Category B": 200,
  "Category C": 150
}
```

### Array of Objects Format
```json
[
  {"category": "A", "value": 100, "target": 120},
  {"category": "B", "value": 200, "target": 180},
  {"category": "C", "value": 150, "target": 160}
]
```

### Time Series Format
```json
[
  {"date": "2024-01-01", "sales": 1200, "expenses": 800},
  {"date": "2024-02-01", "sales": 1500, "expenses": 900},
  {"date": "2024-03-01", "sales": 1800, "expenses": 1000}
]
```

### Network Format
```json
[
  {"source": "A", "target": "B", "value": 10},
  {"source": "B", "target": "C", "value": 20},
  {"source": "A", "target": "C", "value": 15}
]
```

### Gantt Chart Format
```json
[
  {"task": "Planning", "start": "2024-01-01", "end": "2024-01-15"},
  {"task": "Development", "start": "2024-01-16", "end": "2024-02-28"},
  {"task": "Testing", "start": "2024-03-01", "end": "2024-03-15"}
]
```

## 🏗️ Architecture

```
watsonx-visualization-mcp/
├── src/
│   ├── mcp-server/          # MCP server implementation
│   ├── visualization-engine/ # Chart generation
│   ├── analysis-engine/      # Data analysis
│   ├── output-generators/    # Format converters
│   └── utils/               # Helper utilities
├── docs/                    # Documentation
├── examples/                # Usage examples
├── tests/                   # Test suites
└── config/                  # Configuration files
```

## 🎨 Styling

All visualizations follow IBM Carbon Design System guidelines:
- IBM Plex Sans font family
- Carbon color palette
- Accessible color contrasts
- Responsive layouts
- Professional styling

## 🧪 Testing

Run tests:
```bash
npm test
```

Run with coverage:
```bash
npm run test:coverage
```

## 📚 Documentation

- [API Reference](docs/API.md) - Complete API documentation
- [Watsonx Integration Guide](docs/WATSONX_INTEGRATION.md) - Setup and integration instructions
- [Examples Guide](examples/run-examples.md) - How to use the examples and MCP server
- [Usage Examples](examples/usage-examples.md) - Practical usage scenarios
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to the project
- [Changelog](CHANGELOG.md) - Version history and updates

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue]
- Documentation: [docs/](docs/)
- Examples: [examples/](examples/)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- 40+ chart types supported
- Intelligent chart selection
- Comprehensive analysis engine
- Multiple output formats
- Watsonx Orchestrate integration

## 🙏 Acknowledgments

- Built with [Model Context Protocol](https://modelcontextprotocol.io/)
- Visualizations powered by [Plotly.js](https://plotly.com/javascript/)
- Styling based on [IBM Carbon Design System](https://carbondesignsystem.com/)
- Document generation with [docx](https://docx.js.org/)

---

**Made with ❤️ for IBM Watsonx Orchestrate**