//We will install express,which will help us in routing,cors which will help us to get rid of block call cors messages when we sending stuff from the frontend to the backend,dotenv to use .env file to store secrets or unsharable sensitive data,which can't be exposed in the  application itself.

// Once we get from the express package,then we store it in the express variable.Then as soon as we have it,we are going to release it.Which will basically expose to different properties and methods that express gives us.

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { sendEmail } = require('./emailControllers');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post('/gemini', (req, res) => {
  (async function () {
    const {
      history: tillDateHistory,
      message: currentMessage
    } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: tillDateHistory
    });
    const result = await chat.sendMessage(currentMessage);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  })();
})

app.post('/email/sendEmail', sendEmail);


// const sendEmail = expressAsyncHandler(async (req, res) => {

// });


app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
})