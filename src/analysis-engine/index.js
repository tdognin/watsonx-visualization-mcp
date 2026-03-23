/**
 * Analysis Engine
 * Performs comprehensive data analysis and generates insights
 */

export class AnalysisEngine {
  constructor() {
    this.analysisTypes = ['statistical', 'trend', 'correlation', 'summary'];
  }

  /**
   * Main analysis method
   */
  async analyze(data, chartType) {
    const statistics = this.calculateStatistics(data);
    const trends = this.detectTrends(data);
    const insights = this.generateInsights(data, chartType, statistics, trends);
    const summary = this.generateSummary(data, chartType, statistics, insights);

    return {
      summary,
      statistics,
      trends,
      insights,
      recommendations: this.generateRecommendations(data, chartType, insights),
    };
  }

  /**
   * Perform specific type of analysis
   */
  async performAnalysis(data, analysisType = 'summary') {
    switch (analysisType) {
      case 'statistical':
        return this.calculateStatistics(data);
      
      case 'trend':
        return this.detectTrends(data);
      
      case 'correlation':
        return this.calculateCorrelations(data);
      
      case 'summary':
      default:
        return this.analyze(data, 'general');
    }
  }

  /**
   * Calculate statistical measures
   */
  calculateStatistics(data) {
    const numericValues = this.extractNumericValues(data);
    
    if (numericValues.length === 0) {
      return {
        count: 0,
        message: 'No numeric data found for statistical analysis',
      };
    }

    const sorted = numericValues.sort((a, b) => a - b);
    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    const mean = sum / numericValues.length;
    
    // Calculate variance and standard deviation
    const variance = numericValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numericValues.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate percentiles
    const q1Index = Math.floor(numericValues.length * 0.25);
    const medianIndex = Math.floor(numericValues.length * 0.5);
    const q3Index = Math.floor(numericValues.length * 0.75);

    const statistics = {
      count: numericValues.length,
      sum: this.roundToDecimals(sum, 2),
      mean: this.roundToDecimals(mean, 2),
      median: sorted[medianIndex],
      mode: this.calculateMode(numericValues),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range: sorted[sorted.length - 1] - sorted[0],
      q1: sorted[q1Index],
      q3: sorted[q3Index],
      iqr: sorted[q3Index] - sorted[q1Index],
      variance: this.roundToDecimals(variance, 2),
      standardDeviation: this.roundToDecimals(standardDeviation, 2),
      skewness: this.calculateSkewness(numericValues, mean, standardDeviation),
      kurtosis: this.calculateKurtosis(numericValues, mean, standardDeviation),
      outliers: this.detectOutliers(sorted, q1Index, q3Index),
    };

    return statistics;
  }

  /**
   * Detect trends in data
   */
  detectTrends(data) {
    const trends = {
      overall: 'stable',
      direction: 'neutral',
      strength: 0,
      changeRate: 0,
      seasonality: false,
      patterns: [],
    };

    if (!Array.isArray(data) || data.length < 2) {
      return trends;
    }

    const numericValues = this.extractNumericValues(data);
    if (numericValues.length < 2) {
      return trends;
    }

    // Calculate linear trend
    const linearTrend = this.calculateLinearTrend(numericValues);
    trends.direction = linearTrend.slope > 0 ? 'increasing' : linearTrend.slope < 0 ? 'decreasing' : 'stable';
    trends.strength = Math.abs(linearTrend.correlation);
    trends.changeRate = this.roundToDecimals(linearTrend.slope, 4);

    // Determine overall trend
    if (trends.strength > 0.7) {
      trends.overall = trends.direction === 'increasing' ? 'strong upward' : 'strong downward';
    } else if (trends.strength > 0.4) {
      trends.overall = trends.direction === 'increasing' ? 'moderate upward' : 'moderate downward';
    } else if (trends.strength > 0.2) {
      trends.overall = trends.direction === 'increasing' ? 'weak upward' : 'weak downward';
    }

    // Detect patterns
    trends.patterns = this.detectPatterns(numericValues);

    // Check for seasonality (simplified)
    if (numericValues.length >= 12) {
      trends.seasonality = this.detectSeasonality(numericValues);
    }

    return trends;
  }

