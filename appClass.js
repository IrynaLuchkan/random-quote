window.onload = function () {
    class GenerateQuote {
        constructor(btnGenerateIdent, quoteTextIdent, quoteAutorIdent) {
            this.btnGenerate = document.querySelector(btnGenerateIdent),
            this.quoteText = document.querySelector(quoteTextIdent),
            this.quoteAutor = document.querySelector(quoteAutorIdent),
            this.myQuoteUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
        }

        addClickEvent() {
            console.log('hi');
            this.btnGenerate.addEventListener("click", this.downloadNow);
        };        
        
        downloadNow() {
            return fetch(this.myQuoteUrl, {
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
                document.getElementById('tweetContainer').innerHTML = '';

                twttr.widgets.createShareButton(
                    '',
                    document.getElementById('tweetContainer'),
                    {
                        text: `${elemQuoteText.textContent} -${document.getElementById('quote-autor').textContent}`
                    }
                );
            })
            .catch(function () {
                document.getElementById('quote-text').innerHTML = "OH NOOOOOOOOOO";
            })  
        }
    }

    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));

    console.log('hi again');


    let generateQuote = new GenerateQuote('#generate-quote', '#quote-text', '#quote-autor');
    console.log(generateQuote);
    
    generateQuote.addClickEvent();


        //var btnGenerate = document.getElementById("generate-quote"),
        let btnTwit = document.getElementById("tweetMessage");

        //btnGenerate.addEventListener("click", downloadNow);    

        //var myQuote = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
        //https://cors-everywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1

        //var elemQuoteText = document.getElementById('quote-text');    

};