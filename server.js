var express = require('express')
var multer = require('multer')
var app = express();
var busboy = require('busboy')
//1. save to memory storage
//2. set limits for the file
var upload = multer({storage: multer.memoryStorage()})
app.use(express.static(__dirname + '/public'));

app.post('/upload', upload.single('fileToUpload'), function(req, res, next) {
    
    res.json({"size":req.file.size});
})
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});