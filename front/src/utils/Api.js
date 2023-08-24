class Api {
    constructor(baseUrl, tgUrl) {
      this._baseUrl = baseUrl;
      this._tgUrl = tgUrl;
    }
    _checkResponse(res) {
      if (res.ok) {
        const data = res.json();
        return data;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(email, password) {
        return fetch( `${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), 
        }).then(this._checkResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), 
        }).then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          },
        }).then(this._checkResponse);
      }

    editUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
          }),
        }).then(this._checkResponse);
      }
    
      getMK() {
        return fetch(`${this._baseUrl}/schedule`, {
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(this._checkResponse);
      }

      saveLid(lid) {
        return fetch( `${this._baseUrl}/lid`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              name: lid.name, 
              service: lid.service,
              tel: lid.tel,
              MK: lid.MK, 
              amount: lid.amount, 
              comment: lid.comment,
              dateFromCustomer: lid.dateFromCustomer 
             }), 
        }).then(this._checkResponse);
    }


      saveMK(mk) {
        return fetch( `${this._baseUrl}/schedule`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              title: mk.title, 
              shortTitle: mk.shortTitle,
              description: mk.description,
              price: mk.price, 
              duration: mk.duration, 
              image: mk.image, 
              date: mk.date, 
             }), 
        }).then(this._checkResponse);
    }

    saveCertificate(form) {
      return fetch( `${this._baseUrl}/certificate`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: form.name, 
            tel: form.tel,
            email: form.email,
            price: form.price, 
            owner: form.owner, 
            type: form.type, 
           }), 
      }).then(this._checkResponse);
  }

  getLid() {
    return fetch(`${this._baseUrl}/lid`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
         Accept: "application/json",
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  getCertificate() {
    return fetch(`${this._baseUrl}/certificate`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
         Accept: "application/json",
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  editStatusLid(id, status) {
    return fetch(`${this._baseUrl}/lid/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
         Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status,
      }),
    }).then(this._checkResponse);
  }

  editStatusCertificate(id, status) {
    return fetch(`${this._baseUrl}/certificate/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
         Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status,
      }),
    }).then(this._checkResponse);
  }

  editMK(id, form) {
    return fetch(`${this._baseUrl}/mk/${id}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
         Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: form.title,
        shortTitle: form.shortTitle,
        description: form.description,
        date: form.date,
        duration: form.duration,
        price: form.price,
        image: form.image,
      }),
    }).then(this._checkResponse);
  }



    deleteMK(id) {
      return fetch(`${this._baseUrl}/schedule/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        },
      }).then(this._checkResponse);
    }

    getMonth() {
      return fetch(`${this._baseUrl}/month`, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(this._checkResponse);
    }

    editMonth(id, name) {
      return fetch(`${this._baseUrl}/month/${id}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
           Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
        }),
      }).then(this._checkResponse);
    }

    sendTgMessagge( message) {
      return fetch( `${this._tgUrl}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            chat_id: -1001827464517,
            text: message,
           }), 
      }).then(this._checkResponse);
  }
}



export const api = new Api(
  "https://api.happy-keramika.ru",
  //"http://localhost:3001",
  "https://api.telegram.org/bot6382149210:AAEhdE8DNmWbebVzMn-idF9WrhaK-JcheBU/sendMessage"
  );
  