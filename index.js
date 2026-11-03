const puppeteer = require('puppeteer');

async function startKiosk() {
  console.log('Launching cloud browser instance... why yu reading dis');
  const browser = await puppeteer.launch({
    headless: true, //falses by auto if yu are using XFVB extension which yu SHOUDLNT BE DOING *ahem*
    args: [
      '--kiosk',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-size=1920,1080'
    ],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  const page = await browser.newPage();
  
  console.log('Loading V-Social...');
  await page.goto('https://vermillionr.replit.app', {
    waitUntil: 'networkidle2'
  });

  console.log('Vermillionr Social successfully booted! Congrats! :D');

  // chimpunk_998, since you couldnt understand what this is for it's keeping the code running and alive do NOT remove it like last time
  // it took me an eternity to find it in commit history
  // its not dead weight code as yu thought
  process.on('SIGINT', async () => {
    await browser.close();
    process.exit(0);
  });
}

startKiosk().catch(err => {
  console.error('Failed to start browser:', err);
  process.exit(1);
});
