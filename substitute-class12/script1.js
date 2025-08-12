
let xhr = new XMLHttpRequest();


const url = 'https://dummyjson.com/products/1';



xhr.onload = function(data) {
    console.log("data", JSON.parse(data.target.response));
};

xhr.onerror = function() {
    console.error("Error fetching data");
};


xhr.open("GET", url, true);
xhr.send();