/**
 * Intelligent Chart Type Selector
 * Automatically determines the most appropriate visualization type based on data structure
 */

export class ChartTypeSelector {
  constructor() {
    this.chartTypes = {
      // Categorical comparisons
      bar: { dimensions: 1, measures: 1, categorical: true, temporal: false },
      column: { dimensions: 1, measures: 1, categorical: true, temporal: false },
      'stacked bar': { dimensions: 2, measures: 1, categorical: true, temporal: false },
      'stacked column': { dimensions: 2, measures: 1, categorical: true, temporal: false },
      
      // Temporal/trend analysis
      line: { dimensions: 1, measures: 1, categorical: false, temporal: true },
      area: { dimensions: 1, measures: 1, categorical: false, temporal: true },
      'line and column': { dimensions: 1, measures: 2, categorical: false, temporal: true },
      'dual axes lines': { dimensions: 1, measures: 2, categorical: false, temporal: true },
      'dual axes column': { dimensions: 1, measures: 2, categorical: false, temporal: true },
      
      // Part-to-whole
      pie: { dimensions: 1, measures: 1, categorical: true, temporal: false, partToWhole: true },
      sunburst: { dimensions: 2, measures: 1, categorical: true, temporal: false, partToWhole: true, hierarchical: true },
      'tree map': { dimensions: 2, measures: 1, categorical: true, temporal: false, partToWhole: true, hierarchical: true },
      'packed bubble': { dimensions: 2, measures: 1, categorical: true, temporal: false, partToWhole: true, hierarchical: true },
      
      // Correlation/distribution
      scatter: { dimensions: 2, measures: 2, categorical: false, temporal: false, correlation: true },
      bubble: { dimensions: 2, measures: 3, categorical: false, temporal: false, correlation: true },
      heatmap: { dimensions: 2, measures: 1, categorical: true, temporal: false, correlation: true },
      
      // Statistical
      boxplot: { dimensions: 1, measures: 1, categorical: true, temporal: false, statistical: true },
      
      // Hierarchical
      'decision tree': { dimensions: 2, measures: 1, categorical: true, temporal: false, hierarchical: true },
      'hierarchy bubble': { dimensions: 2, measures: 1, categorical: true, temporal: false, hierarchical: true },
      
      // Specialized
      waterfall: { dimensions: 1, measures: 1, categorical: true, temporal: false, cumulative: true },
      bullet: { dimensions: 1, measures: 3, categorical: false, temporal: false, kpi: true },
      kpi: { dimensions: 0, measures: 1, categorical: false, temporal: false, kpi: true },
      tornado: { dimensions: 1, measures: 2, categorical: true, temporal: false },
      radar: { dimensions: 1, measures: 3, categorical: true, temporal: false },
      radial: { dimensions: 1, measures: 1, categorical: true, temporal: false },
      spiral: { dimensions: 1, measures: 1, categorical: false, temporal: true },
      
      // Network/relationships
      network: { dimensions: 2, measures: 1, categorical: true, temporal: false, relational: true },
      
      // Text
      wordcloud: { dimensions: 1, measures: 1, categorical: true, temporal: false, textual: true },
      
      // Tabular
      table: { dimensions: 'any', measures: 'any', categorical: true, temporal: false },
      crosstab: { dimensions: 2, measures: 1, categorical: true, temporal: false },
      
      // Project management
      'gantt chart': { dimensions: 1, measures: 2, categorical: true, temporal: true, projectManagement: true },
      
      // Other
      marimekko: { dimensions: 2, measures: 2, categorical: true, temporal: false },
      point: { dimensions: 1, measures: 1, categorical: false, temporal: false },
      map: { dimensions: 1, measures: 1, categorical: true, temporal: false, geographical: true },
      'legacy map': { dimensions: 1, measures: 1, categorical: true, temporal: false, geographical: true },
    };
  }

