const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey:'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' ,
  
});

const openai = new OpenAIApi(configuration);


async function runCompletion () {
    console.log("attempting to connect to chaptgpt");
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you today?",
    max_tokens:4000
    });
    console.log(completion.data.choices[0].text);
}

runCompletion();
