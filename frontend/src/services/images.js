import axios from 'axios';

class Images {

    uploadImage = async (file, systemName, type) => {
        try {
            const fileName = type + file.name;
            const date = new FormData() 
            date.append('image', file, fileName)
            date.append('pictype', type)
            date.append('nameSystem', systemName);
            const res = await axios.post(process.env.REACT_APP_API_URL + '/images/upload/', date, {headers: {'Content-type' : 'form-data'}});
            return [res.data.message, ""]
        } catch (err) {
            if (err.response && err.response.data) {
                return err;
            }
        }
    }
} 

export default new Images();