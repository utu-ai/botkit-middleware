import middleware from '../src';

const tests = [
  {
    name: 'no secret',
    test: function(done) {
      expect(this.errors).toHaveLength(1);
      done();
    }
  },
  {
    name: 'no controller',
    secret: 'abc',
    test: function(done) {
      expect(this.errors).toHaveLength(1);
      done();
    }
  },
  {
    name: 'no controller',
    secret: 'abc',
    controller: {
      middleware: {
        send: {
          use: () => {},
        },
        receive: {
          use: () => {},
        },
      },
    },
    test: function(done) {
      expect(this.errors).toHaveLength(0);
      done();
    }
  }
]

describe('Receive Middleware', function() {
  beforeEach(function () {
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
        middleware(t.secret, t.controller);
        if (t.test) {
          t.test.bind(this)(done);
        } else {
          done();
        }
      });
    })
  })
});
