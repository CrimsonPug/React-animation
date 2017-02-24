var express = require('express');
var multer = require('multer');
var app = express();

const PORT = process.env.PORT || 8000;

const app = express();

//defines which origins and headers are permitted
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  next();
});

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/files', upload.single('file'), (req, res) => {
 const file = req.file; // file passed from client
 const meta = req.body; // all other values passed from the client, like name, etc..
 
 // send the data to our REST API
 axios({
    url: `https://api.myrest.com/uploads`,
    method: 'post',
    data: {
      file,
      name: meta.name,      
    },
  })
   .then(response => res.status(200).json(response.data.data))
   .catch((error) => res.status(500).json(error.response.data));
});

app.listen(PORT, function() {
	console.log('listening on port 8000');
})	