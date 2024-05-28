module.exports = {
  runAccessibilityScan: (pages) => {
    const core = require('@actions/core');
    const { AxePuppeteer } = require('@axe-core/puppeteer');
    const puppeteer = require('puppeteer');
    
    const violations = [];
    
    async function runAxeAnalyze(pages) {
      for (const page of pages) {
        console.log(`testing page http://localhost:3000${page}/`);
        const browser = await puppeteer.launch();
        const pageToVisit = await browser.newPage();
        await pageToVisit.goto(`http://localhost:3000${page}/`);
        try {
          const results = await new AxePuppeteer(pageToVisit).analyze();
          if(results.violations.length > 0) {
            results.violations.forEach(violation => {
              console.log(violation);
              violations.push(violation);
            })
          } else {
            console.log('No violations found.');
          }
          
        } catch (error) {
          core.setFailed(`There was an error running the accessibility scan: `, error);
        }
        await browser.close();
      }
      if(violations.length > 0) {
        core.setFailed(`Please fix the above accessibility violations.`);
      }
    }

    runAxeAnalyze(pages);
  }
};
