// OpenAI.js

import { Configuration, OpenAIApi } from 'openai';
export class OpenAI {
    constructor(apiKey) {
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }

    async generateText(prompt, model, max_tokens, temperature = 0.6) {
        try {
            const response = await this.openai.createCompletion({
                model,
                prompt,
                max_tokens,
                n: 1,
                temperature,
            });
            console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
            console.log(response.data.usage);
            return response.data.choices;
        } catch (error) {
            throw error;
        }
    }
}