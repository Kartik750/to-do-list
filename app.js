const express=require('express');
const bodyParser=require('body-parser');
const { stringify } = require('querystring');
// const today=require(__dirname+'/date.js');

const port=3000;

const app=express();

var items=[];
var ctime="";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get('/', function(req, res){
    // res.send("hello");

    // adding some logics to it
    var today=new Date();
    
    // var currentDay=today.getDay();
    // var day="";

    // if(currentDay===6 || currentDay===0){
    //     // day="weekend";
    //     // res.sendFile(__dirname+'/weekend.html');
        
    // }
    // else{
    //     day="weekday";
    //     // res.sendFile(__dirname+'/weekend.html');
    // }

    // using a switch statement :
    // switch (currentDay) {
    //     case 0:
    //         day="sunday";
    //         break;

    //     case 1:
    //         day="monday";
    //         break;
        
    //     case 2:
    //         day="tuesday";
    //         break;

    //     case 3:
    //         day="wednesday";
    //         break;
        
    //     case 4:
    //         day="thursday";
    //         break;

    //     case 5:
    //         day="friday";
    //         break;

    //     case 6:
    //         day="saturday";
    //         break;
            
    //     default:
    //         break;
    // }

    // using javascript code for dates
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    ctime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var day=today.toLocaleDateString('en-US', options); //Tuesday, June 6 (format)

    res.render('lists', {kindOfDay: day, AddedItem: items, currtime: ctime});
});

app.post('/', function(req, res){   
    var item=req.body.newItem;
    items.push(item);

    

    res.redirect('/'); 
    // res.send('successfully added');
});

app.get('/about', function(req, res){
    res.render('about');
});


app.listen(port, function(){
    console.log('server is up ans running at port : '+port);
})