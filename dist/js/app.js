const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
let time = document.querySelector('.time')
const icon = document.querySelector('.icon img')
const body = document.querySelector('body')
console.log(icon);

const updateUI = (data) => {
    // const cityDets = data.cityDetails;
    // const weather = data.weather;

    const { cityDetails, weather } = data;
    ///update template details

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName }</h5>
      <div class="my-3">${weather.WeatherText }</div>
       <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value }</span>
        <span>&deg;C</span>
       </div>
    `;
    //update day and night
    const iconSrc = `img/icons/${ weather.WeatherIcon }.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null
    if (weather.IsDayTime) {
        body.classList.add('day')
        timeSrc = 'img/day.svg'
    } else {
        timeSrc = 'img/night.svg'
        body.classList.add('night')

    }
    time.setAttribute('src', timeSrc);



    ///remove d-none class if existst
    card.classList.contains('d-none') ?
        card.classList.remove('d-none') :
        null

}



const updateCity = async (city) => {
    const cityDetails = await getCities(city)
    const weather = await getWeather(cityDetails.Key)

    return { cityDetails, weather };

}


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))

    // update the Ui with the new city
})