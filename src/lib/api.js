import { Observable } from 'rxjs';

export default {
  login(email, password) {
    return Observable.from(
      fetch('/users/sign_in', {
        method: 'POST',
        body: JSON.stringify({ user: { email, password } }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    );
  },
  logout() {
    return Observable.from(
      fetch('/users/sign_out.json', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    );
  },
};
