var myCity = {
    "name": "Dubai",
    "country": "UAE",
    "place": "Dubai Mall"
};

console.log(myCity.name); // Outputs: Dubai
console.log(myCity.country); // Outputs: UAE

var myCity = ["Dubai", "UAE", "Dubai Mall"];

console.log(myCity[0]); // Outputs: Dubai

var myCities = [
    {
        "name": "Dubai",
        "country": "UAE",
        "place": "Dubai Mall"
    },
    {
        "name": "Milan",
        "country": "Italy",
        "place": "Duomo Di Milano"
    }
];


console.log(myCities[1].country); // Outputs: Italy

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://Devansh-Taneja.github.io/Devansh-Taneja/WEEK4/cities1.json');
ourRequest.onload = function() {
var ourData = JSON.parse(ourRequest.responseText);
console.log(ourData[0]);
};
ourRequest.send();