
const express = require('express');
const app = express();
const path = require('path');



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))


const products = [
    {
        name: 'Product 1',
        price: 10.99,
        description:"very costly"
    },
    {
        name: 'Product 2',
        price: 12.99,
        description:"less costly"
    },
    {
        name: 'Product 3',
        price: 8.99,
        description:"very cheap"
    }
]



// Routes
app.get('/', (req, res)=>{
    res.render('home',{products:products,name:"kbc"})
})

// Connection
app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})