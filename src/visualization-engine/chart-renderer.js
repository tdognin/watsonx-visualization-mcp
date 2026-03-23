/**
 * Chart Renderer
 * Renders various chart types using multiple visualization libraries
 */

// Conditional imports for optional dependencies
let createCanvas, Plotly;

try {
  const canvasModule = await import('canvas');
  createCanvas = canvasModule.createCanvas;
} catch (err) {
  console.warn('Canvas module not available. PNG export will be disabled.');
  createCanvas = null;
}

try {
  Plotly = (await import('plotly.js-dist')).default;
} catch (err) {
  console.warn('Plotly module not available in Node.js environment. Some chart types will be limited.');
  Plotly = null;
}

import * as d3 from 'd3';
import { JSDOM } from 'jsdom';

export class ChartRenderer {
  constructor() {
    this.defaultWidth = 800;
    this.defaultHeight = 600;
  }

  /**
   * Main render method - routes to specific chart type renderer
   */
  async render({ data, chartType, title, options = {} }) {
    const width = options.width || this.defaultWidth;
    const height = options.height || this.defaultHeight;

    try {
      switch (chartType) {
        // Basic charts
        case 'bar':
        case 'column':
        case 'stacked bar':
        case 'stacked column':
          return await this.renderBarChart(data, chartType, title, width, height, options);
        
        case 'line':
        case 'area':
          return await this.renderLineChart(data, chartType, title, width, height, options);
        
        case 'pie':
          return await this.renderPieChart(data, title, width, height, options);
        
        // Advanced charts
        case 'scatter':
        case 'bubble':
          return await this.renderScatterChart(data, chartType, title, width, height, options);
        
        case 'heatmap':
          return await this.renderHeatmap(data, title, width, height, options);
        
        case 'boxplot':
          return await this.renderBoxplot(data, title, width, height, options);
        
        // Hierarchical
        case 'sunburst':
          return await this.renderSunburst(data, title, width, height, options);
        
        case 'tree map':
        case 'treemap':
          return await this.renderTreemap(data, title, width, height, options);
        
        case 'network':
          return await this.renderNetwork(data, title, width, height, options);
        
        // Specialized
        case 'waterfall':
          return await this.renderWaterfall(data, title, width, height, options);
        
        case 'gantt chart':
          return await this.renderGantt(data, title, width, height, options);
        
        case 'radar':
          return await this.renderRadar(data, title, width, height, options);
        
        case 'wordcloud':
          return await this.renderWordcloud(data, title, width, height, options);
        
        case 'table':
          return await this.renderTable(data, title, options);
        
        case 'kpi':
          return await this.renderKPI(data, title, options);
        
        // Dual axes
        case 'dual axes lines':
        case 'dual axes column':
          return await this.renderDualAxes(data, chartType, title, width, height, options);
        
        default:
          return await this.renderBarChart(data, 'column', title, width, height, options);
      }
    } catch (error) {
      throw new Error(`Chart rendering failed for ${chartType}: ${error.message}`);
    }
  }