  /**
   * Analyze data structure and select appropriate chart type
   */
  selectChartType(data) {
    const analysis = this.analyzeDataStructure(data);
    
    // Check for specific data patterns
    if (analysis.hasGeographicalData) return 'map';
    if (analysis.hasTextFrequency) return 'wordcloud';
    if (analysis.hasNetworkStructure) return 'network';
    if (analysis.hasGanttStructure) return 'gantt chart';
    if (analysis.isSingleKPI) return 'kpi';
    
    // Temporal data
    if (analysis.hasTemporal) {
      if (analysis.measureCount === 1) {
        return analysis.showTrend ? 'line' : 'area';
      } else if (analysis.measureCount === 2) {
        return 'dual axes lines';
      }
    }
    
    // Hierarchical data
    if (analysis.hasHierarchy) {
      if (analysis.isPartToWhole) {
        return analysis.dimensionCount > 2 ? 'sunburst' : 'tree map';
      }
      return 'hierarchy bubble';
    }
    
    // Part-to-whole relationships
    if (analysis.isPartToWhole && analysis.dimensionCount === 1) {
      return analysis.categoryCount <= 7 ? 'pie' : 'tree map';
    }
    
    // Correlation/distribution
    if (analysis.measureCount >= 2 && !analysis.hasCategorical) {
      return analysis.measureCount === 2 ? 'scatter' : 'bubble';
    }
    
    // Statistical analysis
    if (analysis.hasOutliers || analysis.needsDistribution) {
      return 'boxplot';
    }
    
    // Cumulative/waterfall
    if (analysis.hasCumulative || analysis.hasPositiveNegative) {
      return 'waterfall';
    }
    
    // Comparison patterns
    if (analysis.hasCategorical) {
      if (analysis.dimensionCount === 1) {
        return analysis.categoryCount > 10 ? 'bar' : 'column';
      } else if (analysis.dimensionCount === 2) {
        return 'stacked column';
      }
    }
    
    // Heatmap for 2D categorical with intensity
    if (analysis.dimensionCount === 2 && analysis.hasCategorical && analysis.hasIntensity) {
      return 'heatmap';
    }
    
    // Default fallback
    if (analysis.rowCount > 50) return 'table';
    return 'column';
  }

  /**
   * Analyze data structure to extract characteristics
   */
  analyzeDataStructure(data) {
    const analysis = {
      rowCount: 0,
      dimensionCount: 0,
      measureCount: 0,
      categoryCount: 0,
      hasTemporal: false,
      hasCategorical: false,
      hasHierarchy: false,
      isPartToWhole: false,
      hasOutliers: false,
      needsDistribution: false,
      hasCumulative: false,
      hasPositiveNegative: false,
      hasGeographicalData: false,
      hasTextFrequency: false,
      hasNetworkStructure: false,
      hasGanttStructure: false,
      isSingleKPI: false,
      showTrend: false,
      hasIntensity: false,
    };

    // Handle different data formats
    if (Array.isArray(data)) {
      analysis.rowCount = data.length;
      
      if (data.length === 0) return analysis;
      
      const firstRow = data[0];
      const keys = Object.keys(firstRow);
      
      // Analyze each field
      keys.forEach(key => {
        const values = data.map(row => row[key]);
        const fieldAnalysis = this.analyzeField(key, values);
        
        if (fieldAnalysis.isTemporal) analysis.hasTemporal = true;
        if (fieldAnalysis.isCategorical) {
          analysis.hasCategorical = true;
          analysis.dimensionCount++;
          analysis.categoryCount = Math.max(analysis.categoryCount, fieldAnalysis.uniqueCount);
        }
        if (fieldAnalysis.isNumeric) analysis.measureCount++;
        if (fieldAnalysis.isGeographical) analysis.hasGeographicalData = true;
        if (fieldAnalysis.hasHierarchy) analysis.hasHierarchy = true;
      });
      
      // Check for specific patterns
      analysis.hasTextFrequency = this.checkTextFrequency(data);
      analysis.hasNetworkStructure = this.checkNetworkStructure(data);
      analysis.hasGanttStructure = this.checkGanttStructure(data);
      analysis.isSingleKPI = data.length === 1 && analysis.measureCount === 1;
      analysis.hasPositiveNegative = this.checkPositiveNegative(data);
      analysis.hasIntensity = this.checkIntensity(data);
      
      // Check if data represents part-to-whole
      if (analysis.measureCount === 1 && analysis.hasCategorical) {
        const numericValues = this.extractNumericValues(data);
        const total = numericValues.reduce((sum, val) => sum + val, 0);
        analysis.isPartToWhole = numericValues.every(val => val > 0) && total > 0;
      }
      
    } else if (typeof data === 'object') {
      // Handle object format
      const keys = Object.keys(data);
      analysis.rowCount = keys.length;
      analysis.dimensionCount = 1;
      analysis.measureCount = 1;
      analysis.hasCategorical = true;
      
      const values = Object.values(data);
      if (values.every(v => typeof v === 'number')) {
        analysis.isPartToWhole = values.every(v => v > 0);
      }
    }
    
    return analysis;
  }

