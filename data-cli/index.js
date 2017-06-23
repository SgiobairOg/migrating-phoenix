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
  chalk.yellow.bgBlue.bold('                                                by RV WEB SERVICES   ', '\n\n'));

console.log('Guten tag Herr Pterodactyl!!', '\n');

const program = require('commander'),
      csv = require('csv'),
      fs = require('fs'),
      { spawn } = require('child_process'),
      dotenv = require('dotenv').config({path: `${__dirname}/mp.env`}),
      jsonwrite = require('jsonfile').writeFile;

let
  fileInput = "",
  dbName = "",
  dealerCollection = [],
  programReplace;

program
  .arguments('<file> [database]')
  .option('-r, --replace', 'Replace all objects in the dealers collection.')
  .action( (file, database) => {
    fileInput = file;
    dbName = database;
    programReplace = program.replace;
    console.log("I have brought you this new file: ", file);
    console.log(`See that its contents come to rest in the dealers collection.`);
    console.log(`As the replace flag flutters in the breeze the crows cry "${programReplace || false}".\n\n`);
  })
  .parse(process.argv);

if (typeof fileInput === 'undefined') {
  console.error('No file was submitted to the Phoenix');
  process.exit(1);
}

const parser = csv.parse({delimiter: ','}, (err, data) => {
  if(!err) {
    let
      keys,
      values = [];
    
    [keys, ...values] = data;
    // console.log("Keys: ", keys);
    // console.log("Values: ", values);
    
    // Loop through each dealer's value set and assign them to JSON object
    // JSON format:
    // dealer: {
    //    id:               "DealerId",
    //    name:             "DealerName",
    //    url:              "DealerURL",
    //    countryCode:      "CountryCode",
    //    dealerClassCode:  "DealerClassCode",
    //    featureFlags:     "FeatureFlags",           // True/False will be reduced to a listing of positive flags
    //    migrated:         "hasMigratedToPhoenix"
    // }
    
    values.forEach( (dealer, d) => {
    
      let dealerJSON = {};
      
      [,,,, ...dealerFlagKeys] = keys;
      [dealerJSON.id, dealerJSON.name, dealerJSON.url, dealerJSON.countryCode, ...dealerFlags] = dealer;
      dealerJSON.featureFlags = [];
      
      dealerFlags.forEach( (flag, index) => {
        //console.log(">  ", dealerFlagKeys[index], " :: ", flag );
        if( dealerFlagKeys[index] === "HasMigratedToPhoenix" ) {
          
          // Copy the value of the migration flag to a true/false property of the JSON
          flag === "Y" ? dealerJSON.migrated = true : dealerJSON.migrated = false;
          
        }
        
        if( flag === "Y" ) {
          
          //Push the key for all enabled feature flags
          dealerJSON.featureFlags.push( dealerFlagKeys[index] );
          
        }
        
      });
      
      dealerCollection.push( dealerJSON );
    
    });
    
    //console.log(dealerCollection);
    jsonwrite( 'dealers.json', dealerCollection, (err) => {
      if(err) {
        console.error(err);
      } else {
        console.log(chalk.blue('JSON ready to upload'));
        
        let optionArray = [`-h=${process.env.MONGO_HOST}`,
            `-d=${dbName}`,
          '-c=dealers',
          `-u=${process.env.MONGO_USER}`,
          `-p=${process.env.MONGO_PASS}`,
          '--file=dealers.json',
          '--jsonArray'];
        
        if(programReplace) optionArray.push('--drop');
        
        const upload = spawn('mongoimport', optionArray);
        //console.log(upload);
        console.log(chalk.green('Starting upload...\n'));
        
        upload.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        upload.stderr.on('data', (data) => {
          console.log(chalk.yellow(`stderr: ${data}`));
        });
        upload.on('close', (code) => {
          console.log(chalk.blue(`Upload completed and exited with code ${code}`));
        });
      }
    })
    
  } else {
    console.log(err)
  }
});

fs.createReadStream(fileInput).pipe(parser);