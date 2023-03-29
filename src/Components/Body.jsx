import { Component } from "react";
import '../CSS/Body.css'
import Trigger from "../Trigger";

class Body extends Component {       
    render(){      
        let iteratorCreate = 0
        let iteratorDelete = 0

        //Função para esconder a div de resultado para um outro resultado tomar lugar
        //Tratando o erro caso o usuário não use o botão limpar
        const clearHTML = () => {
            try{
                let insertInto = document.getElementById(`newDivForRes${iteratorDelete}`)
                insertInto.style.display = 'none'
                iteratorDelete++
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
            newDivForRes.setAttribute("id",`newDivForRes${iteratorCreate}`);
            iteratorCreate++

            //Inserindo na div presente no html a div dos resultados
            insertInto.appendChild(newDivForRes)

            //Get your key here:
            //https://www.weatherapi.com/my/
            let key = process.env.REACT_APP_SECRET_KEY
            let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${valuee}&aqi=no`
            
            // Trigger(valuee);

            //Fazendo requisição na API 
            fetch(url)
            .then(res => res.json())
            .then(json => {

                //Separando as duas partes do JSON: Localização e Clima Atual 
                let location = json.location
                let locationAtt = ['name', 'region', 'country']

                let climate = json.current

                //Criando o titulo com info sobre o local
                var h1 = document.createElement('h1'); 

                //For para exibir cada Atributo e seu respectivo valor da Localização
                for(let x = 0; x < locationAtt.length; x++){
                    h1.innerHTML += `${location[locationAtt[x]]} `
                    newDivForRes.appendChild(h1); 
                }

                //Linha de separação
                newDivForRes.appendChild(document.createElement('hr')); 

                //Div flex para display de valores do clima:
                let div = document.createElement('div')
                newDivForRes.appendChild(div)

                    //Imagem do Clima Atual 
                    var img = document.createElement('img'); 
                    img.src = climate.condition.icon
                    div.appendChild(img)
                    
                    //Descrição do Clima Atual
                    var text = document.createElement('p'); 
                    text.innerHTML = `${climate.condition.text}`
                    div.appendChild(text); 
                    
                    //Temperatura e velocidade do vento:
                    var p1 = document.createElement('p'); 
                    p1.innerHTML = `${climate['temp_c']}°C Wind: ${climate['wind_kph']} Km/H`
                    div.appendChild(p1);

                //Linha de separação
                newDivForRes.appendChild(document.createElement('hr')); 

                //Displaying local time e horário da última atualização 
                var p2 = document.createElement('p'); 
                p2.style.fontSize = '14px'
                p2.innerHTML = `Local time: ${location['localtime']} - Climate data from: ${climate['last_updated']}`
                newDivForRes.appendChild(p2)
            })
        }

        const enterDown = (e) => {
            let keyCode = e.code || e.key
            if(keyCode === 'Enter'){
                shoot()
            }
        }

        return (
            <main onKeyUp={e => enterDown(e)}>
                <p>Weather Lookup</p>
                
                <div className="input-group">
                    <input id="inputCity" type="text" className="form-control" placeholder="Discover your city weather..." 
                        aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                    
                    <button onClick={() => shoot()} className="btn btn-outline-success" type="button">Discover</button>
                </div>

                <button type="button" className="btn btn-danger w-50 mb-4"
                    onClick={() => clearHTML()}>Clear</button>

                <div id="resultField" />
            </main>
        );
    }

}

export default Body
