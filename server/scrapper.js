const puppeteer = require('puppeteer')


async function scrape(date, course, numGolfers) {
    const teeTimes = [];
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    const hasGolfers = numGolfers ? `&golfers=${numGolfers}` : ''

    await page.goto(`https://morris-county-golf.book.teeitup.golf/?course=${course}&date=${date}${hasGolfers}`)

    await page.waitForNetworkIdle()
    const count = (await page.$$('[data-testid="teetimes-tile-time"]')).length;
    // console.log('url: ', `https://morris-county-golf.book.teeitup.golf/?course=${course}&date=${date}${hasGolfers}`)

    if (count > 0) {
        for (i = 1; i < count + 1; i++) {
            let element = await page.waitForXPath(`//*[@id="app-container"]/div/div[2]/div/div[2]/div[2]/div[2]/div[${i}]/div/div[1]/p`)
            let text = await page.evaluate(element => element.textContent, element)


            const dateTimeString = `${date} ${text}`
            const event = new Date(dateTimeString)
            event.setHours(event.getHours() - 4);

            teeTimes.push(event)
        }
    }
    browser.close()
    // console.log(teeTimes)

    return teeTimes
}

// const date = '2022-08-13';
// const course = 5153;
// const numGolfers = '3,4'




// scrape(date, course, numGolfers)


module.exports = scrape;