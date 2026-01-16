const app=require('express');
const routes=require('./Routes/AppRoutes');
const server=app();
const port=8085;
server.use('/anjali', routes);
server.listen(port,()=>{
    console.log(`Server Running on ${port} `);
})

