import config from '../config';

const ApiHelpers = {
  async getDogs() {
    let res = await fetch(`${config.API_ENDPOINT}/pets/dogs`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return res.json();
    }
  },
  async getCats() {
    let res = await fetch(`${config.API_ENDPOINT}/pets/cats`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return res.json();
    }
  },
  async getPeople() {
    let res = await fetch(`${config.API_ENDPOINT}/people`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return res.json();
    }
  },
  async deleteCat() {
    let res = await fetch(`${config.API_ENDPOINT}/pets/cats`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return;
    }
  },
  async deleteDog() {
    let res = await fetch(`${config.API_ENDPOINT}/pets/dogs`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return;
    }
  },
  async addPerson(person) {
    let res = await fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        person: person,
      }),
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return res.json();
    }
  },
  async deletePerson() {
    let res = await fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!res.ok) {
      return res.json().then((e) => Promise.reject(e));
    } else {
      return;
    }
  },
};

export default ApiHelpers;
