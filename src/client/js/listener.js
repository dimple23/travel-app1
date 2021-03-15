async function Tripdata() {

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

export { Tripdata, TripdataEventListener }