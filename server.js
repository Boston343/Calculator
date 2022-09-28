
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true})); // this is for parsing data from html form

// __dirname is only available with CJS. Since I am using ESM I need to get it another way
// const __dirname = path.resolve();  // method 1.. apparently not totally correct? https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------------------------------------
// --------------------- Get Requests --------------------------
// -------------------------------------------------------------
// Normal Calculator
app.get('/', function(req, res) {
    var fileName = "index.html";
    var options = {
        root: path.join(__dirname)
    };

    res.sendFile(fileName, options, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', __dirname + "\\" + fileName);
        }
    });
    // console.log(req);
});

// BMI Calculator
app.get('/bmicalculator', function(req, res) {
    var fileName = "bmiCalculator.html";
    res.sendFile(path.join(__dirname, "\\" + fileName));
    console.log('Sent:', __dirname + "\\" + fileName);
});

// -------------------------------------------------------------
// -------------------- Post Requests --------------------------
// -------------------------------------------------------------
// Normal Calculator
app.post('/', function(req, res) {
    console.log(req.body);
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    console.log("Result: " + result);
    res.send("The result of the calculation is: " + result);
});

// BMI Calculator
app.post('/bmicalculator', function(req, res) {
    console.log(req.body);
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var result = (weight / (height**2)) * 703;
    console.log("Result: " + result);
    res.send("Your BMI is: " + result);
});

// -------------------------------------------------------------
// ---------------------- Listening ----------------------------
// -------------------------------------------------------------
app.listen(port, () => {
    console.log(`Example app listening on port ${port} at \"localhost:${port}\"`);
});