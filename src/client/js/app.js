
async function getlocation(destination){
  const maxrows=1
  const res = await fetch(`${"http://api.geonames.org/searchJSON?q="}${destination}&maxrows=${maxrows}&username=${process.env.geousername}`)
  console.log('destination:',destination)


  try{
    const data =await res.json()
    const location =  {lat: data.geonames[0].lat, lng: data.geonames[0].lng}
        console.log('Response: ', data)
        console.log('Location: ', location)
        return location
    }catch(error) {
        console.log('ERROR: ', error)
    }
}
  
const CurrentWeatherbitURL=`https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_API_KEY}`
const ForcastWeatherbitURL=`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}`

async function getweather(latitude='',longitude='',type='',date=''){
  let url=''

  if( type=='forecast'){
    url=`${ForcastWeatherbitURL}&latitude=${latitude}&longitude=${longitude}&date=${date}`;
  }
  else{
    url = `${CurrentWeatherbitURL}&latitude=${latitude}&longitude=${longitude}`;
  }

  const req=await fetch(url)


    try {
      const data = await res.json()
      const weather = {
          temp: data.data[0].temp,
          description: data.data[0].weather.description
      }
      console.log('Weather: ', weather)
      return weather
  }catch(error) {
      console.log('ERROR: ', error)
  }
  }

  async function getimageURL(destination){

  const res = await fetch(`${"https://pixabay.com/api/"}$?key=${process.env.PIXABAY_API_KEY}&q=${destination}&image_type=photo`)

  try {
    const data = await res.json()
    const imageURL = data.hits[0].preview
    console.log('Picture: ', imageURL)
    return imageURL
}catch(error) {
    console.log('ERROR: ', error)
}

  }

  const currentdate = new Date()

  const diff= dates(currentdate,Date)
  console.log(diff);


  function dates(startdate,enddate){
    const Day=(Math.floor(enddate-startdate)/1000/60/60/24);
    console.log(Day);
  }

  function updateUI(trip) {
    
    const results = {
                        destination: document.getElementById('results-destinatoin'),
                        weather: document.getElementById('results-weather'),
                        pic: document.getElementById('results-picture'),
                        date: document.getElementById('results-date'),
                        duration: document.getElementById('results-duration')}
    results.innerHTML = "";
    results.style.display = "block";
  
    let resultsHTML;
    resultsHTML = `
                    <img src="${trip.imageURL}">
                    <div class="card">
                     
                    <h1>${trip.destination}</h1>
                    <h2>${trip.date}</h2>
                    <p> Your destination trip in ${trip.destination} will be ${trip.duration}days long </p>
                    <p> Your destination Whether will be ${trip.temp} °C and  ${trip.description}</p>
              
                    </div>`;
  
   

    console.log(resultsHTML);
    results.insertAdjacentHTML("beforeend", resultsHTML);
  }
export{
  getlocation,
  getweather,
  getimageURL,
  updateUI,

}