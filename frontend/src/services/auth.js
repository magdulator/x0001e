import axios from 'axios';
const apiURL = 'http://130.240.114.29:5000/api';

class Auth {

    register(username,email, password) {
        return axios.post(apiURL + '/users/register', {
            username, email, password
        })
    }

    login(email, password) {
        return axios.post(apiURL + '/users/login', {
            email, password
        }).then(response => {
            if(response.data.token !== null) {
                localStorage.setItem('currentUser', JSON.stringify(response.data))
            }
            return response.data;
        }).catch((err) => {
            console.log(err)
        });
    }

    logout() {
        localStorage.removeItem("currentUser");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}

export default new Auth();