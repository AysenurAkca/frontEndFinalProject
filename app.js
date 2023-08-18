const result = document.querySelector("#result");
const countriesList = document.querySelector("#countries-list")
const playBtn = document.querySelector("#playGame")
const deleteBtn = document.querySelector("#delete") 
$("#countries").click(function(){
    result.setAttribute("style","display:flex")
    xhr = new XMLHttpRequest();
    xhr.open("GET","https://restcountries.com/v3.1/all",true)
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status===200){
            let data = JSON.parse(this.responseText)
            let card="";
            for(let i=0; i<data.length;i++){
                card += `<div class="card ">
                <img src="${data[i].flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h2 class="card-title">${data[i].name.common}</h2>
                  <p class="card-text">${data[i].capital}</p>
                  
                  <a href="${data[i].maps.googleMaps}" class="btn btn-primary" target="_blank"> Google Map</a>
                </div>
              </div> `
                
                
            }
            
            result.innerHTML = card;
            console.log(data);
        }
    }
    xhr.send()
})

deleteBtn.addEventListener("click", function(){
    result.setAttribute("style","display:none")
})

