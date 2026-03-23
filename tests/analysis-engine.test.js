/**
 * Tests for AnalysisEngine
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AnalysisEngine } from '../src/analysis-engine/index.js';

describe('AnalysisEngine', () => {
  const engine = new AnalysisEngine();

  describe('calculateStatistics', () => {
    it('should calculate basic statistics correctly', () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
        { value: 40 },
        { value: 50 },
      ];
      
      const stats = engine.calculateStatistics(data);
      
      assert.strictEqual(stats.count, 5);
      assert.strictEqual(stats.mean, 30);
      assert.strictEqual(stats.median, 30);
      assert.strictEqual(stats.min, 10);
      assert.strictEqual(stats.max, 50);
      assert.strictEqual(stats.range, 40);
    });

    it('should handle empty data', () => {
      const data = [];
      const stats = engine.calculateStatistics(data);
      
      assert.strictEqual(stats.count, 0);
      assert.ok(stats.message);
    });

    it('should detect outliers', () => {
      const data = [
        { value: 10 },
        { value: 12 },
        { value: 11 },
        { value: 13 },
        { value: 100 }, // outlier
      ];
      
      const stats = engine.calculateStatistics(data);
      assert.ok(stats.outliers);
      assert.ok(stats.outliers.length > 0);
    });
  });

  describe('detectTrends', () => {
    it('should detect increasing trend', () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
        { value: 40 },
        { value: 50 },
      ];
      
      const trends = engine.detectTrends(data);
      
      assert.strictEqual(trends.direction, 'increasing');
      assert.ok(trends.strength > 0.5);
    });

    it('should detect decreasing trend', () => {
      const data = [
        { value: 50 },
        { value: 40 },
        { value: 30 },
        { value: 20 },
        { value: 10 },
      ];
      
      const trends = engine.detectTrends(data);
      
      assert.strictEqual(trends.direction, 'decreasing');
      assert.ok(trends.strength > 0.5);
    });

    it('should detect stable trend', () => {
      const data = [
        { value: 30 },
        { value: 31 },
        { value: 29 },
        { value: 30 },
        { value: 30 },
      ];
      
      const trends = engine.detectTrends(data);
      
      assert.ok(['stable', 'neutral'].includes(trends.direction) || trends.strength < 0.3);
    });
  });

  describe('calculateCorrelations', () => {
    it('should calculate correlation between two variables', () => {
      const data = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 8 },
      ];
      
      const result = engine.calculateCorrelations(data);
      
      assert.ok(result.correlations);
      assert.ok(Array.isArray(result.correlations));
    });

    it('should handle insufficient data', () => {
      const data = [{ value: 10 }];
      const result = engine.calculateCorrelations(data);
      
      assert.ok(result.message);
    });
  });

  describe('generateInsights', () => {
    it('should generate insights from data', () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
      ];
      
      const stats = engine.calculateStatistics(data);
      const trends = engine.detectTrends(data);
      const insights = engine.generateInsights(data, 'line', stats, trends);
      
      assert.ok(Array.isArray(insights));
    });
  });

  describe('performAnalysis', () => {
    it('should perform statistical analysis', async () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
      ];
      
      const result = await engine.performAnalysis(data, 'statistical');
      
      assert.ok(result);
      assert.ok(result.count !== undefined);
    });

    it('should perform trend analysis', async () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
      ];
      
      const result = await engine.performAnalysis(data, 'trend');
      
      assert.ok(result);
      assert.ok(result.direction);
    });

    it('should perform summary analysis', async () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
      ];
      
      const result = await engine.performAnalysis(data, 'summary');
      
      assert.ok(result);
      assert.ok(result.summary);
    });
  });
});

// Made with Bob
