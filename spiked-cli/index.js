#!/usr/bin/env node
const chalk = require('chalk');

console.log('\n\n',
  chalk.green.bold('  $$$$$$$\\  $$\\                                     $$\\              '), '\n',
  chalk.green.bold('  $$  __$$\\ $$ |                                    \\__|             '), '\n',
  chalk.green.bold('  $$ |  $$ |$$$$$$$\\   $$$$$$\\   $$$$$$\\  $$$$$$$\\  $$\\ $$\\   $$\\    '), '\n',
  chalk.green.bold('  $$$$$$$  |$$  __$$\\ $$  __$$\\ $$  __$$\\ $$  __$$\\ $$ |\\$$\\ $$  |   '), '\n',
  chalk.green.bold('  $$  ____/ $$ |  $$ |$$ /  $$ |$$$$$$$$ |$$ |  $$ |$$ | \\$$$$  /    '), '\n',
  chalk.green.bold('  $$ |      $$ |  $$ |$$ |  $$ |$$   ____|$$ |  $$ |$$ | $$  $$<     '), '\n',
  chalk.green.bold('  $$ |      $$ |  $$ |\\$$$$$$  |\\$$$$$$$\\ $$ |  $$ |$$ |$$  /\\$$\\    '), '\n',
  chalk.green.bold('  \\__|      \\__|  \\__| \\______/  \\_______|\\__|  \\__|\\__|\\__/  \\__|   '), '\n\n',
  chalk.yellow.bgBlue.bold('                                                  ', '\n\n'));

console.log('Scanning the ship for rats...', '\n');

const program = require('commander'),
      mongoose = require('mongoose'),
      dotenv = require('dotenv').config({path: `${__dirname}/mp.env`}),
      snooper = '.clients.dealerspike.net',
      http = require('http');

mongoose.connect(process.env.MONGODB_URI);

const
  dealerSchema = new mongoose.Schema({
    "id": String,
    "name": String,
    "url": String,
    "countryCode": String,
    "featureFlags": [String],
    "migrated": Boolean
  }),
  Dealer = mongoose.model('dealers', dealerSchema);

const
  db = mongoose.connection;

const confirm = (dealers) => {
  
  console.log(typeof dealers);
  
  dealers.forEach( (dealer, i, array) => {
    console.log(chalk.green('Checking: ', `${dealer.url.split('.')[0]}${snooper}`));
    let options = {
      method: 'HEAD',
      host: `${dealer.url.split('.')[0]}${snooper}`,
      port: 80,
      path: '/'
    };
    let req = http.request(options, function (r) {
      //console.log(dealer.name, `: Checking ${dealer.url.split('.')[0]}${snooper}...`);
      //console.log("\t", JSON.stringify(r.statusCode));
      if(r.statusCode === 200) console.log(chalk.red(dealer.name, ` IS ON DEALERSPIKE at ${dealer.url.split('.')[0]}${snooper}`));
      
      if (i === (array.length - 1)) process.exit(1)
    });
    req.on('error', (err) => console.log(err));
    req.end();
  });
};

const search = ( dealerURL ) => {
  let
    searchString;
  
  if(typeof dealerURL === 'undefined') {
    searchString = {};
    
    Dealer.find(searchString).exec(function(err, result) {
      if (!err) {
        return result;
      } else {
        console.log('Error retrieving Dealers List: ');
      }
    }).then( (dealers) => confirm(dealers));
  } else {
    confirm( [ {url: dealerURL} ] );
  }
  
};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('\nMongo has joined the search...\n');
  program
    .usage('[options]')
    .option('-d, --dealer [value]', 'Search for a specific dealer.', search)
    .option('-a, --all', 'Search for all dealers', search)
    .parse(process.argv);
});
