import axios from 'axios';

class Auth {
    register(username,email, password, role) {
        return axios.post(process.env.REACT_APP_API_URL + '/users/register', {
            username, email, password, role
        })
    }

    login(email, password) {
        
        return axios.post(process.env.REACT_APP_API_URL + '/users/login', {
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

    }

    getCurrentUser() {
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