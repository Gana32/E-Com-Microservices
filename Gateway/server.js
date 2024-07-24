const express= require('express');
const proxy= require('express-http-proxy')
const app= express();
const cors= require('cors');

app.use(cors());

app.get('/',(req,res)=>{
    res.send('This is the Gateway Service');
});

app.use('/customers',proxy('http://localhost:8000/'))
app.use('/products',proxy('http://localhost:8001/'))
app.use('/shopping',proxy('http://localhost:8002/'))

app.listen(7000,()=>{
    console.log('server is running on port 7000');
});