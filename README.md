## Cake | POS

The app demonstrates a simple POS application catering to a basic set of requirements.



## Requirements

- React 16.8.1
- Node 8.10
- Mongoose 5.4.11

## Common setup

Clone the repo and install the dependencies.

```
git clone https://github.com/Anupama94/Cake-POS.git/
cd server
npm install
```

To start the express server, run the following

```
PORT=3001 npm start
```

To start the client, run the following

```
cd client
npm install
npm start
```

The server-side has been integrated with ESLint to check the source code for programmatic as well as stylistic errors. Using the airbnb rule-set, the code consists of 0 eslint issues.

Server-side unit test coverage as of 21.03.2019, is **81%**. To run the unit tests,

```
cd server
npm test
```

Open [http://localhost:3000](http://localhost:3000/) and take a look around by logging in with the following credentials.

​	username: abcd@123.com

​	password: abc