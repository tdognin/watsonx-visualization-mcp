/**
 * Visualization Engine
 * Generates charts and graphs based on data and configuration
 */

import { ChartRenderer } from './chart-renderer.js';
import { ChartStyler } from './chart-styler.js';

export class VisualizationEngine {
  constructor() {
    this.renderer = new ChartRenderer();
    this.styler = new ChartStyler();
  }

  /**
   * Generate visualization from data and configuration
   */
  async generate({ data, chartType, title, options = {} }) {
    try {
      // Apply IBM design standards and styling
      const styledOptions = this.styler.applyStyles(chartType, options);

      // Prepare data for the specific chart type
      const preparedData = this.prepareData(data, chartType);

      // Generate the chart
      const chart = await this.renderer.render({
        data: preparedData,
        chartType,
        title,
        options: styledOptions,
      });

      return {
        chartType,
        title,
        chart,
        metadata: {
          dataPoints: this.getDataPointCount(data),
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new Error(`Visualization generation failed: ${error.message}`);
    }
  }

  /**
   * Prepare data based on chart type requirements
   */
  prepareData(data, chartType) {
    const preparedData = {
      raw: data,
      labels: [],
      datasets: [],
      series: [],
    };

    if (Array.isArray(data)) {
      if (data.length === 0) {
        throw new Error('Data array is empty');
      }

      const keys = Object.keys(data[0]);
      
      switch (chartType) {
        case 'pie':
        case 'sunburst':
        case 'tree map':
        case 'wordcloud':
          preparedData.labels = data.map(row => row[keys[0]] || row.label || row.name);
          preparedData.values = data.map(row => {
            const numericKey = keys.find(k => typeof row[k] === 'number');
            return row[numericKey] || row.value || row.count || 0;
          });
          break;

        case 'line':
        case 'area':
        case 'bar':
        case 'column':
        case 'stacked bar':
        case 'stacked column':
          preparedData.labels = data.map(row => row[keys[0]] || row.label || row.category);
          preparedData.datasets = this.extractDatasets(data, keys);
          break;

        case 'scatter':
        case 'bubble':
          preparedData.series = data.map(row => ({
            x: row.x || row[keys[0]],
            y: row.y || row[keys[1]],
            r: row.r || row.size || row[keys[2]] || 5,
            label: row.label || row.name || '',
          }));
          break;

        case 'heatmap':
          preparedData.matrix = this.createMatrix(data);
          break;

        case 'network':
          preparedData.nodes = this.extractNodes(data);
          preparedData.edges = this.extractEdges(data);
          break;

        case 'gantt chart':
          preparedData.tasks = data.map(row => ({
            task: row.task || row.name || row.activity,
            start: row.start || row.startDate,
            end: row.end || row.endDate,
            progress: row.progress || 0,
          }));
          break;

        case 'table':
        case 'crosstab':
          preparedData.columns = keys;
          preparedData.rows = data;
          break;

        default:
          preparedData.labels = data.map(row => row[keys[0]]);
          preparedData.values = data.map(row => {
            const numericKey = keys.find(k => typeof row[k] === 'number');
            return row[numericKey] || 0;
          });
      }
    } else if (typeof data === 'object') {
      // Handle object format {category: value}
      preparedData.labels = Object.keys(data);
      preparedData.values = Object.values(data);
    }

    return preparedData;
  }

  /**
   * Extract datasets for multi-series charts
   */
  extractDatasets(data, keys) {
    const datasets = [];
    const labelKey = keys[0];
    const numericKeys = keys.filter(k => typeof data[0][k] === 'number');

    numericKeys.forEach((key, index) => {
      datasets.push({
        label: key,
        data: data.map(row => row[key]),
        backgroundColor: this.styler.getColor(index),
        borderColor: this.styler.getColor(index),
      });
    });

    return datasets;
  }

  /**
   * Create matrix for heatmap
   */
  createMatrix(data) {
    const keys = Object.keys(data[0]);
    const rowKey = keys[0];
    const colKey = keys[1];
    const valueKey = keys.find(k => typeof data[0][k] === 'number');

    const rows = [...new Set(data.map(d => d[rowKey]))];
    const cols = [...new Set(data.map(d => d[colKey]))];

    const matrix = rows.map(row => {
      return cols.map(col => {
        const cell = data.find(d => d[rowKey] === row && d[colKey] === col);
        return cell ? cell[valueKey] : 0;
      });
    });

    return { matrix, rows, cols };
  }

  /**
   * Extract nodes for network graph
   */
  extractNodes(data) {
    const nodes = new Set();
    data.forEach(row => {
      if (row.source) nodes.add(row.source);
      if (row.target) nodes.add(row.target);
      if (row.from) nodes.add(row.from);
      if (row.to) nodes.add(row.to);
    });
    return Array.from(nodes).map((id, index) => ({ id, label: id, index }));
  }

  /**
   * Extract edges for network graph
   */
  extractEdges(data) {
    return data.map(row => ({
      source: row.source || row.from,
      target: row.target || row.to,
      value: row.value || row.weight || 1,
    }));
  }

  /**
   * Get data point count
   */
  getDataPointCount(data) {
    if (Array.isArray(data)) return data.length;
    if (data && typeof data === 'object') return Object.keys(data).length;
    return 0;
  }
}

// Made with Bob
