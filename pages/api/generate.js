import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefixPart1 = 
`
Write me a list of productive activities for the person with the following occupation, hobby, and goal. Make sure the activities in the list are non-obvious, descriptive, unique, specific, realistic, productive, and help the person get closer to their goals as fast as possible.

Occupation, hobby, goal: senior in high school, love to code web apps, be the founder of a successful AI company:
List of productive activities according to the occupation, hobby, and goal written directly above:
1. Ship the GPT-3 AI Writer project on buildspace.so.
2. Connect with AI/ML founders on LinkedIn and ask them for advice.
3. Create a Next.js app that leverages ML in a cool way.
4. Get programming advice from members of the Computer Science Club at your high school.
5. Apply for a part-time job at a Y Combinator startup.
6. Search Twitter for any other high school students that are building something interesting in AI and connect with them.
7. Look through hackernews for cool new AI solutions.
8. Search Google for best sites to learn about machine learning and AI.

Occupation, hobby, goal:
`
const basePromptPrefixPart2 = 
`
List of productive activities according to the occupation, hobby, and goal written directly above:
`
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefixPart1}${req.body.userInput}${basePromptPrefixPart2}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefixPart1}${req.body.userInput}\n${basePromptPrefixPart2}\n`,
        temperature: 1,
        max_tokens: 650,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    const secondPrompt = 
    `
    Take the list of productive activities below, choose the 5 highest-impact and most effective ones according to the users occupation, hobby, and goal, and expand on each of those 5. Be specific and go in depth for each activity. Dont be repetitive.

occupation, hobby, goal: ${req.body.userInput}

list of productive activities: ${basePromptOutput.text}

Choose the 5 highest-impact and most effective activities from the list above and expand on them. Be personal and write using personal pronouns such as “you” and “your company” , as if you were having a conversation with the user:
    `

    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}`,
        temperature: 0.8,
        max_tokens: 600,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({ output: secondPromptOutput });
}

export default generateAction;