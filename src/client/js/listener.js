async function Tripdata() {
  const Data =  {
      destination: document.getElementById('destination').value,
      startdate: new Date(document.getElementById('startdate').value),
      endDate: new Date(document.getElementById('enddate').value)
  }
  Data['duration'] = daysInDates(Data.startdate, Data.endDate)
  Data['Location'] = await getlocation(Data.destination)
  Data['weather'] = await getweather(Data.destination, Data.date)
  Data['imgURL'] = await getimageURL(Data.destination)

  updateUI(trip)

}


const TripdataEventListener = document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit').addEventListener('click', Tripdata,false)
})

export { Tripdata, TripdataEventListener }