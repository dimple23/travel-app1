export {
  Tripdata,
  TripdataEventListener
}

//Geoname API
async function getlocation(destination) {
  const maxrows = 1
  const res = await fetch(`${"http://api.geonames.org/search?name="}${destination}&type=json&username=${process.env.USERNAME}`)
  console.log('destination:', destination)//to check and print the value of destination



  try {
      const data = await res.json()

      //console.log("data ===", data)
      const location = {
          lat: data.geonames[0].lat,
          lng: data.geonames[0].lng
      }
      console.log('res: ', data)
      console.log('Location: ', location)
      return location
  } catch (error) {
      console.log('ERROR: ', error)
      //console.log(getlocation);

  }
}


//to get Weather Weatherbit API

const CurrentWeatherbitURL = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_KEY}`
const ForcastWeatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}`

async function getweather(latitude = '', longitude = '', date = '') {
  let url = ''
  if (forecast(date)) {
      url = `${ForcastWeatherbitURL}&lat=${latitude}&lon=${longitude}&date=${date}`;
  } else {
      url = `${CurrentWeatherbitURL}&lat=${latitude}&lon=${longitude}`;
  }

  const res = await fetch(url)

  try {
      const data = await res.json()
      const weather = {
          temp: data.data[0].temp,
          description: data.data[0].weather.description
      }
      console.log('Weather: ', weather)
      return weather
  } catch (error) {
      console.log('ERROR: ', error)

  }

}
// to get destination image used Pixabay API
async function getimageURL(destination) {

  const res = await fetch(
    `http://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(destination)}&image_type=photo&safesearch=true&per_page=3`
  );

  try {
      console.log(res);
      const data = await res.json()
      console.log(data);
      const imageURL = Array.isArray(data.hits) && data.hits[0].previewURL
      console.log('Picture: ', imageURL)
      return imageURL
  } catch (error) {
      console.log('ERROR: ', error)
  }

}
//console.log(getimageURL);

function forecast(date) {
  const today = new Date()
  const differencedays = dates(today, date)
  console.log('Forecast: ', differencedays)


  return (differencedays > 7)
}

function dates(startdate, enddate) {


  const Day = 24 * 60 * 60 * 1000
  return Math.round((enddate - startdate) / Day);


}

//for updating UI
function updateUI(trip) {


  const results = {
        date: document.getElementById('results-date'),
        duration: document.getElementById('results-duration'),
        destination: document.getElementById('results-destination'),
        weather: document.getElementById('results-weather'),
        pic: document.getElementById('results-picture')
        
  }

  let resultEle = document.getElementById("results");
  let section2 = document.getElementById("section2");
  section2.style.display = "block";
  let duration =  dates(trip.startdate,trip.enddate);

 let resultsHTML;
 resultsHTML = `
                 <img src="${trip.imageURL}">
                 <div class="card">
                  
                 <p> <u>Your Trip StartDate: </u>${trip.startdate}</p><p> <u>Your Trip EndDate:</u> ${trip.startdate}</p>
                 <p> Your destination trip in ${trip.destination} will be ${duration}days long </p>
                 <p> Your destination Whether will be ${trip.weather.temp} °C and  ${trip.weather.description}</p>

                 <p><u>latitude:</u>${trip.location.lat}</p> <p><u>longitude :</u>${trip.location.lng}</p>
                 </div>`;



 console.log(resultsHTML);
 resultEle.innerHTML = resultsHTML; 

}

async function Tripdata() {

  event.preventDefault();

  const Data = {
      destination: document.getElementById('destination').value,
      startdate: new Date(document.getElementById('date').value),
      enddate: new Date(document.getElementById('enddate').value)
  }

  //console.log(" DATA ", Data)

  Data['duration'] = dates(Data.date, Data.enddate)
  Data['location'] = await getlocation(Data.destination)
  Data['weather'] = await getweather(Data.location.lat, Data.location.lng, Data.date)
  Data['imageURL'] = await getimageURL(Data.destination)

  updateUI(Data)

}

const TripdataEventListener = document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit').addEventListener('click', Tripdata, false)
})


// for FAQ part 

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
export {
  getlocation,
  getweather,
  getimageURL,
  updateUI,
}
