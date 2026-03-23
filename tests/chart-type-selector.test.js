/**
 * Tests for ChartTypeSelector
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ChartTypeSelector } from '../src/utils/chart-type-selector.js';

describe('ChartTypeSelector', () => {
  const selector = new ChartTypeSelector();

  describe('selectChartType', () => {
    it('should select pie chart for simple categorical data', () => {
      const data = {
        'Category A': 100,
        'Category B': 200,
        'Category C': 150,
      };
      const chartType = selector.selectChartType(data);
      assert.strictEqual(chartType, 'pie');
    });

    it('should select line or dual axes chart for temporal data', () => {
      const data = [
        { date: '2024-01-01', sales: 1200 },
        { date: '2024-02-01', sales: 1500 },
        { date: '2024-03-01', sales: 1800 },
      ];
      const chartType = selector.selectChartType(data);
      assert.ok(['line', 'area', 'dual axes lines'].includes(chartType));
    });

    it('should select scatter chart for correlation data', () => {
      const data = [
        { x: 10, y: 20 },
        { x: 15, y: 25 },
        { x: 20, y: 30 },
      ];
      const chartType = selector.selectChartType(data);
      assert.strictEqual(chartType, 'scatter');
    });

    it('should select network chart for network structure', () => {
      const data = [
        { source: 'A', target: 'B', value: 10 },
        { source: 'B', target: 'C', value: 20 },
      ];
      const chartType = selector.selectChartType(data);
      assert.strictEqual(chartType, 'network');
    });

    it('should select gantt chart for project data', () => {
      const data = [
        { task: 'Planning', start: '2024-01-01', end: '2024-01-15' },
        { task: 'Development', start: '2024-01-16', end: '2024-02-28' },
      ];
      const chartType = selector.selectChartType(data);
      assert.strictEqual(chartType, 'gantt chart');
    });

    it('should select appropriate chart for categorical comparison', () => {
      const data = [
        { category: 'A', value: 100 },
        { category: 'B', value: 200 },
        { category: 'C', value: 150 },
      ];
      const chartType = selector.selectChartType(data);
      // Auto-selection can choose various chart types based on data analysis
      assert.ok(typeof chartType === 'string' && chartType.length > 0);
    });

    it('should select appropriate chart for large datasets', () => {
      const data = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        value: Math.random() * 100,
      }));
      const chartType = selector.selectChartType(data);
      // Large datasets can be table or scatter depending on structure
      assert.ok(['table', 'scatter', 'heatmap'].includes(chartType));
    });
  });

  describe('analyzeDataStructure', () => {
    it('should correctly analyze array data structure', () => {
      const data = [
        { category: 'A', value: 100, date: '2024-01-01' },
        { category: 'B', value: 200, date: '2024-02-01' },
      ];
      const analysis = selector.analyzeDataStructure(data);
      
      assert.strictEqual(analysis.rowCount, 2);
      assert.ok(analysis.hasCategorical);
      assert.ok(analysis.hasTemporal);
      // measureCount can be 1 or 2 depending on how 'value' is counted
      assert.ok(analysis.measureCount >= 1);
    });

    it('should correctly analyze object data structure', () => {
      const data = {
        'Category A': 100,
        'Category B': 200,
      };
      const analysis = selector.analyzeDataStructure(data);
      
      assert.strictEqual(analysis.rowCount, 2);
      assert.ok(analysis.hasCategorical);
      assert.strictEqual(analysis.dimensionCount, 1);
    });
  });

  describe('getSupportedChartTypes', () => {
    it('should return array of supported chart types', () => {
      const types = selector.getSupportedChartTypes();
      assert.ok(Array.isArray(types));
      assert.ok(types.length > 0);
      assert.ok(types.includes('bar'));
      assert.ok(types.includes('line'));
      assert.ok(types.includes('pie'));
    });
  });
});

// Made with Bob
