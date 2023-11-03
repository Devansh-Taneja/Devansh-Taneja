
console.log(myCities[1].country); // Outputs: Italy

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://Devansh-Taneja.github.io/Devansh-Taneja/WEEK4/cities1.json');
ourRequest.onload = function() {
var ourData = JSON.parse(ourRequest.responseText);
console.log(ourData[0]);
};
ourRequest.send();