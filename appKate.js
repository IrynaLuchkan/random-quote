window.onload = function () {
    var myBtn = document.getElementById("generate-quote");

    myBtn.addEventListener("click", downloadNow);

    var URL = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=4';
    //https://cors-everywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1

    var elem = document.getElementById('quote-text');
    
    function downloadNow() {
       
       return fetch(URL, {
          method: 'GET',
          type: 'cors',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin':'*',
           'pragma': 'no-cache',
           'cache-control': 'no-cache'
          },
       })
       .then(response => {
          var contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
             console.log('hi');        
             return response.json()
          } else {
             throw new TypeError()
         }})
        .then(function(processJSON){           
            elem.innerHTML = processJSON[0].content;
            document.getElementById('quote-autor').innerHTML = processJSON[0].title;
        })
        .catch(function () {
            document.getElementById('quote-text').innerHTML = "Oops, we haven't got JSON";
        })
    }
};