import { uTu } from 'utu';
import receive from './receive';
import send from './send';

export default (secret, controller) => {
  if (!secret) {
    console.error('uTu ERROR: Missing Secret');
    return;
  }

  if (!controller) {
    console.error('uTu ERROR: Missing Controller');
    return;
  }
  const utu = new uTu(secret);
  controller.middleware.receive.use(receive(utu));
  controller.middleware.send.use(send(utu));
};
