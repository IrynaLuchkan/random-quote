window.onload = function () {
    var btnGenerate = document.getElementById("generate-quote");

    btnGenerate.addEventListener("click", downloadNow);

    var myQuote = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=4';
    //https://cors-everywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1    
    
    function downloadNow() {             

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', myQuote, true);
        xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                if(xmlhttp.status === 200) {
                    var objResponse = JSON.parse(xmlhttp.responseText);
                    
                    var elemQuoteText = document.getElementById('quote-text');

                    var div = document.createElement('div');                     
                    div.innerHTML = objResponse[0].content;                    
                                    
                    while (elemQuoteText.childNodes[2]) {
                        elemQuoteText.removeChild(elemQuoteText.lastChild);
                    }
                    elemQuoteText.appendChild(div);                   
                    
                    document.getElementById('quote-autor').innerHTML = objResponse[0].title;                    
                }
            }
        };
    }
};