  /**
   * Render bar/column charts
   */
  async renderBarChart(data, chartType, title, width, height, options) {
    const isHorizontal = chartType.includes('bar');
    const isStacked = chartType.includes('stacked');

    const trace = {
      type: isHorizontal ? 'bar' : 'bar',
      orientation: isHorizontal ? 'h' : 'v',
      x: isHorizontal ? data.values : data.labels,
      y: isHorizontal ? data.labels : data.values,
      name: options.seriesName || 'Values',
      marker: {
        color: options.color || '#0f62fe',
      },
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      barmode: isStacked ? 'stack' : 'group',
      xaxis: { title: options.xAxisLabel || '' },
      yaxis: { title: options.yAxisLabel || '' },
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render line/area charts
   */
  async renderLineChart(data, chartType, title, width, height, options) {
    const traces = data.datasets.map((dataset, index) => ({
      type: 'scatter',
      mode: chartType === 'area' ? 'lines' : 'lines+markers',
      fill: chartType === 'area' ? 'tonexty' : 'none',
      x: data.labels,
      y: dataset.data,
      name: dataset.label,
      line: { color: dataset.borderColor },
    }));

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      xaxis: { title: options.xAxisLabel || '' },
      yaxis: { title: options.yAxisLabel || '' },
    };

    return this.generatePlotlyHTML(traces, layout);
  }

  /**
   * Render pie chart
   */
  async renderPieChart(data, title, width, height, options) {
    const trace = {
      type: 'pie',
      labels: data.labels,
      values: data.values,
      textinfo: 'label+percent',
      hoverinfo: 'label+value+percent',
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      showlegend: true,
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render scatter/bubble chart
   */
  async renderScatterChart(data, chartType, title, width, height, options) {
    const trace = {
      type: 'scatter',
      mode: 'markers',
      x: data.series.map(s => s.x),
      y: data.series.map(s => s.y),
      marker: {
        size: chartType === 'bubble' ? data.series.map(s => s.r) : 8,
        color: options.color || '#0f62fe',
      },
      text: data.series.map(s => s.label),
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      xaxis: { title: options.xAxisLabel || 'X' },
      yaxis: { title: options.yAxisLabel || 'Y' },
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render heatmap
   */
  async renderHeatmap(data, title, width, height, options) {
    const trace = {
      type: 'heatmap',
      z: data.matrix.matrix,
      x: data.matrix.cols,
      y: data.matrix.rows,
      colorscale: 'Blues',
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render boxplot
   */
  async renderBoxplot(data, title, width, height, options) {
    const traces = data.datasets.map(dataset => ({
      type: 'box',
      y: dataset.data,
      name: dataset.label,
      boxmean: 'sd',
    }));

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      yaxis: { title: options.yAxisLabel || 'Values' },
    };

    return this.generatePlotlyHTML(traces, layout);
  }

  /**
   * Render sunburst chart
   */
  async renderSunburst(data, title, width, height, options) {
    const trace = {
      type: 'sunburst',
      labels: data.labels,
      parents: data.parents || Array(data.labels.length).fill(''),
      values: data.values,
      branchvalues: 'total',
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render treemap
   */
  async renderTreemap(data, title, width, height, options) {
    const trace = {
      type: 'treemap',
      labels: data.labels,
      parents: data.parents || Array(data.labels.length).fill(''),
      values: data.values,
      textinfo: 'label+value+percent parent',
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render network graph
   */
  async renderNetwork(data, title, width, height, options) {
    // Create edge traces
    const edgeTraces = data.edges.map(edge => ({
      type: 'scatter',
      mode: 'lines',
      x: [edge.source.x, edge.target.x],
      y: [edge.source.y, edge.target.y],
      line: { width: 1, color: '#888' },
      hoverinfo: 'none',
    }));

    // Create node trace
    const nodeTrace = {
      type: 'scatter',
      mode: 'markers+text',
      x: data.nodes.map(n => n.x || Math.random() * width),
      y: data.nodes.map(n => n.y || Math.random() * height),
      text: data.nodes.map(n => n.label),
      textposition: 'top center',
      marker: { size: 15, color: '#0f62fe' },
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      showlegend: false,
      xaxis: { showgrid: false, zeroline: false, showticklabels: false },
      yaxis: { showgrid: false, zeroline: false, showticklabels: false },
    };

    return this.generatePlotlyHTML([...edgeTraces, nodeTrace], layout);
  }

  /**
   * Render waterfall chart
   */
  async renderWaterfall(data, title, width, height, options) {
    const trace = {
      type: 'waterfall',
      x: data.labels,
      y: data.values,
      connector: { line: { color: 'rgb(63, 63, 63)' } },
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      yaxis: { title: options.yAxisLabel || 'Value' },
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render Gantt chart
   */
  async renderGantt(data, title, width, height, options) {
    const tasks = data.tasks.map((task, index) => ({
      x: [new Date(task.start), new Date(task.end)],
      y: [task.task, task.task],
      type: 'scatter',
      mode: 'lines',
      line: { width: 20, color: `hsl(${index * 360 / data.tasks.length}, 70%, 50%)` },
      name: task.task,
    }));

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      xaxis: { type: 'date', title: 'Timeline' },
      yaxis: { title: 'Tasks' },
    };

    return this.generatePlotlyHTML(tasks, layout);
  }

  /**
   * Render radar chart
   */
  async renderRadar(data, title, width, height, options) {
    const trace = {
      type: 'scatterpolar',
      r: data.values,
      theta: data.labels,
      fill: 'toself',
      name: options.seriesName || 'Values',
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      polar: {
        radialaxis: { visible: true, range: [0, Math.max(...data.values) * 1.2] },
      },
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render wordcloud (simplified version)
   */
  async renderWordcloud(data, title, width, height, options) {
    // Create a simple scatter plot representation
    const trace = {
      type: 'scatter',
      mode: 'text',
      x: data.labels.map((_, i) => Math.random() * width),
      y: data.labels.map((_, i) => Math.random() * height),
      text: data.labels,
      textfont: {
        size: data.values.map(v => Math.max(10, Math.min(50, v / Math.max(...data.values) * 50))),
      },
    };

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      xaxis: { showgrid: false, zeroline: false, showticklabels: false },
      yaxis: { showgrid: false, zeroline: false, showticklabels: false },
    };

    return this.generatePlotlyHTML([trace], layout);
  }

  /**
   * Render table
   */
  async renderTable(data, title, options) {
    const headers = data.columns.map(col => `<th>${col}</th>`).join('');
    const rows = data.rows.map(row => {
      const cells = data.columns.map(col => `<td>${row[col]}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return {
      type: 'html',
      content: `
        <div style="font-family: 'IBM Plex Sans', sans-serif;">
          <h2>${title}</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <thead style="background-color: #f4f4f4;">
              <tr>${headers}</tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `,
    };
  }

  /**
   * Render KPI
   */
  async renderKPI(data, title, options) {
    const value = data.values[0] || 0;
    const target = options.target || null;
    const unit = options.unit || '';

    return {
      type: 'html',
      content: `
        <div style="font-family: 'IBM Plex Sans', sans-serif; text-align: center; padding: 40px;">
          <h2 style="color: #161616; margin-bottom: 20px;">${title}</h2>
          <div style="font-size: 72px; font-weight: bold; color: #0f62fe; margin-bottom: 10px;">
            ${value.toLocaleString()}${unit}
          </div>
          ${target ? `<div style="font-size: 18px; color: #525252;">Target: ${target.toLocaleString()}${unit}</div>` : ''}
        </div>
      `,
    };
  }

  /**
   * Render dual axes chart
   */
  async renderDualAxes(data, chartType, title, width, height, options) {
    const traces = data.datasets.map((dataset, index) => ({
      type: chartType.includes('line') ? 'scatter' : 'bar',
      mode: chartType.includes('line') ? 'lines+markers' : undefined,
      x: data.labels,
      y: dataset.data,
      name: dataset.label,
      yaxis: index === 0 ? 'y' : 'y2',
    }));

    const layout = {
      title: { text: title, font: { size: 20 } },
      width,
      height,
      xaxis: { title: options.xAxisLabel || '' },
      yaxis: { title: data.datasets[0]?.label || 'Y1' },
      yaxis2: {
        title: data.datasets[1]?.label || 'Y2',
        overlaying: 'y',
        side: 'right',
      },
    };

    return this.generatePlotlyHTML(traces, layout);
  }

  /**
   * Generate Plotly HTML
   */
  generatePlotlyHTML(traces, layout) {
    const plotlyData = JSON.stringify(traces);
    const plotlyLayout = JSON.stringify(layout);

    return {
      type: 'plotly',
      html: `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
  <style>
    body { font-family: 'IBM Plex Sans', sans-serif; margin: 0; padding: 20px; }
  </style>
</head>
<body>
  <div id="chart"></div>
  <script>
    Plotly.newPlot('chart', ${plotlyData}, ${plotlyLayout}, {responsive: true});
  </script>
</body>
</html>
      `,
      data: traces,
      layout: layout,
    };
  }
}

// Made with Bob