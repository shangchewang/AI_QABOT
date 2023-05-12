import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
 apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Add Access-Control-Allow-Origin header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
 res.status(200).send({
 message: 'Hello from CodeX',
 })
});

app.post('/', async (req, res) => {
 try {
 const openai = new OpenAIApi(configuration);
 const response = await openai.createCompletion({
 model: "text-davinci-003",
 prompt: req.body.prompt,
 temperature: 0,
 max_tokens: 3000,
 top_p: 1,
 frequency_penalty: 0.5,
 presence_penalty: 0,
 });

 res.status(200).send({
 bot: response.data.choices[0].text
 });
 } catch (error) {
 console.error(error)
 res.status(500).send({ error });
 }
});

app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
