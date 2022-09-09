class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _makeRequest(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((obj) => {
      return obj;
    });
  }

  getUser() {
    const promise = fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    });
    return this._makeRequest(promise);
  }

  editUser(data) {
    const promise = fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
    return this._makeRequest(promise);
  }

  editUserAvatar(data) {
    const promise = fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
    return this._makeRequest(promise);
  }

  getCards() {
    const promise = fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    });
    return this._makeRequest(promise);
  }

  changeLikeCardStatus(cardID, isLiked) {
    const promise = fetch(`${this._url}cards/${cardID}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',      
      headers: this._headers
    });
    return this._makeRequest(promise);
  }

  addCard(data) {
    const promise = fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    return this._makeRequest(promise);
  }

  deleteCard(cardID) {
    const promise = fetch(`${this._url}cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this._makeRequest(promise);
  }

  setHeaders(token) {
    this._headers['Authorization'] = `Bearer ${token}`
  }
}
// http://api.nomesto.nomoredomains.xyz/
// http://localhost:3000/
const api = new Api('http://api.nomesto.nomoredomains.xyz/', {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export default api;