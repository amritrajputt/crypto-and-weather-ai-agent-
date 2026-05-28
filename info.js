import { Type } from '@google/genai';

export const cryptoInfo = {
    name: "getCryptoPrice",
    description: "get crypto price for the given coin",
    parameters: {
        type: Type.OBJECT,
        properties: {
            coin: {
                type: Type.STRING,
                description: "crypto coin name e.g bitcoin,ethereum,dogecoin etc" 
            },
            currency: {
                type: Type.STRING,
                description: "currency in which the crypto price is to be fetched e.g usd,inr,eur etc if user didnt give currency then default will be inr" 
            }
        },
        required: ["coin", "currency"]
    }
};

export const weatherInfo = {
    name: "getWeather",
    description: "get weather for the given city",
    parameters: {
        type: Type.OBJECT,
        properties: {
            city: {
                type: Type.STRING,
                description: "city name e.g lucknow,delhi,mumbai etc" 
            }
        },
        required: ["city"]
    }
};



export const tools = [{
    functionDeclarations: [cryptoInfo, weatherInfo]
}];

