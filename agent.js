import { GoogleGenAI } from '@google/genai';
import { tools } from "./info.js";
import { toolFunction } from './index.js';
import readlineSync from "readline-sync"
const ai = new GoogleGenAI({});

const history = []

async function runAgent({ userPrompt }) {
    while (true) {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: history,
            config: {
                tools,
            }
        });

        if (result.functionCalls && result.functionCalls.length > 0) {
            const functionCall = result.functionCalls[0];
            const { args, name } = functionCall
            console.log(args, name);
            
            // tool fn return refrence of fun and we got the name so we can call it with name as key as {fnName: {args}}
            const response = await toolFunction[name](args)
            history.push({
                role: "model",
                parts: [
                    { functionCall: functionCall }
                ]
            })
            history.push({
                role: "user",
                parts: [
                    {
                        functionResponse: {
                            name: name,
                            response: response
                        }
                    }
                ]
            })

        } else {
            history.push({
                role: "model",
                parts: [
                    { text: result.text }
                ]
            })
            console.log(result.text)
            break;
        }
    }
}


while (true) {
    const question = readlineSync.question("ask question: ")
    if (question === "exit") {
        break;
    }
    history.push({
        role: "user",
        parts: [
            { text: question }
        ]
    })
    await runAgent({ userPrompt: question })
    console.log("-------------------------------------------------------------")
}