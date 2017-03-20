import send from '../src/send';
import uTu from './utu.mock';

const tests = [
  {
    name: 'invalid bot type',
    bot: {
      type: 'unknown',
    },
    test: function (done) {
      expect(this.errors).toHaveLength(1);
      done();
    }
  },
  {
    name: 'messenger simple message',
    bot: {
      type: 'fb',
    },
    message: {
      channel: '0000000000000000',
      user: '0000000000000000',
      text: 'hello world',
    },
    test: function (done) {
      expect(this.errors).toHaveLength(0);
      done();
    }
  },
  {
    name: 'messenger no message',
    bot: {
      type: 'fb',
    },
    message: {
      channel: '0000000000000000',
      user: '0000000000000000',
    },
    test: function (done) {
      expect(this.errors).toHaveLength(0);
      done();
    }
  },
  {
    name: 'messenger no channel',
    bot: {
      type: 'fb',
    },
    message: {
      user: '0000000000000000',
    },
    test: function (done) {
      expect(this.errors).toHaveLength(0);
      done();
    }
  },
  {
    name: 'slack simple message',
    bot: {
      type: 'slack',
    },
    message: {
      channel: 'D0FSKDe',
      user: 'D0FSKDe',
      text: 'hello world',
    },
    test: function (done) {
      expect(this.errors).toHaveLength(0);
      done();
    }
  }
];

describe('Send Middleware', function() {
  // create a mocked version of the utu client
  const utu = new uTu();

  beforeEach(function () {
    // create a new instance of the send middleware
    this.middle = send(utu);
    this.errors = [];
    // since we don't want to throw error from the middleware
    // we are using console.error, so lets overwrite this function
    // to log the errors within the context of the current running
    // test
    console.error = (...args) => {
      this.errors.push(...args);
    }
  });

  describe('Given Construction', () => {
    tests.forEach((t) => {
      it(t.name, function(done) {
        this.middle(t.bot, t.message, () => {});
        if (t.test) {
          t.test.bind(this)(done);
        } else {
          done();
        }
      });
    })
  })
});
