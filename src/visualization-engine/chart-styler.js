/**
 * Chart Styler
 * Applies IBM Carbon Design System styling to charts
 */

export class ChartStyler {
  constructor() {
    // IBM Carbon Design System color palette
    this.colors = {
      primary: [
        '#0f62fe', // Blue 60
        '#ee5396', // Magenta 50
        '#42be65', // Green 50
        '#ff832b', // Orange 40
        '#8a3ffc', // Purple 60
        '#33b1ff', // Cyan 40
        '#fa4d56', // Red 50
        '#6fdc8c', // Green 40
        '#d12771', // Magenta 60
        '#d2a106', // Yellow 30
      ],
      sequential: [
        '#edf5ff', '#d0e2ff', '#a6c8ff', '#78a9ff', '#4589ff',
        '#0f62fe', '#0043ce', '#002d9c', '#001d6c', '#001141',
      ],
      diverging: [
        '#750e13', '#a2191f', '#da1e28', '#fa4d56', '#ff8389',
        '#ffffff',
        '#8a3ffc', '#6929c4', '#491d8b', '#31135e', '#1c0f30',
      ],
    };

    this.fonts = {
      family: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      sizes: {
        title: 20,
        subtitle: 16,
        label: 14,
        tick: 12,
      },
    };

    this.spacing = {
      padding: 20,
      margin: { top: 60, right: 40, bottom: 60, left: 60 },
    };
  }

  /**
   * Apply IBM Carbon styling to chart options
   */
  applyStyles(chartType, options = {}) {
    const baseStyles = {
      font: {
        family: this.fonts.family,
        size: this.fonts.sizes.label,
        color: '#161616',
      },
      colors: options.colors || this.colors.primary,
      backgroundColor: options.backgroundColor || '#ffffff',
      gridColor: '#e0e0e0',
      borderColor: '#8d8d8d',
    };

    // Chart-specific styling
    const chartStyles = this.getChartSpecificStyles(chartType);

    return {
      ...baseStyles,
      ...chartStyles,
      ...options,
    };
  }

  /**
   * Get chart-specific styling configurations
   */
  getChartSpecificStyles(chartType) {
    const styles = {
      'bar': {
        barThickness: 'flex',
        maxBarThickness: 50,
        borderRadius: 2,
      },
      'column': {
        barThickness: 'flex',
        maxBarThickness: 50,
        borderRadius: 2,
      },
      'line': {
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      'area': {
        tension: 0.4,
        borderWidth: 2,
        fill: true,
        fillOpacity: 0.2,
      },
      'pie': {
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3,
      },
      'scatter': {
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
      },
      'bubble': {
        pointBorderWidth: 2,
        hoverBorderWidth: 3,
      },
      'heatmap': {
        colorScale: 'Blues',
        showScale: true,
      },
    };

    return styles[chartType] || {};
  }

  /**
   * Get color by index from palette
   */
  getColor(index, palette = 'primary') {
    const colors = this.colors[palette] || this.colors.primary;
    return colors[index % colors.length];
  }

  /**
   * Get sequential color scale
   */
  getSequentialScale(steps = 10) {
    return this.interpolateColors(this.colors.sequential, steps);
  }

  /**
   * Get diverging color scale
   */
  getDivergingScale(steps = 11) {
    return this.interpolateColors(this.colors.diverging, steps);
  }

  /**
   * Interpolate colors for gradients
   */
  interpolateColors(colors, steps) {
    if (steps <= colors.length) {
      return colors.slice(0, steps);
    }

    const result = [];
    const segmentSize = (colors.length - 1) / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const position = i * segmentSize;
      const lowerIndex = Math.floor(position);
      const upperIndex = Math.ceil(position);
      const fraction = position - lowerIndex;

      if (lowerIndex === upperIndex) {
        result.push(colors[lowerIndex]);
      } else {
        result.push(this.blendColors(colors[lowerIndex], colors[upperIndex], fraction));
      }
    }

    return result;
  }

  /**
   * Blend two colors
   */
  blendColors(color1, color2, fraction) {
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * fraction);
    const g = Math.round(c1.g + (c2.g - c1.g) * fraction);
    const b = Math.round(c1.b + (c2.b - c1.b) * fraction);

    return this.rgbToHex(r, g, b);
  }

  /**
   * Convert hex to RGB
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * Convert RGB to hex
   */
  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * Get theme configuration
   */
  getTheme(themeName = 'light') {
    const themes = {
      light: {
        backgroundColor: '#ffffff',
        textColor: '#161616',
        gridColor: '#e0e0e0',
        borderColor: '#8d8d8d',
      },
      dark: {
        backgroundColor: '#161616',
        textColor: '#f4f4f4',
        gridColor: '#393939',
        borderColor: '#6f6f6f',
      },
      g10: {
        backgroundColor: '#f4f4f4',
        textColor: '#161616',
        gridColor: '#e0e0e0',
        borderColor: '#8d8d8d',
      },
      g90: {
        backgroundColor: '#262626',
        textColor: '#f4f4f4',
        gridColor: '#393939',
        borderColor: '#6f6f6f',
      },
      g100: {
        backgroundColor: '#161616',
        textColor: '#f4f4f4',
        gridColor: '#393939',
        borderColor: '#6f6f6f',
      },
    };

    return themes[themeName] || themes.light;
  }

  /**
   * Apply accessibility enhancements
   */
  applyAccessibility(options) {
    return {
      ...options,
      accessibility: {
        enabled: true,
        description: options.description || 'Data visualization chart',
        keyboardNavigation: true,
        announceNewData: true,
      },
      // High contrast mode support
      highContrast: options.highContrast || false,
      // Pattern fills for color-blind users
      usePatterns: options.usePatterns || false,
    };
  }

  /**
   * Get responsive configuration
   */
  getResponsiveConfig() {
    return {
      maintainAspectRatio: true,
      responsive: true,
      aspectRatio: 2,
      breakpoints: {
        small: { width: 400, height: 300 },
        medium: { width: 600, height: 400 },
        large: { width: 800, height: 600 },
        xlarge: { width: 1200, height: 800 },
      },
    };
  }

  /**
   * Format numbers for display
   */
  formatNumber(value, options = {}) {
    const {
      decimals = 2,
      prefix = '',
      suffix = '',
      locale = 'en-US',
      notation = 'standard',
    } = options;

    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      notation: notation,
    }).format(value);

    return `${prefix}${formatted}${suffix}`;
  }

  /**
   * Format dates for display
   */
  formatDate(date, format = 'short') {
    const formats = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      time: { hour: '2-digit', minute: '2-digit' },
      datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
    };

    return new Intl.DateTimeFormat('en-US', formats[format] || formats.short).format(new Date(date));
  }
}

// Made with Bob