/**
 * Tests for VisualizationEngine
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { VisualizationEngine } from '../src/visualization-engine/index.js';

describe('VisualizationEngine', () => {
  const engine = new VisualizationEngine();

  describe('generate', () => {
    it('should generate visualization with valid data', async () => {
      const data = [
        { category: 'A', value: 100 },
        { category: 'B', value: 200 },
        { category: 'C', value: 150 },
      ];
      
      const result = await engine.generate({
        data,
        chartType: 'column',
        title: 'Test Chart',
      });
      
      assert.ok(result);
      assert.strictEqual(result.chartType, 'column');
      assert.strictEqual(result.title, 'Test Chart');
      assert.ok(result.chart);
      assert.ok(result.metadata);
    });

    it('should throw error for empty data', async () => {
      await assert.rejects(
        async () => {
          await engine.generate({
            data: [],
            chartType: 'column',
            title: 'Test',
          });
        },
        Error
      );
    });
  });

  describe('prepareData', () => {
    it('should prepare data for pie chart', () => {
      const data = [
        { category: 'A', value: 100 },
        { category: 'B', value: 200 },
      ];
      
      const prepared = engine.prepareData(data, 'pie');
      
      assert.ok(prepared.labels);
      assert.ok(prepared.values);
      assert.strictEqual(prepared.labels.length, 2);
      assert.strictEqual(prepared.values.length, 2);
    });

    it('should prepare data for line chart', () => {
      const data = [
        { month: 'Jan', sales: 100, profit: 20 },
        { month: 'Feb', sales: 150, profit: 30 },
      ];
      
      const prepared = engine.prepareData(data, 'line');
      
      assert.ok(prepared.labels);
      assert.ok(prepared.datasets);
      assert.strictEqual(prepared.labels.length, 2);
    });

    it('should prepare data for scatter chart', () => {
      const data = [
        { x: 10, y: 20 },
        { x: 15, y: 25 },
      ];
      
      const prepared = engine.prepareData(data, 'scatter');
      
      assert.ok(prepared.series);
      assert.strictEqual(prepared.series.length, 2);
    });

    it('should prepare data for network chart', () => {
      const data = [
        { source: 'A', target: 'B', value: 10 },
        { source: 'B', target: 'C', value: 20 },
      ];
      
      const prepared = engine.prepareData(data, 'network');
      
      assert.ok(prepared.nodes);
      assert.ok(prepared.edges);
    });

    it('should prepare data for gantt chart', () => {
      const data = [
        { task: 'Task 1', start: '2024-01-01', end: '2024-01-15' },
        { task: 'Task 2', start: '2024-01-16', end: '2024-02-01' },
      ];
      
      const prepared = engine.prepareData(data, 'gantt chart');
      
      assert.ok(prepared.tasks);
      assert.strictEqual(prepared.tasks.length, 2);
    });

    it('should prepare data for table', () => {
      const data = [
        { name: 'John', age: 30, city: 'NYC' },
        { name: 'Jane', age: 25, city: 'LA' },
      ];
      
      const prepared = engine.prepareData(data, 'table');
      
      assert.ok(prepared.columns);
      assert.ok(prepared.rows);
      assert.strictEqual(prepared.columns.length, 3);
      assert.strictEqual(prepared.rows.length, 2);
    });

    it('should handle object format data', () => {
      const data = {
        'Category A': 100,
        'Category B': 200,
        'Category C': 150,
      };
      
      const prepared = engine.prepareData(data, 'pie');
      
      assert.ok(prepared.labels);
      assert.ok(prepared.values);
      assert.strictEqual(prepared.labels.length, 3);
    });
  });

  describe('extractDatasets', () => {
    it('should extract multiple datasets', () => {
      const data = [
        { month: 'Jan', sales: 100, profit: 20 },
        { month: 'Feb', sales: 150, profit: 30 },
      ];
      const keys = ['month', 'sales', 'profit'];
      
      const datasets = engine.extractDatasets(data, keys);
      
      assert.ok(Array.isArray(datasets));
      assert.strictEqual(datasets.length, 2); // sales and profit
      assert.ok(datasets[0].label);
      assert.ok(datasets[0].data);
    });
  });

  describe('getDataPointCount', () => {
    it('should count array data points', () => {
      const data = [{ a: 1 }, { a: 2 }, { a: 3 }];
      const count = engine.getDataPointCount(data);
      assert.strictEqual(count, 3);
    });

    it('should count object data points', () => {
      const data = { a: 1, b: 2, c: 3 };
      const count = engine.getDataPointCount(data);
      assert.strictEqual(count, 3);
    });

    it('should return 0 for invalid data', () => {
      const count = engine.getDataPointCount(null);
      assert.strictEqual(count, 0);
    });
  });
});

// Made with Bob