  /**
   * Calculate correlations between variables
   */
  calculateCorrelations(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return { correlations: [], message: 'Insufficient data for correlation analysis' };
    }

    const numericFields = this.getNumericFields(data);
    if (numericFields.length < 2) {
      return { correlations: [], message: 'Need at least 2 numeric fields for correlation analysis' };
    }

    const correlations = [];
    
    for (let i = 0; i < numericFields.length; i++) {
      for (let j = i + 1; j < numericFields.length; j++) {
        const field1 = numericFields[i];
        const field2 = numericFields[j];
        
        const values1 = data.map(row => parseFloat(row[field1])).filter(v => !isNaN(v));
        const values2 = data.map(row => parseFloat(row[field2])).filter(v => !isNaN(v));
        
        if (values1.length === values2.length && values1.length > 1) {
          const correlation = this.calculatePearsonCorrelation(values1, values2);
          correlations.push({
            field1,
            field2,
            correlation: this.roundToDecimals(correlation, 3),
            strength: this.interpretCorrelationStrength(correlation),
            direction: correlation > 0 ? 'positive' : correlation < 0 ? 'negative' : 'none',
          });
        }
      }
    }

    return { correlations };
  }

  /**
   * Generate insights from data analysis
   */
  generateInsights(data, chartType, statistics, trends) {
    const insights = [];

    // Statistical insights
    if (statistics.count > 0) {
      if (statistics.outliers && statistics.outliers.length > 0) {
        insights.push({
          type: 'outlier',
          message: `Found ${statistics.outliers.length} outlier(s) in the data`,
          values: statistics.outliers,
          impact: 'high',
        });
      }

      if (statistics.standardDeviation > statistics.mean * 0.5) {
        insights.push({
          type: 'variability',
          message: 'Data shows high variability',
          value: statistics.standardDeviation,
          impact: 'medium',
        });
      }

      if (Math.abs(statistics.skewness) > 1) {
        insights.push({
          type: 'distribution',
          message: `Data is ${statistics.skewness > 0 ? 'right' : 'left'}-skewed`,
          value: statistics.skewness,
          impact: 'medium',
        });
      }
    }

    // Trend insights
    if (trends.strength > 0.5) {
      insights.push({
        type: 'trend',
        message: `Strong ${trends.direction} trend detected`,
        strength: trends.strength,
        impact: 'high',
      });
    }

    if (trends.seasonality) {
      insights.push({
        type: 'seasonality',
        message: 'Seasonal patterns detected in the data',
        impact: 'medium',
      });
    }

    // Chart-specific insights
    const chartInsights = this.generateChartSpecificInsights(data, chartType);
    insights.push(...chartInsights);

    return insights;
  }

  /**
   * Generate chart-specific insights
   */
  generateChartSpecificInsights(data, chartType) {
    const insights = [];

    switch (chartType) {
      case 'pie':
        const pieData = this.extractNumericValues(data);
        const total = pieData.reduce((sum, val) => sum + val, 0);
        const largest = Math.max(...pieData);
        if (largest / total > 0.5) {
          insights.push({
            type: 'dominance',
            message: 'One category dominates more than 50% of the total',
            impact: 'high',
          });
        }
        break;

      case 'bar':
      case 'column':
        const barData = this.extractNumericValues(data);
        const maxBar = Math.max(...barData);
        const minBar = Math.min(...barData);
        if (maxBar / minBar > 10) {
          insights.push({
            type: 'scale',
            message: 'Large difference in scale between categories',
            ratio: this.roundToDecimals(maxBar / minBar, 2),
            impact: 'medium',
          });
        }
        break;

      case 'line':
        if (Array.isArray(data) && data.length > 2) {
          const values = this.extractNumericValues(data);
          const volatility = this.calculateVolatility(values);
          if (volatility > 0.3) {
            insights.push({
              type: 'volatility',
              message: 'High volatility detected in time series',
              value: this.roundToDecimals(volatility, 3),
              impact: 'medium',
            });
          }
        }
        break;
    }

    return insights;
  }

  /**
   * Generate summary of analysis
   */
  generateSummary(data, chartType, statistics, insights) {
    const dataSize = Array.isArray(data) ? data.length : Object.keys(data).length;
    const highImpactInsights = insights.filter(i => i.impact === 'high');
    
    let summary = `Analysis of ${dataSize} data points`;
    
    if (statistics.count > 0) {
      summary += ` with an average value of ${statistics.mean}`;
      if (statistics.range > 0) {
        summary += ` (range: ${statistics.min} to ${statistics.max})`;
      }
    }

    if (highImpactInsights.length > 0) {
      summary += `. Key findings: ${highImpactInsights.map(i => i.message.toLowerCase()).join(', ')}`;
    }

    summary += `.`;

    return summary;
  }

  /**
   * Generate recommendations based on analysis
   */
  generateRecommendations(data, chartType, insights) {
    const recommendations = [];

    // General recommendations based on insights
    insights.forEach(insight => {
      switch (insight.type) {
        case 'outlier':
          recommendations.push({
            type: 'data_quality',
            message: 'Consider investigating outliers - they may indicate data quality issues or interesting edge cases',
            priority: 'high',
          });
          break;

        case 'trend':
          if (insight.strength > 0.7) {
            recommendations.push({
              type: 'forecasting',
              message: 'Strong trend detected - consider using this data for forecasting',
              priority: 'medium',
            });
          }
          break;

        case 'variability':
          recommendations.push({
            type: 'analysis',
            message: 'High variability suggests need for deeper segmentation analysis',
            priority: 'medium',
          });
          break;

        case 'dominance':
          recommendations.push({
            type: 'visualization',
            message: 'Consider using a bar chart instead of pie chart for better comparison',
            priority: 'low',
          });
          break;
      }
    });

    // Chart-specific recommendations
    const chartRecommendations = this.getChartRecommendations(chartType, data);
    recommendations.push(...chartRecommendations);

    return recommendations;
  }

  /**
   * Get chart-specific recommendations
   */
  getChartRecommendations(chartType, data) {
    const recommendations = [];
    const dataSize = Array.isArray(data) ? data.length : Object.keys(data).length;

    if (dataSize > 50 && ['pie', 'bar', 'column'].includes(chartType)) {
      recommendations.push({
        type: 'visualization',
        message: 'Consider using a table or aggregating data for better readability',
        priority: 'medium',
      });
    }

    if (dataSize < 5 && chartType === 'line') {
      recommendations.push({
        type: 'visualization',
        message: 'Line charts work better with more data points - consider bar chart',
        priority: 'low',
      });
    }

    return recommendations;
  }

  // Helper methods

  extractNumericValues(data) {
    const values = [];
    
    if (Array.isArray(data)) {
      data.forEach(row => {
        if (typeof row === 'number') {
          values.push(row);
        } else if (typeof row === 'object') {
          Object.values(row).forEach(val => {
            const num = parseFloat(val);
            if (!isNaN(num)) values.push(num);
          });
        }
      });
    } else if (typeof data === 'object') {
      Object.values(data).forEach(val => {
        const num = parseFloat(val);
        if (!isNaN(num)) values.push(num);
      });
    }

    return values;
  }

  getNumericFields(data) {
    if (!Array.isArray(data) || data.length === 0) return [];
    
    const firstRow = data[0];
    return Object.keys(firstRow).filter(key => {
      return data.every(row => !isNaN(parseFloat(row[key])));
    });
  }

  calculateMode(values) {
    const frequency = {};
    let maxFreq = 0;
    let mode = null;

    values.forEach(val => {
      frequency[val] = (frequency[val] || 0) + 1;
      if (frequency[val] > maxFreq) {
        maxFreq = frequency[val];
        mode = val;
      }
    });

    return mode;
  }

  calculateSkewness(values, mean, stdDev) {
    if (stdDev === 0) return 0;
    
    const n = values.length;
    const sum = values.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 3), 0);
    return (n / ((n - 1) * (n - 2))) * sum;
  }

  calculateKurtosis(values, mean, stdDev) {
    if (stdDev === 0) return 0;
    
    const n = values.length;
    const sum = values.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 4), 0);
    return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum - (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
  }

  detectOutliers(sortedValues, q1Index, q3Index) {
    const q1 = sortedValues[q1Index];
    const q3 = sortedValues[q3Index];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return sortedValues.filter(val => val < lowerBound || val > upperBound);
  }

  calculateLinearTrend(values) {
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * values[i], 0);
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate correlation coefficient
    const meanX = sumX / n;
    const meanY = sumY / n;
    const numerator = x.reduce((acc, xi, i) => acc + (xi - meanX) * (values[i] - meanY), 0);
    const denomX = Math.sqrt(x.reduce((acc, xi) => acc + Math.pow(xi - meanX, 2), 0));
    const denomY = Math.sqrt(values.reduce((acc, yi) => acc + Math.pow(yi - meanY, 2), 0));
    const correlation = denomX * denomY === 0 ? 0 : numerator / (denomX * denomY);

    return { slope, intercept, correlation };
  }

  detectPatterns(values) {
    const patterns = [];
    
    // Detect cycles (simplified)
    if (values.length >= 6) {
      const cycles = this.detectCycles(values);
      if (cycles.length > 0) {
        patterns.push({ type: 'cyclical', cycles });
      }
    }

    return patterns;
  }

  detectCycles(values) {
    // Simplified cycle detection
    const cycles = [];
    const minCycleLength = 3;
    const maxCycleLength = Math.floor(values.length / 2);

    for (let len = minCycleLength; len <= maxCycleLength; len++) {
      let matches = 0;
      for (let i = 0; i < values.length - len; i++) {
        if (Math.abs(values[i] - values[i + len]) < values[i] * 0.1) {
          matches++;
        }
      }
      if (matches / (values.length - len) > 0.6) {
        cycles.push({ length: len, confidence: matches / (values.length - len) });
      }
    }

    return cycles;
  }

  detectSeasonality(values) {
    // Simplified seasonality detection
    const quarters = Math.floor(values.length / 4);
    if (quarters < 2) return false;

    const quarterlyMeans = [];
    for (let q = 0; q < 4; q++) {
      const quarterValues = [];
      for (let i = q; i < values.length; i += 4) {
        quarterValues.push(values[i]);
      }
      quarterlyMeans.push(quarterValues.reduce((a, b) => a + b, 0) / quarterValues.length);
    }

    const overallMean = quarterlyMeans.reduce((a, b) => a + b, 0) / 4;
    const variance = quarterlyMeans.reduce((acc, mean) => acc + Math.pow(mean - overallMean, 2), 0) / 4;
    
    return variance > overallMean * 0.1;
  }

  calculateVolatility(values) {
    if (values.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < values.length; i++) {
      if (values[i - 1] !== 0) {
        returns.push((values[i] - values[i - 1]) / values[i - 1]);
      }
    }

    if (returns.length === 0) return 0;

    const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((acc, ret) => acc + Math.pow(ret - meanReturn, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }

  calculatePearsonCorrelation(x, y) {
    const n = x.length;
    if (n !== y.length || n === 0) return 0;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0);
    const sumYY = y.reduce((acc, yi) => acc + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  interpretCorrelationStrength(correlation) {
    const abs = Math.abs(correlation);
    if (abs >= 0.9) return 'very strong';
    if (abs >= 0.7) return 'strong';
    if (abs >= 0.5) return 'moderate';
    if (abs >= 0.3) return 'weak';
    return 'very weak';
  }

  roundToDecimals(value, decimals) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}

// Made with Bob