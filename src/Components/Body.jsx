import { Component } from "react";
import '../CSS/Body.css'

class Body extends Component {       
    render(){
        const shoot = () => {
            //Pegando a cidade inserida no Input e a div onde os resultados serão exibidos:
            let valuee = document.getElementById("inputCity").value
            let insertInto = document.getElementById("resultField")

            let url = `http://api.weatherapi.com/v1/current.json?key=6e3e60fe8fd845979c4191036230403&q=${valuee}&aqi=no`
            
            //Fazendo requisição na API 
            fetch(url)
            .then(res => res.json())
            .then(json => {

                //Separando as duas partes do JSON: Localização e Clima Atual 
                let loc = json.location
                let cur = json.current

                //Declarando o Array que receberá o valor de cada Atributo do Clima Atual
                let currentArr = []
                //Array dos atributos do Clima atual
                let jsonCurrentFields = ['last_updated_epoch', 'last_updated', 'temp_c', 'temp_f', 'is_day', 'condition', 'wind_mph', 'wind_kph', 'wind_degree', 'wind_dir', 'pressure_mb', 'pressure_in', 'precip_mm', 'precip_in', 'humidity', 'cloud', 'feelslike_c', 'feelslike_f', 'vis_km', 'vis_miles', 'uv', 'gust_mph', 'gust_kph']
                let climaAtual = ['Última Atualização (EPOCH)', 'Última Atualização', 'Temperatura (°C)', 'Temperatura (°F)', 'É dia???', 'Condição (Obj)', 'Velocidade do vento (Mph)', 'Velocidade do vento (Kmh)', 'Proa do vento', 'Direção do vento', 'Pressão (mbar)', 'Pressão (In)', 'Preciptação (mm)', 'Humidade do ar', 'Nuvens', 'Sensação térmica (°C)', 'Sensação térmica (°F)', 'Visibilidade (Km)', 'Visbilidade (Milhas)', 'UV', 'Rajada (Kmh)', 'Rajada (Mph)']
                //For utilizado para manusear o Objeto que trás um texto e uma imagem da descrição do Clima Atual 
                for(let asd = 0; asd < 6; asd++) {
                    if(asd === 5){          
                        var text = document.createElement('p'); 
                        text.innerHTML = `Clima: ${cur.condition.text}`
                        insertInto.appendChild(text); 
                        
                        var img = document.createElement('img'); 
                        img.src = cur.condition.icon
                        insertInto.appendChild(img)
                    }
                }

                //Declarando o Array que receberá o Valor de cada Atributo da localização 
                let locationArr = []
                //Array de cada atributo da Lozalização
                let jsonLocationFields = ['name', 'region', 'country', 'lat', 'lon', 'tz_id', 'localtime_epoch', 'localtime']
                let localizacao = ['Nome', 'Região', 'País', 'Latitude', 'Longitude', 'Fuso Horário', 'Horário Local (EPOCH)', 'Horário Local']
                //For para exibir cada Atributo e seu respectivo valor da Localização
                for(var qwe = 0; qwe < jsonLocationFields.length; qwe++){
                    locationArr.push(loc[jsonLocationFields[qwe]])

                    var z = document.createElement('p'); 
                    z.innerHTML = `${localizacao[qwe]}: ${locationArr[qwe]}`
                    insertInto.appendChild(z); 
                }

                //Exibindo uma linha para separar atributos sobre a Localização e Clima atual
                insertInto.appendChild(document.createElement('hr')); 

                //For para exibir todos atributos e valores do Clima atual
                for(let i = 0; i < jsonCurrentFields.length; i++){
                    //Inserir no array o Valor de cada Atributo do JSON clima atual
                    //Exemplo: País: Brasil
                    //Inserir no Array: Brasil
                    currentArr.push(cur[jsonCurrentFields[i]])

                    //Criando um HTML para exibir cada atributo e seu valor
                    var y = document.createElement('p'); 
                    y.innerHTML = `${climaAtual[i]}: ${currentArr[i]}`
                    insertInto.appendChild(y); 
                }
            })
            
        }
        return (
            <div className="bodyWrapper">
                <div className="body">
                    <div className="input-group mb-3">
                        <input id="inputCity" type="text" className="form-control" placeholder="Discover your city weather..." 
                            aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                        
                        <div className="input-group-append">
                            <button onClick={() => shoot()} className="btn btn-outline-secondary" type="button">Discover</button>
                        </div>
                    </div>
                    <div id="resultField">
                    </div>
                </div>
            </div>
        );
    }

}

export default Body