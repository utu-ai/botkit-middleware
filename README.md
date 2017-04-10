# Botkit uTu Middleware

This middleware is the official uTu integration middleware for botkit. It provides
tools for analytics, advertising, and livechat functionality that utu provides through its
online console, found at [https://utu.ai]().

## Installation

### yarn
```sh
$ yarn add botkit-middleware-utu
```

### npm
```sh
$ npm install --save botkit-middleware-utu
```

## Setup
```js
import utuMiddleware from 'botkit-middleware-utu';
import controller from './controller';

// running the uTu middleware function and passing in the controller you have already
// created for your bot will allow uTu to add a new send and receive middleware, it will
// also pass a new contextual instance of uTu with each message that comes to your bot.
utuMiddleware(process.env.UTU_SECRET, controller);
```

## Usage Example (Custom Event)
```js
import controller from './controller';

controller.hears('hello world', ['message_received'], (bot, message) => {
  // log a custom event in utu to track that this user has seen the `hello-world`
  // event, with a custom property of 20 so that we can segment our users/events based on
  // this property.
  message.utu.event('hello-world', {
    values: {
      customProperty: 20,
    },
  });

  bot.reply(message, 'hello');
});
```

## Usage Example (User Information)
```js
import controller from './controller';

controller.hears('login (.*)', ['message_received'], (bot, message) => {
  const email = message.match && message.match[1];

  if (!email) {
    bot.reply('Sorry, i wasn\'t able to find a valid email in your last message');
    return;
  }

  // add the email address to the user's information record so that we segment
  // and filter the user within the uTu console, email addresses are also
  // something uTu can use to cross identity a user within your multibot/multichannel
  // ecosystem, allowing for a more unified user experience.
  message.utu.user({
    values: {
      email,
    }
  });

  bot.reply(message, 'you are now logged in.');
});
```

## Usage Example (Intent)
```js
import controller from './controller';

controller.hears('check balance', ['message_received'], async (bot, message) => {

  try {
    // uTu always returns a promise so this means you can use our functions with the
    // async/await functionality if wanted, if not you can always use the `.then` and
    // `.catch` functions provided via the promise api.
    const resp = await message.utu.intent('check-balance');

    // this intent is meant to return a sponsored dialog (advertisement)
    // uTu will mark this message in most cases to the specific platforms needs
    // making this part fairly simple for the developer.
    bot.reply(message, resp.data.content.message);
  } catch (e) {
    console.log(e);
  }

  bot.reply(message, 'you are now logged in.');
});
```

## Testing
```sh
$ yarn
$ yarn test:watch
```

Results
```sh
-------------------------------|----------|----------|----------|----------|----------------|
File                           |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------------------|----------|----------|----------|----------|----------------|
All files                      |      100 |      100 |      100 |      100 |                |
 botkit-utu-platform-matrix.js |      100 |      100 |      100 |      100 |                |
 get-platform-message.js       |      100 |      100 |      100 |      100 |                |
 index.js                      |      100 |      100 |      100 |      100 |                |
 receive.js                    |      100 |      100 |      100 |      100 |                |
 send.js                       |      100 |      100 |      100 |      100 |                |
-------------------------------|----------|----------|----------|----------|----------------|
```

## Questions/Support
Feel free to leave us any question or issues you have right here on github and we will reply as soon as we can.
