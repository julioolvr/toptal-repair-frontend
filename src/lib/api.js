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
      }).then((response) => {
        localStorage.setItem('access_token_header', response.headers.get('Authorization'));
        return response.json();
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
      }).then(() => localStorage.removeItem('access_token_header')),
    );
  },
  addRepair(repair) {
    return Observable.from(
      fetch('/repairs', {
        method: 'POST',
        body: JSON.stringify({ repair }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: localStorage.getItem('access_token_header'),
        },
      }).then(response => response.json()),
    );
  },
  loadRepairs() {
    return Observable.from(
      fetch('/repairs', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: localStorage.getItem('access_token_header'),
        },
      }).then(response => response.json()),
    );
  },
};
