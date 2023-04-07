const mongoose = require('mongoose');
mongoose.connect(process.env.url).then(()=>{
    console.log('mongoose connect successfully');
}).catch((err)=>{
    console.log('error mongoose not connected:')

})