  /**
   * Analyze individual field characteristics
   */
  analyzeField(fieldName, values) {
    const analysis = {
      isTemporal: false,
      isCategorical: false,
      isNumeric: false,
      isGeographical: false,
      hasHierarchy: false,
      uniqueCount: 0,
    };

    // Check field name patterns
    const temporalPatterns = /date|time|year|month|day|quarter|period/i;
    const geoPatterns = /country|city|state|region|location|lat|lon|latitude|longitude|address/i;
    const hierarchyPatterns = /parent|child|level|category|subcategory/i;
    
    analysis.isTemporal = temporalPatterns.test(fieldName);
    analysis.isGeographical = geoPatterns.test(fieldName);
    analysis.hasHierarchy = hierarchyPatterns.test(fieldName);
    
    // Analyze values
    const uniqueValues = new Set(values);
    analysis.uniqueCount = uniqueValues.size;
    
    // Check if numeric
    const numericValues = values.filter(v => typeof v === 'number' || !isNaN(parseFloat(v)));
    analysis.isNumeric = numericValues.length > values.length * 0.8;
    
    // Check if categorical
    analysis.isCategorical = !analysis.isNumeric || analysis.uniqueCount < values.length * 0.5;
    
    // Check for date patterns in values
    if (!analysis.isTemporal && values.length > 0) {
      const sampleValue = String(values[0]);
      analysis.isTemporal = this.isDateString(sampleValue);
    }
    
    return analysis;
  }

  isDateString(str) {
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}/, // ISO date
      /^\d{2}\/\d{2}\/\d{4}/, // US date
      /^\d{4}$/, // Year only
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i, // Month names
    ];
    return datePatterns.some(pattern => pattern.test(str));
  }

  checkTextFrequency(data) {
    if (data.length === 0) return false;
    const keys = Object.keys(data[0]);
    return keys.some(key => key.toLowerCase().includes('word') || key.toLowerCase().includes('text')) &&
           keys.some(key => key.toLowerCase().includes('frequency') || key.toLowerCase().includes('count'));
  }

  checkNetworkStructure(data) {
    if (data.length === 0) return false;
    const keys = Object.keys(data[0]);
    return (keys.includes('source') && keys.includes('target')) ||
           (keys.includes('from') && keys.includes('to')) ||
           (keys.includes('node1') && keys.includes('node2'));
  }

  checkGanttStructure(data) {
    if (data.length === 0) return false;
    const keys = Object.keys(data[0]);
    return (keys.some(k => k.toLowerCase().includes('task')) ||
            keys.some(k => k.toLowerCase().includes('activity'))) &&
           (keys.some(k => k.toLowerCase().includes('start')) &&
            keys.some(k => k.toLowerCase().includes('end')));
  }

  checkPositiveNegative(data) {
    const numericValues = this.extractNumericValues(data);
    return numericValues.some(v => v > 0) && numericValues.some(v => v < 0);
  }

  checkIntensity(data) {
    const numericValues = this.extractNumericValues(data);
    if (numericValues.length === 0) return false;
    const range = Math.max(...numericValues) - Math.min(...numericValues);
    return range > 0;
  }

  extractNumericValues(data) {
    const values = [];
    data.forEach(row => {
      Object.values(row).forEach(val => {
        if (typeof val === 'number') values.push(val);
        else if (!isNaN(parseFloat(val))) values.push(parseFloat(val));
      });
    });
    return values;
  }

  /**
   * Get chart type metadata
   */
  getChartTypeInfo(chartType) {
    return this.chartTypes[chartType] || null;
  }

  /**
   * Get all supported chart types
   */
  getSupportedChartTypes() {
    return Object.keys(this.chartTypes);
  }
}

// Made with Bob
