const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.overstock.com/c/bedding/comforters-and-sets?t=50');

  // page.click('#page_triggers > div.cl-dialog.CountrySelectStyles__DialogMain-ostk-pt__sc-163khcj-1.jfNZMG.cl-dialog-in > section > button');
  await page.waitForSelector('h1');

  const products = await page.evaluate(() => {
    const productLinks = document.querySelectorAll('#productTile > a');
    const list = [];
    
    for (let i = 0; i < productLinks.length; i++) {
      const productLink = productLinks[i].href;
      
      list.push({ link: productLink });
    }
    
    return list;
  });

  let titles = [];

  for (let i = 0; i < products.length; i++) {
    const productPage = await browser.newPage();
    await productPage.goto(products[i].link);

    // page.click('#page_triggers > div.cl-dialog.CountrySelectStyles__DialogMain-ostk-pt__sc-163khcj-1.jfNZMG.cl-dialog-in > section > button');

    const payload = await productPage.evaluate(() => {
      const title = document.querySelector("#productTitle > div > h1").innerText;
      const size = document.querySelector("#more > div > div:nth-child(2) > div > div.toggle-content > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)").innerText;
      
      return { title, size };
    });

    const title = `${payload.title}\n${payload.size}`;
    titles = [...titles, title]

    await productPage.close();
  }

  fs.writeFileSync('./files/multiple.txt', titles.join('\n\n'));
  
  // await browser.close();
})();
