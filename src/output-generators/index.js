/**
 * Output Generator
 * Generates output in various formats (HTML, PNG, Word)
 */

import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, Table, TableRow, TableCell, WidthType } from 'docx';
import puppeteer from 'puppeteer';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class OutputGenerator {
  constructor() {
    this.outputDir = join(process.cwd(), 'output');
    this.ensureOutputDir();
  }

  async ensureOutputDir() {
    if (!existsSync(this.outputDir)) {
      await mkdir(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate output in specified format
   */
  async generate({ visualization, analysis, format, chartType }) {
    await this.ensureOutputDir();

    switch (format) {
      case 'html':
        return await this.generateHTML(visualization, analysis, chartType);
      
      case 'png':
        return await this.generatePNG(visualization, analysis, chartType);
      
      case 'word':
        return await this.generateWord(visualization, analysis, chartType);
      
      default:
        return await this.generateHTML(visualization, analysis, chartType);
    }
  }

  /**
   * Generate dashboard with multiple visualizations
   */
  async generateDashboard({ components, format, title }) {
    await this.ensureOutputDir();

    switch (format) {
      case 'html':
        return await this.generateDashboardHTML(components, title);
      
      case 'word':
        return await this.generateDashboardWord(components, title);
      
      default:
        return await this.generateDashboardHTML(components, title);
    }
  }

  /**
   * Generate HTML output
   */
  async generateHTML(visualization, analysis, chartType) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `visualization-${chartType}-${timestamp}.html`;
    const filepath = join(this.outputDir, filename);

    const html = this.createHTMLDocument(visualization, analysis, chartType);
    
    await writeFile(filepath, html, 'utf-8');

    return {
      format: 'html',
      path: filepath,
      filename,
      content: html,
    };
  }

  /**
   * Generate PNG output
   */
  async generatePNG(visualization, analysis, chartType) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `visualization-${chartType}-${timestamp}.png`;
    const filepath = join(this.outputDir, filename);

    // Create HTML first
    const html = this.createHTMLDocument(visualization, analysis, chartType);
    
    // Use puppeteer to render and capture
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Wait for chart to render
    await page.waitForTimeout(2000);
    
    await page.screenshot({
      path: filepath,
      fullPage: true,
    });

    await browser.close();

    return {
      format: 'png',
      path: filepath,
      filename,
    };
  }

  /**
   * Generate Word document output
   */
  async generateWord(visualization, analysis, chartType) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `visualization-${chartType}-${timestamp}.docx`;
    const filepath = join(this.outputDir, filename);

    const doc = await this.createWordDocument(visualization, analysis, chartType);
    
    // Generate buffer and save
    const buffer = await doc.generate();
    await writeFile(filepath, buffer);

    return {
      format: 'word',
      path: filepath,
      filename,
    };
  }

  /**
   * Generate dashboard HTML
   */
  async generateDashboardHTML(components, title) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `dashboard-${timestamp}.html`;
    const filepath = join(this.outputDir, filename);

    const html = this.createDashboardHTML(components, title);
    
    await writeFile(filepath, html, 'utf-8');

    return {
      format: 'html',
      path: filepath,
      filename,
      content: html,
    };
  }

  /**
   * Generate dashboard Word document
   */
  async generateDashboardWord(components, title) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `dashboard-${timestamp}.docx`;
    const filepath = join(this.outputDir, filename);

    const doc = await this.createDashboardWordDocument(components, title);
    
    const buffer = await doc.generate();
    await writeFile(filepath, buffer);

    return {
      format: 'word',
      path: filepath,
      filename,
    };
  }

  /**
   * Create HTML document
   */
  createHTMLDocument(visualization, analysis, chartType) {
    const analysisHTML = analysis ? this.formatAnalysisHTML(analysis) : '';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${visualization.title}</title>
  <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f4f4f4;
      color: #161616;
      line-height: 1.6;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    h1 {
      font-size: 32px;
      font-weight: 600;
      color: #161616;
      margin-bottom: 10px;
    }
    .metadata {
      color: #525252;
      font-size: 14px;
    }
    .chart-container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    .analysis-section {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .analysis-section h2 {
      font-size: 24px;
      font-weight: 600;
      color: #161616;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #0f62fe;
    }
    .analysis-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #161616;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .summary {
      background: #e8f4ff;
      padding: 20px;
      border-radius: 4px;
      border-left: 4px solid #0f62fe;
      margin-bottom: 20px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .stat-card {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 4px;
    }
    .stat-label {
      font-size: 12px;
      color: #525252;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #161616;
    }
    .insights-list {
      list-style: none;
    }
    .insight-item {
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
      border-left: 4px solid #0f62fe;
    }
    .insight-item.high {
      background: #fff1f1;
      border-left-color: #da1e28;
    }
    .insight-item.medium {
      background: #fff8e1;
      border-left-color: #f1c21b;
    }
    .insight-item.low {
      background: #e8f4ff;
      border-left-color: #0f62fe;
    }
    .insight-type {
      font-size: 12px;
      color: #525252;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .recommendations {
      margin-top: 20px;
    }
    .recommendation-item {
      padding: 15px;
      margin-bottom: 10px;
      background: #f4f4f4;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #525252;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${visualization.title}</h1>
      <div class="metadata">
        Generated on ${new Date().toLocaleString()} | 
        Chart Type: ${chartType} | 
        Data Points: ${visualization.metadata?.dataPoints || 'N/A'}
      </div>
    </div>

    <div class="chart-container">
      <div id="chart"></div>
    </div>

    ${analysisHTML}

    <div class="footer">
      Generated by Watsonx Visualization MCP Server
    </div>
  </div>

  <script>
    ${this.generatePlotlyScript(visualization)}
  </script>
</body>
</html>
    `.trim();
  }

  /**
   * Format analysis as HTML
   */
  formatAnalysisHTML(analysis) {
    if (!analysis) return '';

    let html = '<div class="analysis-section">';
    html += '<h2>Data Analysis</h2>';

    // Summary
    if (analysis.summary) {
      html += `<div class="summary"><strong>Summary:</strong> ${analysis.summary}</div>`;
    }

    // Statistics
    if (analysis.statistics && analysis.statistics.count > 0) {
      html += '<h3>Statistical Summary</h3>';
      html += '<div class="stats-grid">';
      
      const stats = [
        { label: 'Count', value: analysis.statistics.count },
        { label: 'Mean', value: analysis.statistics.mean },
        { label: 'Median', value: analysis.statistics.median },
        { label: 'Std Dev', value: analysis.statistics.standardDeviation },
        { label: 'Min', value: analysis.statistics.min },
        { label: 'Max', value: analysis.statistics.max },
      ];

      stats.forEach(stat => {
        html += `
          <div class="stat-card">
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
          </div>
        `;
      });

      html += '</div>';
    }

    // Trends
    if (analysis.trends) {
      html += '<h3>Trend Analysis</h3>';
      html += `<p><strong>Overall Trend:</strong> ${analysis.trends.overall}</p>`;
      html += `<p><strong>Direction:</strong> ${analysis.trends.direction}</p>`;
      html += `<p><strong>Strength:</strong> ${(analysis.trends.strength * 100).toFixed(1)}%</p>`;
    }

    // Insights
    if (analysis.insights && analysis.insights.length > 0) {
      html += '<h3>Key Insights</h3>';
      html += '<ul class="insights-list">';
      
      analysis.insights.forEach(insight => {
        html += `
          <li class="insight-item ${insight.impact}">
            <div class="insight-type">${insight.type}</div>
            <div>${insight.message}</div>
          </li>
        `;
      });

      html += '</ul>';
    }

    // Recommendations
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      html += '<div class="recommendations">';
      html += '<h3>Recommendations</h3>';
      
      analysis.recommendations.forEach(rec => {
        html += `
          <div class="recommendation-item">
            <strong>${rec.type}:</strong> ${rec.message}
          </div>
        `;
      });

      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  /**
   * Generate Plotly script
   */
  generatePlotlyScript(visualization) {
    if (visualization.chart && visualization.chart.data && visualization.chart.layout) {
      return `
        const data = ${JSON.stringify(visualization.chart.data)};
        const layout = ${JSON.stringify(visualization.chart.layout)};
        Plotly.newPlot('chart', data, layout, {responsive: true});
      `;
    }
    return '';
  }

  /**
   * Create dashboard HTML
   */
  createDashboardHTML(components, title) {
    const chartsHTML = components.map((comp, index) => {
      const analysisHTML = comp.analysis ? this.formatAnalysisHTML(comp.analysis) : '';
      
      return `
        <div class="dashboard-item">
          <div class="chart-container">
            <h3>${comp.title || `Chart ${index + 1}`}</h3>
            <div id="chart-${index}"></div>
          </div>
          ${analysisHTML}
        </div>
      `;
    }).join('');

    const scripts = components.map((comp, index) => {
      if (comp.visualization.chart && comp.visualization.chart.data) {
        return `
          Plotly.newPlot('chart-${index}', 
            ${JSON.stringify(comp.visualization.chart.data)}, 
            ${JSON.stringify(comp.visualization.chart.layout)}, 
            {responsive: true}
          );
        `;
      }
      return '';
    }).join('\n');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'IBM Plex Sans', sans-serif;
      background: #f4f4f4;
      color: #161616;
      line-height: 1.6;
    }
    .container { max-width: 1600px; margin: 0 auto; padding: 40px 20px; }
    .header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    h1 { font-size: 36px; font-weight: 600; color: #161616; }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
      gap: 30px;
    }
    .dashboard-item {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .chart-container { padding: 30px; }
    .chart-container h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #161616;
    }
    .analysis-section { padding: 30px; background: #f4f4f4; }
    .analysis-section h2 {
      font-size: 18px;
      font-weight: 600;
      color: #161616;
      margin-bottom: 15px;
    }
    .summary {
      background: #e8f4ff;
      padding: 15px;
      border-radius: 4px;
      border-left: 4px solid #0f62fe;
      margin-bottom: 15px;
      font-size: 14px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 15px 0;
    }
    .stat-card {
      background: white;
      padding: 10px;
      border-radius: 4px;
    }
    .stat-label {
      font-size: 11px;
      color: #525252;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 18px;
      font-weight: 600;
      color: #161616;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #525252;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
      <div class="metadata">Generated on ${new Date().toLocaleString()}</div>
    </div>

    <div class="dashboard-grid">
      ${chartsHTML}
    </div>

    <div class="footer">
      Generated by Watsonx Visualization MCP Server
    </div>
  </div>

  <script>
    ${scripts}
  </script>
</body>
</html>
    `.trim();
  }

  /**
   * Create Word document
   */
  async createWordDocument(visualization, analysis, chartType) {
    const sections = [];

    // Title
    sections.push(
      new Paragraph({
        text: visualization.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      })
    );

    // Metadata
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Generated: ${new Date().toLocaleString()} | Chart Type: ${chartType}`,
            size: 20,
            color: '525252',
          }),
        ],
        spacing: { after: 400 },
      })
    );

    // Analysis
    if (analysis) {
      sections.push(...this.formatAnalysisWord(analysis));
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: sections,
      }],
    });

    return doc;
  }

  /**
   * Format analysis for Word
   */
  formatAnalysisWord(analysis) {
    const paragraphs = [];

    // Summary
    if (analysis.summary) {
      paragraphs.push(
        new Paragraph({
          text: 'Summary',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        }),
        new Paragraph({
          text: analysis.summary,
          spacing: { after: 300 },
        })
      );
    }

    // Statistics
    if (analysis.statistics && analysis.statistics.count > 0) {
      paragraphs.push(
        new Paragraph({
          text: 'Statistical Summary',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      const stats = [
        `Count: ${analysis.statistics.count}`,
        `Mean: ${analysis.statistics.mean}`,
        `Median: ${analysis.statistics.median}`,
        `Standard Deviation: ${analysis.statistics.standardDeviation}`,
        `Min: ${analysis.statistics.min}`,
        `Max: ${analysis.statistics.max}`,
      ];

      stats.forEach(stat => {
        paragraphs.push(
          new Paragraph({
            text: `• ${stat}`,
            spacing: { after: 100 },
          })
        );
      });
    }

    // Insights
    if (analysis.insights && analysis.insights.length > 0) {
      paragraphs.push(
        new Paragraph({
          text: 'Key Insights',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      analysis.insights.forEach(insight => {
        paragraphs.push(
          new Paragraph({
            text: `• ${insight.message}`,
            spacing: { after: 100 },
          })
        );
      });
    }

    return paragraphs;
  }

  /**
   * Create dashboard Word document
   */
  async createDashboardWordDocument(components, title) {
    const sections = [];

    // Title
    sections.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 400 },
      })
    );

    // Each component
    components.forEach((comp, index) => {
      sections.push(
        new Paragraph({
          text: comp.title || `Chart ${index + 1}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
        })
      );

      if (comp.analysis) {
        sections.push(...this.formatAnalysisWord(comp.analysis));
      }
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: sections,
      }],
    });

    return doc;
  }
}

// Made with Bob