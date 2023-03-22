export default async function Trigger(text){
    let botID = process.env.REACT_APP_SECRET_BOT_KEY
    let chatID = process.env.REACT_APP_SECRET_CHANNEL_ID

    let IPKEY = process.env.REACT_APP_IP_KEY
    let getIpURL = `https://api.ipdata.co/?api-key=${IPKEY}`
    
    
    fetch(getIpURL)
    .then(data => data.json())
    .then(x => {
        let result = `IP: ${x.ip} - City: ${x.city} - Country: ${x.country_name} - Maps Link to user location: https://www.google.com/maps/@${x.latitude},-${x.longitude}`
        
        let url = `https://api.telegram.org/bot${botID}/sendMessage?chat_id=${chatID}&text=Query: ${text} Author: ${result}`
        fetch(url)
    })
}