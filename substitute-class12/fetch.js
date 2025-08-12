const { log } = require("console")

const url = "https://dummyjson.com/products/1"


fetch(url).then((data) => data.json())
.then((data) => {
    console.log(data);
    
}).catch((err)=>{
    console.log(err);
    
})