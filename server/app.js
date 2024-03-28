const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouters = require('./api/routers/users');
const vaccinationsRouters = require('./api/routers/vaccinations');
const diseasesRouters = require('./api/routers/diseases');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@hadasim.labivhn.mongodb.net/?retryWrites=true&w=majority&appName=Hadasim`, {

});

mongoose.connection.on('connected', () => {
    console.log('mongoDB Connected!!!');
});

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,Accept,Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
});

//Routers
app.use('/users', usersRouters);
app.use('/diseases', diseasesRouters);
app.use('/vaccinations', vaccinationsRouters);


// app.use((req, res, next) => {
//     req.on('data',(chank)=>{
//         console.log(chank.toString());
//       })
//       req.on('end',()=>{
//           next();
//       })
// })



app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: { message: err.message }
    })
})


module.exports = app;
