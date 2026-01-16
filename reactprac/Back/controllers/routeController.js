const json=require('../models/data.json');

module.exports.name=(req,res)=>{
    res.send({
        Sharma:'true',
        fetch: json
    })
}