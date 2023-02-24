import { OpenAI } from "./src/openai/OpenAI.js";
import dotenv from 'dotenv-flow';
dotenv.config();

const openAI = new OpenAI(process.env.OPENAI_API_KEY);
const topic = 'real estate wellbeing';
//const model = 'text-davinci-003';
const model = 'text-ada-001';

const generatePrompt = () => {
    return `Write an blog post of 200 words about "${topic}", include 5 unique points, using informative tone.`
};

await openAI.generateText(generatePrompt(topic), model, 800)
    .then(text => {
        console.log(text);
    })
    .catch(error => {
        console.error(error);
    });