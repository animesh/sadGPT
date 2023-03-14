// https://stackoverflow.com/a/72420854
const { default: axios } = require('axios');

// Init a bigData array to push new data on each iteration
const bigData = [];

async function fetchAllPaginateData(
    pageKey = 260 /** init by default page index 0 */,
) {
    try {
        const fetchURL = `https://isha.sadhguru.org/au/en/wisdom/type/quotes?contentType=quotes&page=${pageKey}`;
        const response = await axios.get(fetchURL);
        const { data } = response;
        const { totalPages } = 261; // Your api should give you a total page count, result or something to setup your iteration

        bigData.push(data); // push on big data response data

        // if current page isn't the last, call the fetch feature again, with page + 1
        if (
            pageKey < totalPages &&
            pageKey < 2 // (this is a test dev condition to limit for 10 result) */
        ) {
            pageKey++;
            await new Promise((resolve) => setTimeout(resolve, 200)); // setup a sleep depend your api request/second requirement.
            console.debug(pageKey, '/', totalPages);
            return await fetchAllPaginateData(pageKey);
        }

        console.clear();
        return console.info('Data complete.');
    } catch (err) {
        console.error(err);
    }
}
const data = JSON.stringify(user)
// write JSON string to a file
fs.writeFile('bigData.json', bigData, err => {
  if (err) {
    throw err
  }
  console.log('JSON data is saved.')
})