const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });
  const page = await browser.newPage();
  
  await page.goto('https://vuejs.org/v2/guide/');
  await page.waitForSelector('#app');
  
  const title = await page.evaluate(() => {
    return document.querySelector('h1').textContent;
  });
  
  console.log('Title:', title);
  
  // await browser.close();
})();
