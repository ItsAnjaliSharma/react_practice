const express =require('express');
const app =express();
const bodyParser=require('body-parser');
const AuthRouter=require('./Routes/AuthRouter');
const userRoutes = require('./Routes/userRoutes.js')
const cors=require('cors');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter );
app.use("/api", userRoutes );


app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`);
})