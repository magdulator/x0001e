import axios from 'axios';

class Systems {

    getSystemsStatus = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            const empty = [];
            res.data.forEach(function (item, index) {
                const title = item.title;
                const systemName = item.systemName
                var hej = {systemName, title, status:"red", statusText: "Inte implementerad"}
                empty[index] = hej;
              });
            return empty
        }
        catch(e) {
            if (e.response && e.response.data) {
                return e;
            }
        }
    }

    getSystems = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/systems');
            return res.data;
        }
        catch(e) {
            if (e.response && e.response.data) {
                return e;
            }
        }
    }

    getSystemInfo = async (system) => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + `/systems/${system}`)
            return res;
        
        } catch (e) {
            if (e.response && e.response.data) {
                return e;
            }
        }
    }

    deleteSystem = async (system) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + `/systems/delete/${system}`);
            return [res.data.message, ""]
        
        } catch (e) {
            if (e.response && e.response.data) {
                return["", e.response.data.message];
            }
        }
    }

    sendInfo = async(system, title, description, exampleData) => {
        try {
            const res = await axios.patch(process.env.REACT_APP_API_URL + `/systems/update/${system}`, {
                system,title, description, exampleData
            })
            return [res.data.message, ""]
        
        } catch (e) {
            if (e.response && e.response.data) {
                return["", e.response.data.message];
            }
        }
    }

    createSystem = async(systemName, title, description, img, exampleData) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + '/systems/create', {
                systemName, title, description, img, exampleData
            })
            return [res.data.message, ""]
        } catch (e) {
            if (e.response && e.response.data) {
                return["", e.response.data.message];
            }
        }
    }
}
export default new Systems();