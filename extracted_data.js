const fetch = require("node-fetch");
const cheerio = require('cheerio');

// function to get the raw data
const getRawData = (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        });
};

// URL for data
const URL = "https://morris-county-golf.book.teeitup.golf/?course=54f14d310c8ad60378b036c8,54f14d310c8ad60378b036cd,54f15556f18d8a4b15fe3071,54f14d310c8ad60378b036cf,54f14d310c8ad60378b036cb&date=2022-05-15&utm_medium=gallus_app&utm_source=gallus_mcpc_golf";

// start of the program
const getTeeTimes = async () => {
    const websiteRawData = await getRawData(URL);

    // parsing the data
    const parsedWebsiteData = cheerio.load(websiteRawData);

    // console.log(parsedWebsiteData("data-testid=teetimes-tile-time")[0]);
    console.log(parsedWebsiteData('data-testid=teetimes-tile-time').html());

    // extracting the table data
    // const teeTimeDataTable = parsedWebsiteData("table.wikitable")[0]
    //     .children[1].children;

    //     console.log("Year --- Winner --- Runner");
    //     teeTimeDataTable.forEach((row) => {
    //         // extracting `td` tags
    //         if (row.name === "tr") {
    //             let year = null,
    //                 winner = null,
    //                 runner = null;

    //             const columns = row.children.filter((column) => column.name === "td");

    //             // extracting year
    //             const yearColumn = columns[0];
    //             if (yearColumn) {
    //                 year = yearColumn.children[0];
    //                 if (year) {
    //                     year = year.children[0].data;
    //                 }
    //             }

    //             // extracting winner
    //             const winnerColumn = columns[3];
    //             if (winnerColumn) {
    //                 winner = winnerColumn.children[1];
    //                 if (winner) {
    //                     winner = winner.children[0].data;
    //                 }
    //             }

    //             // extracting runner
    //             const runnerColumn = columns[5];
    //             if (runnerColumn) {
    //                 runner = runnerColumn.children[1];
    //                 if (runner) {
    //                     runner = runner.children[0].data;
    //                 }
    //             }

    //             if (year && winner && runner) {
    //                 console.log(`${year} --- ${winner} --- ${runner}`);
    //             }
    //         }
    //     });
};

// invoking the main function
getTeeTimes();
