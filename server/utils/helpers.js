module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    // CREDIT: https://learnwithparam.com/blog/how-to-group-by-array-of-objects-using-a-key/
    // Accepts the array and key
    group_assets: (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
        }, {}); // empty object is the initial value for result object
    },
    extract_coin_data: (coinData) => {
        const coinsArr = []

        coinData.forEach(coin => {
            const obj = {}
            const coinName = coin.coin_id;
            const quantity = coin.quantity;
            const price = coin.coin_priceUsd;

            obj.coin = coinName;
            obj.quantity = quantity;
            obj.price = price;
            coinsArr.push(obj);
        })
        return coinsArr;
    },
    currency_formatter: (value) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return formatter.format(value)
    },
}