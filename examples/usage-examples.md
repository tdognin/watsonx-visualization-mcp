# Usage Examples

This document provides practical examples of using the Watsonx Visualization MCP Server.

## Example 1: Simple Bar Chart

**Prompt to Agent:**
```
Create a bar chart showing sales by region from this data:
{
  "North America": 125000,
  "Europe": 98000,
  "Asia Pacific": 156000,
  "Latin America": 45000,
  "Middle East": 32000
}
```

**Expected Output:**
- Automatic selection of bar chart (categorical comparison)
- Professional visualization with IBM Carbon styling
- Analysis showing Asia Pacific as top performer
- Insights about regional distribution

## Example 2: Time Series Analysis

**Prompt to Agent:**
```
Show me the trend in monthly revenue over the past 6 months:
[
  {"month": "2024-01", "revenue": 45000},
  {"month": "2024-02", "revenue": 52000},
  {"month": "2024-03", "revenue": 48000},
  {"month": "2024-04", "revenue": 61000},
  {"month": "2024-05", "revenue": 58000},
  {"month": "2024-06", "revenue": 67000}
]
```

**Expected Output:**
- Automatic selection of line chart (temporal data)
- Trend analysis showing upward trajectory
- Growth rate calculation
- Seasonality detection if applicable

## Example 3: Multi-Metric Dashboard

**Prompt to Agent:**
```
Create a comprehensive dashboard for this sales data:
[
  {"month": "2024-01", "revenue": 45000, "expenses": 32000, "profit": 13000},
  {"month": "2024-02", "revenue": 52000, "expenses": 35000, "profit": 17000},
  {"month": "2024-03", "revenue": 48000, "expenses": 33000, "profit": 15000},
  {"month": "2024-04", "revenue": 61000, "expenses": 38000, "profit": 23000},
  {"month": "2024-05", "revenue": 58000, "expenses": 36000, "profit": 22000},
  {"month": "2024-06", "revenue": 67000, "expenses": 40000, "profit": 27000}
]
```

**Expected Output:**
- Multiple visualizations (line charts for trends, KPIs for totals)
- Dual-axis chart showing revenue vs expenses
- Profit margin analysis
- Comprehensive insights across all metrics

## Example 4: Distribution Analysis

**Prompt to Agent:**
```
Visualize this customer satisfaction data:
[
  {"category": "Very Satisfied", "count": 450},
  {"category": "Satisfied", "count": 320},
  {"category": "Neutral", "count": 120},
  {"category": "Dissatisfied", "count": 45},
  {"category": "Very Dissatisfied", "count": 15}
]
```

**Expected Output:**
- Pie chart showing distribution
- Percentage calculations
- Insight about 81% satisfaction rate
- Recommendations for improvement areas

## Example 5: Correlation Analysis

**Prompt to Agent:**
```
Analyze the correlation between advertising spend and sales:
[
  {"advertising": 1000, "sales": 12000},
  {"advertising": 1500, "sales": 15000},
  {"advertising": 2000, "sales": 18000},
  {"advertising": 1200, "sales": 13500},
  {"advertising": 1800, "sales": 17000},
  {"advertising": 2500, "sales": 21000}
]
```

**Expected Output:**
- Scatter plot visualization
- Correlation coefficient calculation
- Trend line showing relationship
- ROI insights

## Example 6: Project Timeline (Gantt Chart)

**Prompt to Agent:**
```
Create a project timeline visualization:
[
  {"task": "Requirements", "start": "2024-01-01", "end": "2024-01-15", "progress": 100},
  {"task": "Design", "start": "2024-01-16", "end": "2024-02-15", "progress": 100},
  {"task": "Development", "start": "2024-02-16", "end": "2024-04-30", "progress": 75},
  {"task": "Testing", "start": "2024-04-15", "end": "2024-05-31", "progress": 30},
  {"task": "Deployment", "start": "2024-06-01", "end": "2024-06-15", "progress": 0}
]
```

**Expected Output:**
- Gantt chart showing timeline
- Progress indicators
- Critical path analysis
- Timeline insights

## Example 7: Hierarchical Data (Treemap)

