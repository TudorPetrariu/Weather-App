const cityForm = document.querySelector('form')
const caard = document.querySelector('.caard')
const details = document.querySelector('.details')
let time = document.querySelector('.time')
const icon = document.querySelector('.icon img')
const body = document.querySelector('body')


// const getTodos = async () => {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
//     const data = await response.json();
//     return data.slice(0, 10);
// }
// getTodos()
//     .then(data => console.log('resolved', data))
//     .catch(err => console.log(err))


//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.log(err)

//     })


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

    // let timeSrc = null
    if (weather.IsDayTime) {
        // timeSrc = 'img/day.svg'
        body.classList.add('day')

    } else {
        // timeSrc = 'img/night.svg'
        body.classList.add('night')

    }
    // time.setAttribute('src', timeSrc);



    ///remove d-none class if existst
    caard.classList.contains('d-none') ?
        caard.classList.remove('d-none') :
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
    localStorage.setItem('city', city)

    // update the Ui with the new city
})

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}