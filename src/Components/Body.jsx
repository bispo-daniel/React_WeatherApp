import { Component } from "react";
import '../CSS/Body.css'

class Body extends Component {       
    render(){      
        let iterator = 0

        //Função para esconder a div de resultado para um outro resultado tomar lugar
        //Tratando o erro caso o usuário não use o botão limpar
        const clearHTML = () => {
            try{
                let insertInto = document.getElementById(`newDivForRes${iterator}`)
                insertInto.style.display = 'none'
                iterator++
            }catch(error){
                window.location.reload()
            }
        }

        const shoot = () => {
            //Pegando a cidade inserida no Input e a div onde a div dos resultados será exibida:
            let valuee = document.getElementById("inputCity").value
            let insertInto = document.getElementById("resultField")
            
            //Criando a div dos resultados e lhe dando um id único
            let newDivForRes = document.createElement('div')
            newDivForRes.setAttribute("id",`newDivForRes${iterator}`);

            //Inserindo na div presente no html a div dos resultados
            insertInto.appendChild(newDivForRes)

            let url = `http://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=${valuee}&aqi=no`
            
            //Fazendo requisição na API 
            fetch(url)
            .then(res => res.json())
            .then(json => {

                //Separando as duas partes do JSON: Localização e Clima Atual 
                let loc = json.location
                let cur = json.current

                //Array dos atributos do Clima atual
                let climaAtual = ['Última Atualização (EPOCH)', 'Última Atualização', 'Temperatura (°C)', 'Temperatura (°F)', 'É dia???', 'Condição', 'Velocidade do vento (Mph)', 'Velocidade do vento (Kmh)', 'Proa do vento', 'Direção do vento', 'Pressão (mbar)', 'Pressão (Pol.)', 'Preciptação (mm)', 'Preciptação (Pol.)', 'Humidade do ar', 'Nuvens', 'Sensação térmica (°C)', 'Sensação térmica (°F)', 'Visibilidade (Km)', 'Visbilidade (Milhas)', 'UV', 'Rajada (Kmh)', 'Rajada (Mph)']
                
                //For utilizado para manusear o Objeto que trás um texto e uma imagem da descrição do Clima Atual 
                for(let asd = 0; asd < 6; asd++) {
                    if(asd === 5){          
                        var text = document.createElement('p'); 
                        text.innerHTML = `Clima: ${cur.condition.text}`
                        newDivForRes.appendChild(text); 
                        
                        var img = document.createElement('img'); 
                        img.src = cur.condition.icon
                        newDivForRes.appendChild(img)
                    }
                }

                //Array de cada atributo da Lozalização traduzido
                let localizacao = ['Nome', 'Região', 'País', 'Latitude', 'Longitude', 'Fuso Horário', 'Horário Local (EPOCH)', 'Horário Local']
                
                //For para exibir cada Atributo e seu respectivo valor da Localização
                let it = 0
                for(let inin in loc){
                    var z = document.createElement('p'); 
                    z.innerHTML = `${localizacao[it]}: ${loc[inin]}`
                    newDivForRes.appendChild(z); 
                    it++
                }

                //Exibindo uma linha para separar atributos sobre a Localização e Clima atual
                newDivForRes.appendChild(document.createElement('hr')); 

                let ii = 0
                //For para exibir todos atributos e valores do Clima atual
                for(let valval in cur){
                    var y = document.createElement('p'); 
                    y.innerHTML = `${climaAtual[ii]}: ${cur[valval]}`
                    newDivForRes.appendChild(y);
                    ii++ 
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

                    <button type="button" className="btn btn-danger w-75"
                        onClick={() => clearHTML()}>Clear</button>

                    <div id="resultField">
                    </div>

                </div>
            </div>
        );
    }

}

export default Body
