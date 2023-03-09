const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://example.com/category');
  await page.waitForSelector('.product-title');

  const products = await page.evaluate(() => {
    const productTitles = document.querySelectorAll('.product-title');
    const productLinks = document.querySelectorAll('.product-link');
    const productList = [];
    
    for (let i = 0; i < productTitles.length; i++) {
      const productTitle = productTitles[i].textContent;
      const productLink = productLinks[i].href;
      
      productList.push({ title: productTitle, link: productLink });
    }
    
    return productList;
  });
  
  console.log('Products:', products);
  
  // 擷取每個商品頁面中的資料
  for (let i = 0; i < products.length; i++) {
    const productPage = await browser.newPage();
    await productPage.goto(products[i].link);
    
    // ...在這裡繼續編寫代碼，以擷取商品頁面中的資料...
    
    await productPage.close();
  }
  
  await browser.close();
})();
