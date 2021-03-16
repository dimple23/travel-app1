export {Tripdata ,TripdataEventListener }
async function getlocation(destination){
  const maxrows=1
  const res = await fetch(`${"http://api.geonames.org/searchJSON?q="}${destination}&maxrows=${maxrows}&username=${process.env.geousername}`)
  console.log('destination:',destination)
  


  try{
    const data =await res.json()

    //console.log("data ===", data)
    const location =  {lat: data.geonames[0].lat, lng: data.geonames[0].lng}
        console.log('res: ', data)
        console.log('Location: ', location)
        return location
    }catch(error) {
        console.log('ERROR: ', error)
        //console.log(getlocation);

    }
}
  



const CurrentWeatherbitURL=`https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHERBIT_API_KEY}`
const ForcastWeatherbitURL=`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}`

async function getweather(latitude='',longitude='',date=''){
  let url=''
  if (forecast(date)) {
    url=`${ForcastWeatherbitURL}&latitude=${latitude}&longitude=${longitude}&date=${date}`;
  }
  else{
    url = `${CurrentWeatherbitURL}&latitude=${latitude}&longitude=${longitude}`;
  }

  console.log(url)


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
  //console.log(getweather);

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
  //console.log(getimageURL);

  function forecast(date) {
    const today = new Date() 
    const differencedays =  dates(today, date)
    console.log('Forecast: ', differencedays)
    

    return (differencedays > 7)
  }

  function dates(startdate,enddate){
    

    const Day = 24*60*60*1000
    return Math.round((enddate-startdate)/Day);
    
    
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
   

  async function Tripdata() {

    event.preventDefault();

    const Data =  {
        destination: document.getElementById('destination').value,
        startdate: new Date(document.getElementById('startdate').value),
        enddate: new Date(document.getElementById('enddate').value)
    }
  
    //console.log(" DATA ", Data)
  
    Data['duration'] = dates(Data.startdate, Data.enddate)
    Data['Location'] = await getlocation(Data.destination)
    Data['weather'] = await getweather(Data.destination, Data.date)
    Data['imgURL'] = await getimageURL(Data.destination)
  
     updateUI(trip)
  
  }
  
  const TripdataEventListener = document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', Tripdata,false)
  })
  
  
  


  var coll = document.getElementsByClassName("about-app");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
export{
  getlocation,
  getweather,
  getimageURL,
  updateUI,
}