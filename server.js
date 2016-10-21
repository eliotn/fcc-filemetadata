var express = require('express')
var app = express();
var Busboy = require('busboy')
app.use(express.static(__dirname + '/public'));

//don't save to storage, just get the number of bytes and add them together
app.post('/upload', function(req, res) {
    var busboy = new Busboy({ headers: req.headers, limits: {files: 1, fileSize: 10485760, parts: 40960, fields: 40960}});
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename);
      var bytes = 0;
      file.on('data', function(data) {
        bytes += data.length;
        //console.log('For ' + filename + ' I got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
        res.json({"size":bytes});
      });
      file.on('limit', function() {
        res.json({"size":bytes, "error":"exceeded limits for file uploading (most likely number of files or filesize)"})
      })
    });
    req.pipe(busboy);
})
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT + '!');
});