## Cake | POS

The app demonstrates a simple POS application catering to a basic set of requirements.



## Requirements

- Node 8
- react: ^16.8.1
- Git

Without any changes, this app is connected to a Contentful space with read-only access. To experience the full end-to-end Contentful experience, you need to connect the app to a Contentful space with read *and* write access. This enables you to see how content editing in the Contentful web app works and how content changes propagate to this app.

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
npm start
```

Open [http://localhost:3000](http://localhost:3000/) and take a look around.
