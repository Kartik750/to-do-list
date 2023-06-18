const express=require('express');
const bodyParser=require('body-parser');
const { stringify } = require('querystring');
// const today=require(__dirname+'/date.js');
const lodash=require('lodash');

const port=3000;

const app=express();

const http=require('http').Server(app);
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://kartikorson4:TAxNuhcp3rIrEbJt@newproject.p11r9rw.mongodb.net/todolistDB');

// const User=require('./models/userModule');

// async function insert(){
//     await User.create({
//         name: 'kartik'
//     });
// }
// insert();

const userSchema={
    name: String
};

const user=mongoose.model('user', userSchema);

const user1=new user({
    name: 'welcome to your to-do-list!'
});
const user2=new user({
    name: 'hit the + button to add a new item'
});
const user3=new user({
    name: '<-- hit this to delete an item'
});

const defaultUsers=[user1, user2, user3];
      
// async function getUsers(){
//     const Users=await user.find({});
//     return Users;
// }

// var items=[];
// var ctime="";

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

    // ctime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var day=today.toLocaleDateString('en-US', options); //Tuesday, June 6 (format)

    // User.find({}, function(err, foundItems){
    //     res.render('lists', {kindOfDay: 'today', AddedItem: foundItems});
    // });

    // getUsers().then(function(foundUsers){
    //     // console.log(foundUsers);
    //     if(foundUsers.length===0){
    //                 User.insertMany(defaultUsers)
    //         .then(function () {
    //             console.log("Successfully saved defult items to DB");
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });
    //         res.redirect('/');
    //     }
    //     else{
    //         res.render("lists", {kindOfDay: day, AddedItem: foundUsers});
    //     }

    // });
    // console.log('length = '+user.length);
    user.find({}).then(async function(foundUsers){
        if(foundUsers.length===0){
            await user.insertMany(defaultUsers).then(function(){
                console.log('successfully saved default items to DB');
            })
            .catch(function(err){
                console.log(err);
            });
        }
        else{
            res.render('lists', {kindOfDay: 'today', AddedItem: foundUsers});
        }
    });

    // getUsers().then(function(foundUsers){
    //     res.render('lists', {kindOfDay: day, AddedItem: foundUsers});
    // });

    // res.render('lists', {kindOfDay: day, AddedItem: items, currtime: ctime});
    // res.render('lists', {kindOfDay: day, AddedItem: items, currtime: ctime});
});

app.post('/', function(req, res){   
    const userName=req.body.newItem;
    const listName=req.body.list;

    const addedUser=new user({
        name: userName
    });
    
    if(listName==='today'){
        addedUser.save();
        res.redirect('/'); 
    }
    else{
        List.findOne({name: listName}).then(function(foundList){
            
                // await user.then(function(){
                    foundList.items.push(addedUser);
                    foundList.save();
                    res.redirect('/'+listName);
                // })
                // .catch(function(err){
                //     console.log(err);
                // });
        });
    }
});

app.post('/delete', function(req, res){
    const checkedUserId=req.body.checkbox;
    const listName=req.body.listName;

    if(listName==='today'){
    async function run(){
        await user.findByIdAndRemove(checkedUserId);
        console.log('successfully deleted');
        res.redirect('/');
    }
    run();
    }
    else{
        List.findOneAndUpdate({name: listName}, {$pull:{items: {_id:checkedUserId}}}).then(function(foundList){
            res.redirect('/'+listName);
        });
    }
});

app.get('/about', function(req, res){
    res.render('about');
});

const listSchema={
    name: String,
    items: [userSchema]
};

const List=mongoose.model('List', listSchema);

app.get('/:pname',function(req, res){
    const pname=lodash.capitalize(req.params.pname);

    List.findOne({name: pname}).then(async function(foundList){
        if(!foundList){
            // create a new list
            await user.insertMany(defaultUsers).then(function(){
                console.log('successfully saved default items to DB');
                const list=new List({
                    name: pname,
                    items: defaultUsers
                });
                list.save();
                res.redirect('/'+pname);
            })
            .catch(function(err){
                console.log(err);
            });
        }
        else{
            // show an existing list
            res.render('lists', {kindOfDay: foundList.name, AddedItem: foundList.items});
        }
    });

    // res.render(pname);
});


app.listen(port, function(){
    console.log('server is up ans running at port : '+port);
})