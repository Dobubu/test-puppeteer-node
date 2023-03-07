const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--start-maximized'],
    // slowMo: 100,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // let currentScreen = await page.evaluate(() => {
  //   return {
  //     width: window.screen.availWidth,
  //     height: window.screen.availHeight
  //   };
  // });
  // await page.setViewport(currentScreen);
  
  await page.goto('https://www.overstock.com/Bedding-Bath/Becky-Cameron-Premium-Down-Alternative-English-Countryside-Reversible-Comforter-Set/32568005/product.html?refccid=PJRTYYSXEEDZD3CLTCTJQBFHIE&osp=true&lyceumGuid=accfc1e1-4ca6-4d8b-b259-5888b624a4a2&searchidx=0',{
    // waitUntil: "domcontentloaded",
  });

  page.click('#page_triggers > div.cl-dialog.CountrySelectStyles__DialogMain-ostk-pt__sc-163khcj-1.jfNZMG.cl-dialog-in > section > button');

  const payload = await page.evaluate(() => {
    const title = document.querySelector("#productTitle > div > h1").innerText;
    const size = document.querySelector("#more > div > div:nth-child(2) > div > div.toggle-content > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2)").innerText;
    
    return { title, size };
  });
  console.log('payload: ', payload);

  const info = `${payload.title}\n${payload.size}`;
  console.log('info: ', info);
  
  fs.writeFileSync('./files/test.txt',info);

  // await page.screenshot({ path: './image/example.png' });
  
  // await browser.close();
})();
