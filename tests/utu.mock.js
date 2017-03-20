export default class uTu {
  withContext() {
    return this;
  }

  message(msg) {
    if (!msg.channel) {
      return Promise.reject({ success: false });
    }
    return Promise.resolve({ success: true });
  }

  event() {
    return Promise.resolve({ success: true });
  }

  user() {
    return Promise.resolve({ success: true });
  }

  intent() {
    return Promise.resolve({ content: { message: 'hello world' } });
  }
}
