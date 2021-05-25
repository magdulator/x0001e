fibaroStatus = async () => {
    try {
        const res = await axios.get(process.env.REACT_APP_API_URL+'/fibaro/getAll');
        if(res.status === 200) {
            //gå vidare och kolla 
            res.data.forEach((item, index) => {
                if(item.properties.dead){
                    console.log(item.properties.deadReason + " " + index)
                }
            })
        } return [status, statusText]

    } catch (e) {
        return e
    }
}