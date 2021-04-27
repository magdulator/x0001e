import axios from 'axios';
const apiURL = 'http://130.240.114.29:5000/api';

class Auth {
    register(username,email, password, role) {
        return axios.post(apiURL + '/users/register', {
            username, email, password, role
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
            return false
        });
    }

    logout() {
        localStorage.removeItem("currentUser");
        console.log("log9ut")

    }

    getCurrentUser() {
        console.log("getcurrent")
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    isAuth() {
        if (this.getCurrentUser()) {
            return true;
        }
        return false;
    }

    isAdmin() {
        const user = this.getCurrentUser();
        if (user) {
            if (user.role === "admin") {
                return true;
            }
            return false;
        }
    }
}

export default new Auth();