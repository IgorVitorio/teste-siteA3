/* variável que guarda valor da API key*/
let appId = 'f0e8e97d2285cd4812de870ddb91e6c2';

/*Função de chamada e tratamento de resposta da API */
function searchWeather(searchTerm){
    /*https://api.openweathermap.org/data/2.5/weather?q={NOME DA CIDADE}&lang=(CÓDIGO DO PAÍS PARA ESCOLHER LINGUAGEM)&appid={API key}&units=(UNIDADE DE TEMPERATURA; default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.)*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${searchTerm}&lang=pt_br&appid=${appId}&units=metric`).then(result => {
        return result.json();
    }).then(result =>{
        init(result);
    })
}


/*Função que especifíca o que acontece a partir da respota da API sobre o tempo atual da cidade pesquisada, mudando a foto do background para cada caso*/
function init(resultFromServer){
    switch (resultFromServer.weather[0].main){

        case 'Clear':
            document.body.style.backgroundImage = 'url("imagens/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("imagens/cloudy.jpg")';
            break;

        case 'Rain':
            document.body.style.backgroundImage = 'url("imagens/rain.jpg")';
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("imagens/rain.jpg")';
            break;
        case 'Mist':
            document.body.style.backgroundImage = 'url("imagens/rain.jpg")';
            break;
            
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("imagens/storm.jpg")';
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = 'url("imagens/snow.jpg")';
            break;
            
        default:
            document.body.style.backgroundImage = 'url("imagens/default.jpg")';
            break;
    }
    
    /*Associar variáveis de informação do tempo da cidade com o id da div no HTML*/
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg')

    /*Exibir ícone condizente com o tempo da cidade */
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

    /* Associar a variável com o tempo atual da cidade*/
    let resultDescription = resultFromServer.weather[0].description;

    /*Exibir o resultado sobre o tempo com a primeira letra maiúscula*/
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    /*Exibir a temperatura da cidade pesquisada em graus Celsius*/
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

    /*Exibir a velocidade do vento da cidade pesquisada em km/h*/
    windSpeedElement.innerHTML = 'Velocidade do vento: ' + Math.floor(resultFromServer.wind.speed * 3.60) + 'km/h';

    /*Exibir o nome da cidade*/
    cityHeader.innerHTML = resultFromServer.name;

    /*Exibir o umidade do ar*/
    humidityElement.innerHTML = 'Umidade do ar: ' + resultFromServer.main.humidity + '%';

    /*Chamada de função que centraliza a posição do container das informações*/
    setPositionForWeatherInfo();
}

/* Tratar a exibição do container que mostra as informações do tempo */
function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.style.visibility = 'visible';
}

/* Quando clicar no botão "pesquisar", pegar o valor do input e colocar na função searchWeather como o parâmetro {searchTerm} a fim de pesquisar a cidade*/
document.getElementById('searchBtn').addEventListener('click', () =>{
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm === "salvador" || searchTerm === "Salvador" )
        searchWeather(searchTerm + ',br')
    else if(searchTerm)
        searchWeather(searchTerm);
    else if(('searchInput').value == null)
        window.alert('Digite o nome da cidade');

})

/* Aceitar a tecla ENTER para envio do input */
document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        var btn = document.querySelector("#searchBtn");
      
      btn.click();
    
    }
  });

  /*var searchInput = 'searchInput';

  $(document).ready(function () {
      var autocomplete;
      autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
          types: ['geocode'],
      });
    });*/