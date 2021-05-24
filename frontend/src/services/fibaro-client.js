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
                        break; 
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
        for (var n = 0; n<this.state.availableSystems.length; n++) {
            if(this.state.availableSystems[n].systemName === 'fibaro') {
                let availableSystems = [...this.state.availableSystems];
                let item = {...availableSystems[n]};
                item.status = statusColor;
                item.statusText = statText;
                availableSystems[n] = item;
                this.setState({availableSystems});
                break;
            }
        }     
    }
}
export default new Fibaro();