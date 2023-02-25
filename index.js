import { OpenAI } from "./src/openai/OpenAI.js";
import { GitlabAction } from "./src/gitlabaction/GitlabAction.js ";
import { genReviewPRPrompt } from "./src/openai/prompt.js";
import dotenv from 'dotenv-flow';
dotenv.config();

const projectid = 177;
const mergeRequestid = 1603;
const openAI = new OpenAI(process.env.OPENAI_API_KEY);
//const model = 'text-davinci-003';
const model = 'text-ada-001';


const gitlabaction = new GitlabAction(process.env.GITLAB_URL, process.env.GITLAB_API_KEY);
const mergeRequest = await gitlabaction.mergeRequest(projectid,mergeRequestid);
const mergeRequestdiffs = await gitlabaction.mergeRequestDiff(projectid,mergeRequestid);

let contateneddiffs = '';
mergeRequestdiffs.forEach(element => {
    contateneddiffs += element.diff;
});
contateneddiffs = '';

contateneddiffs += mergeRequestdiffs[0].diff;
contateneddiffs += mergeRequestdiffs[1].diff;
contateneddiffs += mergeRequestdiffs[2].diff;
const generatePrompt = genReviewPRPrompt(mergeRequest.title, mergeRequest.description, contateneddiffs);

console.log(generatePrompt);

await openAI.generateText(generatePrompt, model, 800)
    .then(text => {
        console.log(text);
    })
    .catch(error => {
        console.error(error);
    });