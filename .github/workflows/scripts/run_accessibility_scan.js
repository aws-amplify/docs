module.exports = {
  runAccessibilityScan: (pages) => {
    const core = require('@actions/core');
    const { AxePuppeteer } = require('@axe-core/puppeteer');
    const puppeteer = require('puppeteer');
    
    const violations = [];
    
    // When flipping from dark mode to light mode, we need to add a small timeout
    // to account for css transitions otherwise there can be false contrast issues found.
    // Usage: await sleep(300);
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    const logViolation = (violation) => {
      violation.nodes.forEach(node => {
        console.log(node.failureSummary);
        console.log(node.html);
        node.target.forEach( target => {
          console.log('CSS target: ', target)
        })
        console.log('\n');
      })
      
    }

    async function runAxeAnalyze(pages) {
      for (const page of pages) {
        const browser = await puppeteer.launch();
        const pageToVisit = await browser.newPage();
        await pageToVisit.goto(`http://localhost:3000${page}/`, {waitUntil: 'domcontentloaded'});
        await pageToVisit.click('button[title="Light mode"]');
        await pageToVisit.waitForSelector('[data-amplify-color-mode="light"]');
        await sleep(300);

        
        try {
          console.log(`\nTesting light mode: http://localhost:3000${page}/`)
          const results = await new AxePuppeteer(pageToVisit).analyze();
          if(results.violations.length > 0) {
            results.violations.forEach(violation => {
              logViolation(violation);
              violations.push(violation);
            })
          } else {
            console.log('No violations found. \n');
          }
          
        } catch (error) {
          core.setFailed(`There was an error testing the page: ${error}`);
        }

        await pageToVisit.click('button[title="Dark mode"]');
        await pageToVisit.waitForSelector('[data-amplify-color-mode="dark"]');
        await sleep(300);
        
        try {
          console.log(`\nTesting dark mode: http://localhost:3000${page}/`)
          const results = await new AxePuppeteer(pageToVisit).analyze();
          if(results.violations.length > 0) {
            results.violations.forEach(violation => {
              logViolation(violation);
              violations.push(violation);
            })
          } else {
            console.log('No violations found. \n');
          }
          
        } catch (error) {
          core.setFailed(`There was an error testing the page: ${error}`);
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
