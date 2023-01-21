import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    console.log('creating...', data);

    let text: string =
      (await generateSummary(data.Name)) || 'mock data';

    event.params.data.DealsDescription = text;
  },
};

async function generateSummary(destinationName) {
  // return '';
  const promptPreamble =
    'write me an 150 to 250 word article on flight tips when traveling to ' +
    destinationName;
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: promptPreamble,
    max_tokens: 1000,
  });
  return completion.data.choices.reduce(
    (last, choice) => last + choice.text,
    '',
  );
}
