var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/../public'));

// Sets the templating engine to EJS and lets the engine accept html files
app.engine('html', require('ejs').renderFile);
//sets the views keyword to the client directory
app.set('views', __dirname + '/../client');
//sets the view engine as EJS
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
