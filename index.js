const puppeteer = require('puppeteer')


async function scrape() {
    const teeTimes = [];
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto('https://morris-county-golf.book.teeitup.golf/?course=54f14d310c8ad60378b036c8&date=2022-08-14')

    await page.waitForNetworkIdle()
    const count = (await page.$$('[data-testid="teetimes-tile-time"]')).length;
    for (i = 1; i < count + 1; i++) {
        var element = await page.waitForXPath(`//*[@id="app-container"]/div/div[2]/div/div[2]/div[2]/div[2]/div[${i}]/div/div[1]/p`)
        var text = await page.evaluate(element => element.textContent, element)
        teeTimes.push(text)
    }
    browser.close()
    console.log(teeTimes)
}
scrape()




//*[@id="app-container"]/div/div[2]/div/div[2]/div[2]/div[2]/div[1]/div/div[1]/p
//*[@id="app-container"]/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/div/div[1]/p
//*[@id="app-container"]/div/div[2]/div/div[2]/div[2]/div[2]/div[3]/div/div[1]/p
// document.querySelector("#app-container > div > div.jss3 > div > div.jss99 > div.jss103 > div.jss104 > div:nth-child(2) > div > div.jss255")