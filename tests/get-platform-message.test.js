import getMessageDataForPlatform from '../src/get-platform-message';

const tests = [
  {
    name: 'Messenger',
    platform: 'messenger',
    botMessage: false,
    message: {
      timestamp: 0,
      user: 1,
      text: 'hello world',
    },
    test: (msg, done) => {
      expect(msg).toHaveProperty('rawMessage.object', 'page');
      expect(msg).toHaveProperty('rawMessage.entry.0.time', 0);
      expect(msg).toHaveProperty('rawMessage.entry.0.messaging.0.sender.id', 1);
      expect(msg).toHaveProperty('rawMessage.entry.0.messaging.0.timestamp', 0);
      expect(msg).toHaveProperty('rawMessage.entry.0.messaging.0.message', 'hello world');
      expect(msg).toHaveProperty('message', 'hello world');
      expect(msg).toHaveProperty('botMessage', false);
      done();
    }
  },
  {
    name: 'Slack',
    platform: 'slack',
    botMessage: false,
    message: {
      timestamp: 0,
      user: 1,
      text: 'hello world',
    },
    test: (msg, done) => {
      expect(msg).toHaveProperty('rawMessage.timestamp', 0);
      expect(msg).toHaveProperty('rawMessage.user', 1);
      expect(msg).toHaveProperty('rawMessage.text', "hello world");
      expect(msg).toHaveProperty('message', 'hello world');
      expect(msg).toHaveProperty('botMessage', false);
      done();
    }
  },
  {
    name: 'Alexa',
    platform: 'alexa',
    botMessage: false,
    message: {
      alexa: {
        text: 'test',
        getIntentName: () => 'hello'
      }
    },
    test: (msg, done) => {
      expect(msg).toHaveProperty('rawMessage.text', 'test');
      expect(msg).toHaveProperty('message', 'hello');
      expect(msg).toHaveProperty('botMessage', false);
      done();
    }
  },
  {
    name: 'Default',
    platform: 'asdfasdf',
    botMessage: false,
    message: {
      timestamp: 0,
      user: 1,
      text: 'hello world',
    },
    test: (msg, done) => {
      expect(msg).toHaveProperty('rawMessage.timestamp', 0);
      expect(msg).toHaveProperty('rawMessage.user', 1);
      expect(msg).toHaveProperty('rawMessage.text', "hello world");
      expect(msg).toHaveProperty('message', 'hello world');
      expect(msg).toHaveProperty('botMessage', false);
      done();
    }
  },
];

describe('Send Middleware', function() {
  describe('Given Construction', () => {
    tests.forEach((t) => {
      it(t.name, function(done) {
        const msg = getMessageDataForPlatform(t.platform, t.message, t.botMessage);

        t.test(msg, done);
      });
    })
  })
});