**Prompt to Agent:**
```
Show the sales distribution across categories and subcategories:
[
  {"category": "Electronics", "subcategory": "Phones", "value": 5000},
  {"category": "Electronics", "subcategory": "Laptops", "value": 8000},
  {"category": "Electronics", "subcategory": "Tablets", "value": 3000},
  {"category": "Clothing", "subcategory": "Men", "value": 4500},
  {"category": "Clothing", "subcategory": "Women", "value": 6000},
  {"category": "Clothing", "subcategory": "Kids", "value": 2500}
]
```

**Expected Output:**
- Treemap or sunburst chart
- Hierarchical visualization
- Category and subcategory breakdown
- Insights about top performers

## Example 8: Outlier Detection

**Prompt to Agent:**
```
Analyze this dataset and identify any outliers:
[
  {"value": 23}, {"value": 25}, {"value": 27}, {"value": 24},
  {"value": 26}, {"value": 28}, {"value": 95}, {"value": 25},
  {"value": 24}, {"value": 26}, {"value": 27}, {"value": 23}
]
```

**Expected Output:**
- Boxplot visualization
- Statistical analysis (mean, median, quartiles)
- Outlier identification (95 is an outlier)
- Recommendations for data quality review

## Example 9: Word Cloud

**Prompt to Agent:**
```
Create a word cloud from this keyword frequency data:
[
  {"word": "innovation", "frequency": 45},
  {"word": "technology", "frequency": 38},
  {"word": "customer", "frequency": 52},
  {"word": "growth", "frequency": 35},
  {"word": "quality", "frequency": 42}
]
```

**Expected Output:**
- Word cloud visualization
- Size proportional to frequency
- Insights about most common themes

## Example 10: Network Visualization

**Prompt to Agent:**
```
Visualize these network connections:
[
  {"source": "Server A", "target": "Server B", "value": 150},
  {"source": "Server A", "target": "Server C", "value": 200},
  {"source": "Server B", "target": "Server D", "value": 100},
  {"source": "Server C", "target": "Server D", "value": 180}
]
```

**Expected Output:**
- Network graph visualization
- Node and edge representation
- Connection strength indicators
- Network topology insights

## Advanced Usage

### Requesting Specific Output Formats

**HTML (Interactive):**
```
Create an interactive HTML visualization of this data: [...]
```

**PNG (Static Image):**
```
Generate a PNG image of sales trends: [...]
Format: PNG
```

**Word Document:**
```
Create a Word document with analysis and charts for this data: [...]
Include full statistical analysis.
Format: Word
```

### Requesting Specific Chart Types

```
Create a heatmap showing correlation between these variables: [...]
```

```
Generate a waterfall chart for this financial data: [...]
```

```
Show this as a radar chart: [...]
```

## Tips for Best Results

1. **Provide Clear Data Structure**
   - Use consistent field names
   - Include appropriate data types
   - Label temporal fields clearly (date, month, year)

2. **Be Specific About Requirements**
   - Mention if you need specific chart type
   - Specify output format if not HTML
   - Request specific analysis types

3. **Ask for Insights**
   - "What insights can you find?"
   - "Are there any outliers?"
   - "What trends do you see?"

4. **Request Recommendations**
   - "What actions should we take?"
   - "How can we improve?"
   - "What's the forecast?"

## Common Use Cases

### Business Intelligence
- Sales performance dashboards
- Revenue trend analysis
- Regional comparisons
- Product performance metrics

### Data Analysis
- Statistical summaries
- Outlier detection
- Correlation analysis
- Distribution analysis

### Project Management
- Timeline visualization (Gantt)
- Progress tracking
- Resource allocation
- Milestone tracking

### Marketing Analytics
- Campaign performance
- Customer segmentation
- Engagement metrics
- Conversion funnels

### Financial Reporting
- Revenue vs expenses
- Profit margins
- Budget tracking
- Waterfall charts for variance

## Troubleshooting

### Data Not Visualizing
- Check JSON format is valid
- Ensure numeric fields are numbers, not strings
- Verify date formats for temporal data

### Wrong Chart Type Selected
- Explicitly request the chart type you want
- Provide more context about the data
- Check data structure matches chart requirements

### Missing Analysis
- Ensure `includeAnalysis: true` (default)
- Request specific analysis types
- Ask follow-up questions about insights

## Next Steps

- Review [API Documentation](../docs/API.md)
- Check [Watsonx Integration Guide](../docs/WATSONX_INTEGRATION.md)
- Explore [Sample Data](sample-data.json)
- Read [Main README](../README.md)