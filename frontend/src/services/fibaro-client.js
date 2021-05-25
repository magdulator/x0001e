import axios from 'axios';

class Fibaro {

    fibaroStatus = async () => {
        var statusColor = 'red';
        var statText = 'Server Error';
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+'/fibaro/getAll');
            if(res.status === 200) {
                statusColor = 'green';
                statText = 'Aktiv'

                for (var i = 0; i < res.data.length; i++) {
                    if(res.data[i].properties.dead) {
                        statusColor = 'yellow';
                        statText = 'Problem: en / flera sensorer'
                        return [statusColor, statText]; 
                    }
                }
                return [statusColor, statText]; 
            }
        return [statusColor, statText]; 
        } catch (e) {
            return(e)
        }
            
    }
}
export default new Fibaro();