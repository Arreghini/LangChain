require('dotenv').config();
const { OpenAI } = require("@langchain/openai");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});
