window.addEventListener("load",function(){
    (function init(){

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        console.log(currentDate);

            const DOM={
            searchBtn:document.getElementById("search_btn"),
            search:document.getElementById("search"),
            modalEl:document.getElementById("search_modal"),
            closeBtn:document.querySelector(".close-btn"),
            gpsBtn:document.getElementById("gps"),
            location:document.getElementById("location"),
            city:document.getElementById("city"),
            cityLocation:document.getElementById("city-location"),
            region:document.getElementById("region"),
            currentDayIcon:document.getElementById("current-day"),
            currentDayTemp:document.getElementById("current-temp"),
            currentDayType:document.getElementById("current-type"),
            date:document.querySelector(".date"),
            card:document.getElementsByClassName("card")

        }
        setEventListeners();

        //Sets all event listeners
        function setEventListeners(){
            //opens search modal
           DOM.searchBtn.addEventListener('click',openSearchModal); 

            //closes search modal
            DOM.closeBtn.addEventListener('click',closeSearchModal);

            //activate gps
            DOM.gpsBtn.addEventListener('click',getGeoLocation);

            DOM.search.addEventListener("click", function(){ onSearch(DOM.location); });
        }

        //Helpers
        function openSearchModal()
        {

            DOM.modalEl.style.display="block";
            DOM.modalEl.classList.remove("animate__fadeOutLeft");
            DOM.modalEl.classList.add('animate__fadeInLeft')

        }

        function closeSearchModal()
        {
            DOM.modalEl.classList.remove("animate__fadeInLeft");
            DOM.modalEl.classList.add('animate__fadeOutLeft');
        }
        
        function getGeoLocation()
        {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(fetchGeoLocation);

            }
            else
            alert("Your browser doesn't")

        }
        function fetchGeoLocation(position){
            openSearchModal();
        }

        //requesting data from API
        function onSearch(location){
            let gps=`http://api.weatherapi.com/v1/forecast.json?key=b06b04d417454dc19d174104241803&q=${location.value}&days=5&aqi=no&alerts=no`
            fetch(gps)
            .then(Response=>Response.json())
            .then(data=>printSearchResults(data));
            
        }
        //displaying results from API
        function printSearchResults(results)
        {
            console.log(results);
              
            let weatherType=results.current.condition.text;
            let currentTemp=results.current.temp_c;
            
            //displaying results on the search panel
            DOM.city.textContent=" "+results.location.name;
            DOM.region.textContent=" "+results.location.region;
            DOM.cityLocation.textContent=results.location.name;
            
            //displaying current day
            DOM.currentDayIcon.setAttribute("src",results.current.condition.icon);
            DOM.currentDayType.textContent=weatherType;
            DOM.currentDayType.style.fontSize="3rem";
            DOM.currentDayTemp.textContent=currentTemp;
            DOM.date.innerHTML=currentDate;

            //results.forecast[i].day.condition.text(icon)
            let days=results.forecast.forecastday;
           
            days.forEach(element => {
                console.log(element);
            });
            
        }

    })();
});