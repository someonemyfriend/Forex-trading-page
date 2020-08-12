let startTime;
let endTime;
let setMinutes;
let count = 0;

function loadData() {
    let request = new XMLHttpRequest();
    request.open('GET', 'currencies.json', true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        let data = JSON.parse(request.responseText);
        start(data.rates);
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();
}

function start(rates) {
    //set to html
    document.getElementById("usd").innerHTML = rates.USD.toFixed(4);
    document.getElementById("aud").innerHTML = rates.AUD.toFixed(4);
    document.getElementById("cad").innerHTML = rates.CAD.toFixed(4);
    document.getElementById("bgn").innerHTML = rates.BGN.toFixed(4);

    //start timer use setinterval and call doCha
    startTime = new Date();
    let setMinutes = setInterval(function() {
        doChanges()
    }, 60000); 
}

function doChanges(){
    let inMinute = new Date().getMinutes() - startTime.getMinutes();
    if(count === 5)
    {
        clearInterval(setMinutes);
    }
    else if(inMinute > 0) // if one minute is passed
    { 
        count+=1;
        console.log(count);
        inMinute%2 === 0 ? downRates() : upRates();
    }
}

function upRates(){
    let usd =  parseFloat(document.getElementById("usd").innerHTML) + 0.0001;
    let aud =  parseFloat(document.getElementById("aud").innerHTML) + 0.0001;
    let cad =  parseFloat(document.getElementById("cad").innerHTML) + 0.0001;
    let bgn =  parseFloat(document.getElementById("bgn").innerHTML) + 0.0001;

    document.getElementById("usd").innerHTML = usd;
    document.getElementById("aud").innerHTML = aud;
    document.getElementById("cad").innerHTML = cad;
    document.getElementById("bgn").innerHTML = bgn;
    makeItGreen()
}

function downRates(){
    let usd =  parseFloat(document.getElementById("usd").innerHTML) - 0.0001;
    let aud =  parseFloat(document.getElementById("aud").innerHTML) - 0.0001;
    let cad =  parseFloat(document.getElementById("cad").innerHTML) - 0.0001;
    let bgn =  parseFloat(document.getElementById("bgn").innerHTML) - 0.0001;

    document.getElementById("usd").innerHTML = usd;
    document.getElementById("aud").innerHTML = aud;
    document.getElementById("cad").innerHTML = cad;
    document.getElementById("bgn").innerHTML = bgn;
    makeItRed()
}

function makeItGreen() {
    document.getElementById("usd").style.backgroundColor = "green";
    document.getElementById("aud").style.backgroundColor = "green";
    document.getElementById("cad").style.backgroundColor = "green";
    document.getElementById("bgn").style.backgroundColor = "green";
}

function makeItRed() {
    document.getElementById("usd").style.backgroundColor = "red";
    document.getElementById("aud").style.backgroundColor = "red";
    document.getElementById("cad").style.backgroundColor = "red";
    document.getElementById("bgn").style.backgroundColor = "red";
}