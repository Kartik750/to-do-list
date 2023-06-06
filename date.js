console.log(module);

function getDate(){


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

return today;

}