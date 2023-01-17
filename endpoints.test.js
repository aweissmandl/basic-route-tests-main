const { expect } = require('chai');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Import the app.
const app = require('./server');

// Import the config file where the port is defined.
// It is a good practice to avoid hard-coding the port.
const config = require('./config.json');

// Start the app on the port that is in the config.
const server = app.listen(config.port.test);


//define a BASE_URL
const BASE_URL =  `http://localhost:${config.port.test}`

it('when path is "/", it Should serve index.html', async () => {
  const response = await fetch(BASE_URL);

  // Confirms that the index.html file is served from the static folder.
  expect(response.status).to.eq(200);
});

it('Should serve script.js', async () => {
  const response = await fetch(`${BASE_URL}/script.js`);

  // Confirms that the script.js file is served from the static folder.
  expect(response.status).to.eq(200);
});

it('Should serve style.css', async () => {
  const response = await fetch(`${BASE_URL}/style.css`);

  // Confirms that the style.css file is served from the static folder.
  expect(response.status).to.eq(200);
});

it('Should handle a login post', async () => {
  // Create the form data programmatically.
  // Normally a form-data object would be created by the browser from a form element.
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers : {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({
      username : 'test',
      password : 'test'
    }),
  });

  // Confirms that the server responds with the username and password.
  expect(response.status).to.eq(200);
  expect(await response.text()).to.eq('Username: test, Password: test');
});

it('Should render an EJS template', async () => {
  const response = await fetch(
    `${BASE_URL}/template?name=Test`,
  );

  // Confirms that the server responds with a rendered EJS template containing Hello Test!.
  expect(response.status).to.eq(200);

  const $ = cheerio.load(await response.text());

  expect($('div').text()).to.eq('Hello Test!');
});


it('Should render an EJS template - use the query to fill in the name', async () => {
  const response = await fetch(
    `${BASE_URL}/template?name=David`,
  );

  // Confirms that the server responds with a rendered EJS template containing Hello Test!.
  expect(response.status).to.eq(200);

  const $ = cheerio.load(await response.text());

  expect($('div').text()).to.eq('Hello David!');
});
// At the end of the tests, close the server.
after(() => server.close());
