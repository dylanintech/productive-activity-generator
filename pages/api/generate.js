import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefixPart1 = 
`
Write me a list of the most effective, productive, highest-impact activities for a person with a given occupation, hobby, goal, age, and skill. Make sure the activities in the list are actionable, non-obvious, descriptive, unique, specific, realistic, productive, and help the person get closer to their goals as fast as possible. The activities should not be general, they should be unique to the person.

===EXAMPLE===
Occupation, hobby, goal, age, and skill: senior in high school, love to code web apps, get my company to 1000 users, 17, developing apps on the Ethereum blockchain:
List of productive activities according to the occupation, hobby, goal, age, and skill written directly above:

1. Build a web app that uses GPT-3 to develop experience working with AI and building things .
2. Connect with AI/ML founders on LinkedIn and ask them for advice.
3. Create a Next.js app that leverages ML in a cool way.
4. Get programming advice from members of the Computer Science Club at your high school.
5. Apply for a part-time job at a Y Combinator startup.
6. Search Twitter for any other high school students that are building something interesting in AI and connect with them.
7. Look through Y-combinator's hackernews for cool new AI solutions.
8. Search Google for the best sites to learn about machine learning and AI.
9. Enroll in a course to learn more about Artificial Intelligence and Machine Learning, such as the [buildspace.so](http://buildspace.so/) GPT-3 project.

===BEGIN===
Occupation, hobby, goal, age, and skill:
`
const basePromptPrefixPart2 = 
`
List of productive activities according to the occupation, hobby, goal, age, and skill written directly above:
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
    Take the list of productive activities below, choose the 5 highest-impact and most effective ones according to the user's occupation, hobby, goal, age, and skill also given below and expand on each of those 5. Be specific and go in depth for each activity, explain why each activity is so productive and provide more details and steps for the user to follow. Dont be repetitive or general.

user's occupation, hobby, goal, age, and skill: ${req.body.userInput}

list of productive activities according to the user's occupation, hobby, goal, age, and skill listed above: ${basePromptOutput.text}

Choose the 5 highest-impact and most effective activities from the list above and expand on them. Be personal and write using personal pronouns such as “you” and “your company” , as if you were having a conversation with the user. Dont repeat sentences or phrases:
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