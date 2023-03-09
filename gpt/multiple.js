const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 设置分类页面的 URL 和页码范围
  const categoryUrl = 'https://example.com/category';
  const pageRange = { start: 1, end: 10 };

  // 读取每一页的标题
  const titles = [];
  for (let i = pageRange.start; i <= pageRange.end; i++) {
    const url = `${categoryUrl}/page/${i}/`;
    await page.goto(url);

    const pageTitles = await page.evaluate(() => {
      const titles = [];
      const titleElements = document.querySelectorAll('.post-title a');
      titleElements.forEach(titleElement => titles.push(titleElement.innerText));
      return titles;
    });

    titles.push(...pageTitles);
  }

  // 将标题写入文件
  fs.writeFileSync('test.txt', titles.join('\n'));

  // 关闭浏览器
  await browser.close();
})();
