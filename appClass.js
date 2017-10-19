window.onload = function () {
    class GenerateQuote {
        constructor(btnGenerateIdent, quoteTextIdent, quoteAutorIdent) {
            this.btnGenerate = document.querySelector(btnGenerateIdent),
            this.quoteText = document.querySelector(quoteTextIdent),
            this.quoteAutor = document.querySelector(quoteAutorIdent),
            this.myQuoteUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
            this.addClickEvent()
        }

        addClickEvent() {
            console.log('hi. addClickEvent runs');            
            this.btnGenerate.addEventListener("click", () => {
                console.log(this);
                this.btnGenerate.innerHTML = "Please wait";
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
                .then((processJSON) => {           
                    this.quoteText.innerHTML = processJSON[0].content;
                    this.quoteAutor.innerHTML = processJSON[0].title;
                    this.btnGenerate.innerHTML = "Get new quote";

                    //creating tweeter button
                    document.getElementById('tweetContainer').innerHTML = '';

                    twttr.widgets.createShareButton(
                        '',
                        document.getElementById('tweetContainer'),
                        {
                            text: `${this.quoteText.textContent} -${this.quoteAutor.textContent}`
                        }
                    );
                })
                .catch((err) => {
                    console.log(err);
                    this.quoteText.innerHTML = "Error occurs. Please check if CORS enabled.";
                })            
            })
        }
    }
// tweeter function
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

    let generateQuote = new GenerateQuote('#generate-quote', '#quote-text', '#quote-autor');
    
};