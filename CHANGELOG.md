# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-23

### Added
- Initial release of Watsonx Visualization MCP Server
- Support for 40+ chart types with intelligent auto-selection
- Comprehensive data analysis engine with statistical measures
- Multiple output formats (HTML, PNG, Word)
- Three main tools:
  - `generate_visualization`: Create single visualizations
  - `analyze_data`: Perform data analysis without visualization
  - `create_dashboard`: Generate multi-chart dashboards
- IBM Carbon Design System styling
- Automatic chart type selection based on data structure
- Statistical analysis including:
  - Descriptive statistics (mean, median, std dev, etc.)
  - Trend detection and forecasting indicators
  - Correlation analysis
  - Outlier detection
  - Pattern recognition
- Comprehensive test suite with 35+ unit tests
- Complete documentation:
  - API reference
  - Watsonx Orchestrate integration guide
  - Usage examples
  - Contributing guidelines
- Example datasets for common use cases:
  - Sales analysis
  - Project timelines
  - Network connections

### Chart Types Supported
- Basic: bar, column, line, area, pie
- Stacked: stacked bar, stacked column
- Statistical: boxplot, scatter, bubble, heatmap
- Hierarchical: sunburst, tree map, hierarchy bubble, packed bubble
- Temporal: dual axes lines, dual axes column, line and column
- Specialized: waterfall, gantt chart, radar, wordcloud, network, tornado
- KPI: kpi, bullet
- Tabular: table, crosstab
- Geographic: map, legacy map
- Advanced: marimekko, radial, spiral, decision tree

### Dependencies
- @modelcontextprotocol/sdk: ^1.27.1
- d3: ^7.8.5
- plotly.js-dist: ^2.27.0
- docx: ^8.5.0
- jsdom: ^23.0.1
- puppeteer: ^22.0.0
- express: ^4.18.2
- cors: ^2.8.5

### Documentation
- Complete API documentation
- Integration guide for IBM Watsonx Orchestrate
- Usage examples with real-world scenarios
- Contributing guidelines
- Comprehensive README

### Testing
- 35 unit tests covering core functionality
- Test coverage for:
  - Chart type selection
  - Data analysis engine
  - Visualization engine
  - Output generation

## [Unreleased]

### Planned Features
- Additional chart types (candlestick, funnel, sankey)
- Real-time data streaming support
- Custom theme support
- Export to additional formats (PDF, SVG)
- Interactive dashboard builder
- Data transformation utilities
- Advanced statistical models
- Machine learning integration for predictive analytics

---

## Version History

### Version Numbering
- **Major version** (X.0.0): Breaking changes
- **Minor version** (0.X.0): New features, backward compatible
- **Patch version** (0.0.X): Bug fixes, backward compatible

### Support Policy
- Latest major version: Full support
- Previous major version: Security updates only
- Older versions: No support

### Upgrade Guide

#### From 0.x to 1.0
This is the initial stable release. No upgrade path needed.

---

For more information, see:
- [README](README.md)
- [API Documentation](docs/API.md)
- [Contributing Guidelines](CONTRIBUTING.md)