import dotenv from "dotenv";


dotenv.config()

async function getCryptoPrice({coin,currency}) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
async function getWeather({city}) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const toolFunction = {
    "getCryptoPrice" : getCryptoPrice,
    "getWeather" : getWeather
}
