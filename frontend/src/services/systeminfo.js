import axios from 'axios';

class Systeminfo {

    register(username,email, password, role) {
        return axios.post(process.env.REACT_APP_API_URL + '/users/register', {
            username, email, password, role
        })
    }

    getSystems = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            const empty = [];
            
            res.data.forEach(function (item, index) {
                empty[index] = item.systemName;
              });
              console.log(empty)
            return empty;
        }
        catch(e) {
            console.log(e);
        }
    }
}

export default new Systeminfo();