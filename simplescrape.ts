const axios = require("axios");
const cheerio = require("cheerio");
const params = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
};
(async () => {
    //const response = await axios.get("https://news.ycombinator.com/");
    const response = await axios.get("https://isha.sadhguru.org/au/en/wisdom/type/quotes?contentType=quotes&page=260",params);
    const html = response.data;
    console.log(html);
    const data = JSON.stringify(html);
// write JSON string to a file
var fs = require('fs');
fs.writeFile('json.html', html, err => {
  if (err) {
    throw err
  }
  console.log('JSON data is saved.')
})
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
})();
