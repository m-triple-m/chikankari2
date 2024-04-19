const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;
// console.log('some task');
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    
}).catch((err) => {

    console.log(err);
    
});

// setTimeout(()=>{console.log('after 1 seconds')},1000)
// console.log('some other task');

module.exports = mongoose;