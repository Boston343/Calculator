
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
// __dirname is only available with CJS. Since I am using ESM I need to get it another way
// const __dirname = path.resolve();  // method 1.. apparently not totally correct? https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', function(req, res) {
    var fileName = "index.html";
    var options = {
        root: path.join(__dirname)
    };

    res.sendFile(fileName, options, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
    // console.log(req);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port} at \"localhost:${port}\"`);
});