/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
const
  express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  api = require('./server-routes/api'),
  sass = require('node-sass'),
  sassMiddleware = require('node-sass-middleware');

//Database
const
  mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const
  db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to Mongo'));
  
const
  app = express(),
  port = process.env.PORT || 1983,
  version = process.env.SOURCE_VERSION || 'dev';

app.set('view engine', 'pug');
app.set('views', path.join( __dirname, 'public/views'));
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sassMiddleware({
  src: path.join( __dirname, 'public/css/sass'),
  dest: path.join( __dirname, 'public/css'),
  debug: true,
  indentedSyntax: true,
  prefix: '/css'
}));


app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', api );
app.use(function(req, res, next){
  res.status(404);
  res.render('nope', { title: 'Nope, try again' });
  // respond with json
  if (res.format('json')) {
    res.send({ error: 'Nope, try again' });
    return;
  }
  
  // default to plain-text. send()
  res.type('txt').send('Nope, try again');
});

app.listen(port);
console.log(`Latest Server Running on port ${port} from ${version}`);