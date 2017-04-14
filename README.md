# uTu Botkit Middleware

This is the official uTu integration package for Botkit.

uTu is an engagement AI for chatbots.  While you focus on training your bot to be an expert in some area, like recommending dinner options or buying movie tickets, our Cyrano AI  interpret's your user conversations looking for opportunities for brand engagement.  Once setup, business users can use our console to define when and where to deliver surveys, product recommendations, users to a live agent, or a paid sponsorship.

uTu also offers robust cross-platform analytics.  We enable you to consistently recognize your users wherever you see them and provide a robust reporting tool.

<table>
  <tbody>
    <tr>
      <td><img src="/docs/subaru_sample_dialog.gif" style="width: 100%" /></td>
      <td>
       <img src="/docs/new_users_sample_report.png" style="width: 100%" />
      </td>
    </tr>
  </tbody>
</table>

This middleware can be run with any of the FB controllers, including Slack, Messenger, SMS, as well as Alexa ([Alexa controller](https://www.npmjs.com/package/alexa-botkit)).

New to bot making?  Check out [https://betterbots.utu.ai/course/building-your-first-bot-with-botkit/]() for a stepwise example of creating a Botkit bot.  

Or visit us at [https://utu.ai]() to learn more and get started.  

## Setup An uTu Account
Go to [https://utu.ai]() and create an account. Once logged in, on the main screen, click the large button to create a new bot.  You will have to supply a name.  From there, "show", then copy your secret key.

## Update Environment
You need to update your environment variables.  Wherever you are maintaining this, you need to add:
```sh
UTU_SECRET=thekeyyoucopiedfromutuconsole
```

## Install SDK
Next you will need to incorporate our package.  Use one of the typical methods:

### yarn
```sh
$ yarn add botkit-middleware-utu
```

### npm
```sh
$ npm install --save botkit-middleware-utu
```

## Add Middleware
Generally, you will want to add the middleware into your code right after you've setup your controller.  It could look something like this:

```js
import utuMiddleware from 'botkit-middleware-utu';
import { facebookbot } from 'botkit';

// create an instance of the facebook bot controller - this could be any controller, just using this for demo
const controller = facebookbot({
  access_token: process.env.FB_ACCESS_TOKEN,
  verify_token: process.env.FB_VERIFY_TOKEN,
});

// running the uTu middleware function and passing in the controller you have already
// created for your bot will allow uTu to add a new send and receive middleware,
utuMiddleware(process.env.UTU_SECRET, controller);
```

## Usage Example - Track an Event
From anywhere in your bot you can log an event to uTu.  This can be useful for logging intents, but also things from your business processing logic, etc. (e.g., purchase made).
```js
...
controller.hears('hello world', ['message_received'], (bot, message) => {
  // log an event in utu to track that this user has experienced `hello-world`
  message.utu.event('hello-world');

  // or you could log the event with a list of custom key value pairs.
  message.utu.event('hello-world', {
    values: {
      customProperty: 20,
    },
  });
  bot.reply(message, 'hello');
});
...
```

## Usage Example - Update a User
Very similar to tracking an event.  Here we simply specify the data to be appended to the user.
```js
...
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
...
```

## Usage Example - uTu Engagement
From within your intent definitions you can make a call to uTu to solicit a response. Depending on your console  setup, this call could return a sponsorship, a survey, a product recommendation, or even a live agent.  You can get creative as to where and when to invoke this call.  Before, after, or as a replacement for something your bot may say.
```js
...
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
...
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
## Usage Guidelines
Be a good corporate citizen.  Use the power of uTu to enhance your user's experience.  If you request and capture Pii, like for a login, you should disclose a privacy statement to the user.  You are 100% responsible for your user relationship.  Your statement should comply w/ both Botkits and [uTu's statements](https://utu.ai/privacy-policy).

## Questions/Support
Feel free to leave us any question or issues you have right here on github and we will reply as soon as we can.
