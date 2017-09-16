import { ajax } from 'rxjs/observable/dom/ajax';

export default {
  login(email, password) {
    return ajax.post(
      '/users/sign_in',
      { user: { email, password } },
      { 'Content-Type': 'application/json' },
    );
  },
};
