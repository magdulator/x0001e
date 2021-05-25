import axios from 'axios';

class Images {

    getImages = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL + '/images/all');
            if(!res.data) {
                return;
            } else {
                return (res.data.images)
            } 
        } catch (err) {
            if (err.response && err.response.data) {
                return;
            }
        }
    }

    uploadImage = async (file, systemName, type) => {
        try {
            const fileName = type + file.name;
            const date = new FormData() 
            date.append('image', file, fileName)
            date.append('pictype', type)
            date.append('nameSystem', systemName);
            const res = await axios.post(process.env.REACT_APP_API_URL + '/images/upload/', date, {headers: {'Content-type' : 'form-data'}});
            return [res.data.message, ""];
        } catch (err) {
            if (err.response && err.response.data) {
                return ["", err.response.data.message];
            }
        }
    }

    deleteImage = async (path) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + `/images/delete/${path}`);
            return [res.data.message, ""];
        } catch (err) {
            if (err.response && err.response.data) {
                return ["", err.response.data.message];
            }
        }
    }

    updateImage = async (active, path) => {
        try {
            const res = await axios.patch(process.env.REACT_APP_API_URL + `/images/update/${path}`, {active});
            return [res.data.message, ""]
        } catch (err) {
            if (err.response && err.response.data) {
                return ["", err.response.data.message];
            }
        }
    }
} 

export default new Images();