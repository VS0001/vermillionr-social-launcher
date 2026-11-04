const puppeteer = require('puppeteer');

async function startVermillionrSocial() {
  console.log('Launching Vermillionr Social Environment :D');

  const browser = await puppeteer.launch({
    headless: false, //falses by auto if yu are using XFVB extension which yu SHOUDLNT BE DOING *ahem*
    args: [
      '--display=:99',
      '--kiosk',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-size=1920,1080'
    ],
    defaultViewport: null
  });

  const page = await browser.newPage();
  
  console.log('Navigating to Vermillionr Social... :D');
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

startVermillionrSocial().catch(err => {
  console.error('Looks to be an error...      : /     This is the problem you are having rn:', err);
  process.exit(1);
});
