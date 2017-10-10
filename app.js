window.onload = function () {
    var myBtn = document.getElementById("generate-quote");

    myBtn.addEventListener("click", downloadNow);

    var myQuote = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=4';
    //https://cors-everywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1
    
    
    function downloadNow() {
        //var div = document.createElement('div');        

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', myQuote, true);
        xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    
                    var elem = document.getElementById('quote-text');

                     var div = document.createElement('div');                     
                     div.innerHTML = obj[0].content;                    
                    console.log('hi');                    
                    while (elem.childNodes[2]) {
                        elem.removeChild(elem.lastChild);
                    }
                    elem.appendChild(div);
                   // elem.innerHTML = obj[0].content;
                    
                    document.getElementById('quote-autor').innerHTML = obj[0].title;
                    
                }
            }
        };
        //xmlhttp.send(null);

        // fetch(myQuote, {mode:"cors"})
        // .then(res => {
        //   if(res.headers.get("content-type") &&
        //      res.headers.get("content-type").toLowerCase().indexOf("application/json") >= 0) {
        //     return res.json()
        //   } else {
        //     throw new TypeError()
        //   }
        // }).then(function(processJSON){
        //     var obj = JSON.parse(processJSON)})
        // .catch(function () {
        //     document.getElementById('quote-text').innerHTML = "OH NOOOOOOOOOO";
        // });   

        //var data = new FormData();
        // var myHeaders = new Headers({
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
                       //'Allow-Control-Allow-Origin': *
        //         });
        
        // var myInit = { method: 'GET',
        //                headers: myHeaders,
        //                mode: 'no-cors'
        //                };
        
        // var myRequest = new Request(myQuote, myInit);

        // fetch(myRequest)
        // .then(
        //     function(response) { 

        //         console.log('hi'); 
        //         if (response.status !== 200) {  
        //             console.log('Looks like there was a problem. Status Code: ' +  
        //               response.status);  
        //             return;  
        //           }
        //         return response.json();
        //     })
        //     .then(function(data){
        //         document.getElementById('quote-text').innerHTML = data.title;
        //         console.log('hi again'); 
        //         console.log(data );
        //         return data;
        //     })
            
        // //     function (response) {
        // //     console.log('hi');  
        // //     response.json().then(function(data) {  
        // //         console.log('hi again');  
        // //         console.log('data');  
        // //       });                                           
        // // })
            
        //     // document.getElementById('quote-text').innerHTML = data.content;
        //     // document.getElementById('quote-autor').innerHTML = data.autor;
        
        // .catch(function () {
        //     document.getElementById('quote-text').innerHTML = "OH NOOOOOOOOOO";
        // });
    

        // var request = new Request(myQuote, {
        //     method: 'POST', 
        //     mode: 'cors', 
        //     redirect: 'follow',
        //     headers: new Headers({
        //         'Content-Type': 'text/plain'
        //     })
        // });

        // var xmlhttp = new XMLHttpRequest();
        // xmlhttp.open('GET', myQuote, false);
        // xmlhttp.onreadystatechange = function() {
        //     if (xmlhttp.readyState == 4) {
        //         if(xmlhttp.status == 200) {
        //             var obj = JSON.parse(xmlhttp.responseText);
        //             console.log(obj);
        //          }
        //     }
        // };
        // xmlhttp.send(null);


    }
};