import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const prompt = req.query.prompt;
    const language = req.query.language;

    if (!prompt || !language){
        return res.status(400).json({error: "Prompt/Language missing"});

    }

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate the following to ${language}. Respond only with the word(s) and nothing else: ${prompt}\n`,
        max_tokens: 200,
        temperature: 0.8,
        presence_penalty: 0,
        frequency_penalty: 0,
    });

    const answer = completion.data.choices[0].text;
    res.status(200).json({answer});
    
}
