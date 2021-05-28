import axios from 'axios';

class Widefind {

    widefindStatus = async () => {
        var statusColor = 'red';
        var statText = 'Server Error';
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/widefind');
            if(res.status === 200) {
                statusColor = 'green';
                statText = 'Aktiv';
                return [statusColor, statText]; 
            }
        return [statusColor, statText]; 
        } catch (e) {
            return(e)
        }
        //om inte report så kanske gul
    }

    widefindCoordinates = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/widefind');
            if(res.status === 200) {
                return ['green', 'Aktiv', res.data]; 
            }
            return ['yellow', 'Inga koordinater'];
        } catch (e) {
            return ['red', 'Server error']
        }
    }
    
}


export default new Widefind();