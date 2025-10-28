import Cookies from 'js-cookie';

export const auth = {
  isLoggedIn() {
    return !!Cookies.get('token');
  },

  getCurrentUser() {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  login(token, user) {
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
  },

  logout() {
    Cookies.remove('token');
    Cookies.remove('user');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  requireAuth() {
    if (typeof window !== 'undefined' && !this.isLoggedIn()) {
      window.location.href = '/login';
      return false;
    }
    return true;
  },

  redirectIfLoggedIn() {
    if (typeof window !== 'undefined' && this.isLoggedIn()) {
      window.location.href = '/';
      return true;
    }
    return false;
  },
};