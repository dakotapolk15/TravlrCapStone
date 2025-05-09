const tripsEndpoint = 'http://localhost:3000';
const options ={
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    }
}

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const travel = async function(reg, res, next){
    await fetch(tripsEndpoint, options)
    .then(res => res.json())
    .then(json =>{
        let message = null;
        if(!(json instanceof Array)){
            message = 'API lookup error';
            json = [];
        } else {
            if(!json.length){
                message = 'No trips exist in our database!';
            }
        }
        res.render('travel', {title: 'Travlr Getaways', trips: json});
    })
    .catch(err => res.status(500).send(e.message));

};

module.exports = {
    travel
};