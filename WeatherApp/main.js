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
            currentDaySymbol:document.getElementById("current-temp-symbol"),
            date:document.querySelector(".date"),
            card:document.getElementsByClassName("card"),
            maxTemps:document.querySelectorAll(".max"),
            minTemps:document.querySelectorAll(".min"),
            cardDates:document.querySelectorAll(".tittle"),
            icons:document.querySelectorAll(".icon"),
            humidityValue:document.getElementById("humidityValue"),
            humidityProgress:document.getElementById("humidityProgress"),
            windStatus:document.getElementById("wind"),
            windDirection:document.getElementById("wind-direction"),
            compass:document.getElementById("compass"),
            visibility:document.getElementById("visibility-value"),
            airPressure:document.getElementById("air-pressure-value"),
            celsiusBtn:document.getElementById("celsius"),
            fahrenheitBtn:document.getElementById("fahrenheit")


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

            //search button
            DOM.search.addEventListener("click", function(){ onSearch(DOM.location); });

            //temp convert buttons
            DOM.celsiusBtn.addEventListener("click",function(){
               this.classList.add('active');
               DOM.fahrenheitBtn.classList.remove('active');
                let gps=`http://api.weatherapi.com/v1/forecast.json?key=b06b04d417454dc19d174104241803&q=${DOM.location.value}&days=6&aqi=no&alerts=no`
                fetch(gps)
                .then(Response=>Response.json())
                .then(data=>tempConvert(data));
                
              
            })
            DOM.fahrenheitBtn.addEventListener("click",function(){
                this.classList.add('active');
               DOM.celsiusBtn.classList.remove('active');
               let gps=`http://api.weatherapi.com/v1/forecast.json?key=b06b04d417454dc19d174104241803&q=${DOM.location.value}&days=6&aqi=no&alerts=no`
                fetch(gps)
                .then(Response=>Response.json())
                .then(data=>tempConvert(data));
                
              
            })

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
            alert("Allow location permissions!");

        }
        function fetchGeoLocation(position){
            openSearchModal();
        }

        //requesting data from API
        function onSearch(location){
            let gps=`http://api.weatherapi.com/v1/forecast.json?key=b06b04d417454dc19d174104241803&q=${location.value}&days=6&aqi=no&alerts=no`
            fetch(gps)
            .then(Response=>Response.json())
            .then(data=>printSearchResults(data));
            
        }
        //displaying results from API
        function printSearchResults(results)
        {
            console.log(results);
            displayHumidity(results);
            displayWindStatus(results);
            displayVisibility(results);
            displayAirPressure(results);
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
            days.splice(0,1);
        
            for(let i=0;i<5;i++){
                console.log(days[i]);

                DOM.minTemps[i].textContent=days[i].day.mintemp_c+"°C";
                DOM.maxTemps[i].textContent=days[i].day.maxtemp_c+"°C";
                    
               DOM.cardDates[i].textContent=days[i].date;
               DOM.icons[i+1].firstElementChild.setAttribute('src',days[i].day.condition.icon); 
            }
        }
        function displayHumidity(results){
           DOM.humidityValue.textContent=results.current.humidity;
           DOM.humidityProgress.style.width=results.current.humidity+"%";
        }
        function displayWindStatus(results)
        {
            DOM.windStatus.textContent=results.current.wind_mph;
            DOM.windDirection.style.transform=`rotate(${results.current.wind_degree}deg)`;
            DOM.compass.textContent=`(${results.current.wind_dir})`;
        }
        function displayVisibility(results){
            DOM.visibility.textContent=results.current.vis_miles;
        }
        function displayAirPressure(results)
        {
            DOM.airPressure.textContent=results.current.pressure_mb;
        }
        function tempConvert(results)
        {
            let celsius=DOM.celsiusBtn;
            let fahrenheit=DOM.fahrenheitBtn;
            let days=results.forecast.forecastday;
        
                    for(let i=0;i<5;i++){
                        if(fahrenheit.classList.contains("active")){
                        
                            DOM.minTemps[i].textContent=days[i].day.mintemp_f+"°F";
                            DOM.maxTemps[i].textContent=days[i].day.maxtemp_f+"°F"; 
                            DOM.currentDayTemp.textContent=results.current.temp_f; 
                            DOM.currentDaySymbol.textContent="°F";
                                  

                        }      
                        else{                     
                            DOM.minTemps[i].textContent=days[i].day.mintemp_c+"°C";
                            DOM.maxTemps[i].textContent=days[i].day.maxtemp_c+"°C";
                            DOM.currentDayTemp.textContent=results.current.temp_c;
                            DOM.currentDaySymbol.textContent="°C";
                        
                        }
                    }
            }

    })();
});