window.onload = function () {
    var btnGenerate = document.getElementById("generate-quote");

    btnGenerate.addEventListener("click", downloadNow);

    var myQuote = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=4';
    //https://cors-everywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1

    var elemQuoteText = document.getElementById('quote-text');
    
    function downloadNow() {        

        return fetch(myQuote, {
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
        .then(res => 
             {
            if(res.headers.get("content-type") &&
                res.headers.get("content-type").toLowerCase().indexOf("application/json") !== -1) {                      
                return res.json()
            } else {
            throw new TypeError()
            }
        })
        .then(function(processJSON){           
            elemQuoteText.innerHTML = processJSON[0].content;
            document.getElementById('quote-autor').innerHTML = processJSON[0].title;
        })

        .catch(function () {
            document.getElementById('quote-text').innerHTML = "OH NOOOOOOOOOO";
        })  
    }
};