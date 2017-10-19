window.onload = function () {
    class GenerateQuote {
        constructor(btnGenerateIdent, quoteTextIdent, quoteAutorIdent) {
            this.btnGenerate = document.querySelector(btnGenerateIdent);
            this.quoteText = document.querySelector(quoteTextIdent);
            this.quoteAutor = document.querySelector(quoteAutorIdent);
            this.myQuoteUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
            this.addClickEvent();
        }

        addClickEvent() {                       
            this.btnGenerate.addEventListener('click', () => this._parseQuoteInfo());
        }

        _getQuote() {
            let qouteRequestResult = new Promise(result => {
                let xmlhttp = new XMLHttpRequest();                
                xmlhttp.open('GET', this.myQuoteUrl, true);
                xmlhttp.setRequestHeader('Cache-Control', 'max-age=0');
                xmlhttp.send();
                xmlhttp.onreadystatechange = () => {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                    {                 
                        result(JSON.parse(xmlhttp.responseText));
                    } else {this.quoteText.innerHTML = "Error occurs. Please check if CORS enabled.";};
                };
            }); 
            return qouteRequestResult;
        }

        _parseQuoteInfo() {  
            this.btnGenerate.innerHTML = 'Please wait';          
            this._getQuote().then((qouteJSON) => {           
                this.quoteText.innerHTML = qouteJSON[0].content;
                this.quoteAutor.innerHTML = qouteJSON[0].title;

                this.btnGenerate.innerHTML = 'Get new quote';

                //creating tweeter button
                // document.getElementById('tweetContainer').innerHTML = '';

                // twttr.widgets.createShareButton(
                //     '',
                //     document.getElementById('tweetContainer'),
                //     {
                //         text: `${this.quoteText.textContent} -${this.quoteAutor.textContent}`
                //     }
                // )
            })
            .catch((err) => {
                console.log(err);
                this.quoteText.innerHTML = 'Error occurs. Please check if quote containers are correct.';
            })
        };      
    }

// tweeter function
    // window.twttr = (function(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0],
    //         t = window.twttr || {};
    //     if (d.getElementById(id)) return t;
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = "https://platform.twitter.com/widgets.js";
    //     fjs.parentNode.insertBefore(js, fjs);

    //     t._e = [];
    //     t.ready = function(f) {
    //         t._e.push(f);
    //     };

    //     return t;
    // }(document, "script", "twitter-wjs"));

    let generateQuote = new GenerateQuote('#generate-quote', '#quote-text', '#quote-autor');
    
};