const express = require('express');
const bodyParser = require('body-parser');

const { Configuration, OpenAIApi } = require("openai");
const { use } = require('express/lib/application');
const { WatchIgnorePlugin } = require('webpack');
const res = require('express/lib/response');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);



async function runCompletion (userName) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Create the most acurate user profile based on the given name " + userName + " the result should be gven in the format Name: *answer*, Faviiorte cusine: *answers*, dietary restritions: *answers*  " , 
        max_tokens: 100
    });
    resp = completion.data.choices[0].text
    console.log("*")
    console.log(resp)
    console.log("*")
    return resp;
}

 const sendData = (req,res) => {
    runCompletion(req.params.name).then((a) => {
        res.send(String(a));
    });

 }
//runCompletion("aali");

const app = express();
const port = 3070;

// array to hold users
const users = [{ firstName: 'fnam1', lastName: 'lnam1', userName: 'username1' }];

app.use(bodyParser.json());

// Default user
app.get('/', (req, res) => {
  res.send('App works!!!!');
});

// request to get all the users
app.get('/users/:name', (req, res) => {
  //result = runCompletion("aali")
  sendData(req,res);
  console.log("*****" + req.params.name + "*****");
  

  
});

app.get('/greeting', (req, res) => {
    res.json(users);
  });

// request to get all the users by userName
// app.get('/users/:userName', (req, res) => {
//   const user = users.filter((user) => {
//     if (req.params.userName === user.userName) {
//       return user;
//     }
//   });
//   res.json(user);
// });

// request to post the user
// req.body has object of type {firstName:"fnam1",lastName:"lnam1",userName:"username1"}
app.post('/user', (req, res) => {
  users.push(req.body);
  res.json(users);
});

app.listen(port, (err) => {
  console.log(`running server on from port:::::::${port}`);
});
