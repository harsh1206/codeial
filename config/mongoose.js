const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;

// port no. change krne se hoga ?
// i dont think so
// ur code is fine
// then why is it not getting printed
// is it because of wrong folder directory