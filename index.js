import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employeeRoute from './api/employee/routes/employeeRoute';
import departmentRoute from './api/department/routes/departmentRoute';


const app = express();
const LISTEN_PORT = process.env.LISTEN_PORT || process.env.PORT || 3000;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


employeeRoute(app);

app.listen(LISTEN_PORT, function () {
    console.log(`Listening on port ${LISTEN_PORT}`);
});
departmentRoute(app);



app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Application error occured, Please contact System Administrator.');
})