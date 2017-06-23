/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
const
  express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ip = require('express-ipfilter').IpFilter,
  IpDeniedError = require('express-ipfilter').IpDeniedError;

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
  featureSchema = new mongoose.Schema({
    "name": String,
    "flags": [String],
    "isComplete": Boolean,
    "note": String
  }),
  Feature = mongoose.model('features', featureSchema);

const IPS = [['127.0.0.1','204.154.44.0/24']];

router.use(ip(IPS, {mode: 'allow'}));



// Use native promises
mongoose.Promise = global.Promise;


router.get('/', function(req, res) {
  return res.render('landing', {});
});

/*
 * GET dealerlist.
 */
router.get('/dealers', function(req, res) {
  Dealer.find({}).exec(function(err, result) {
    if (!err) {
      res.json(result);
    } else {
      res.json({message: 'Error retrieving Dealers List: ', err});
    }
  });
});



router.get('/dealers/eligible/:id', function(req, res) {
  Dealer.find({'id': req.params.id}).exec(function(err, result) {
    
    if (!err) {
      
      //If there is no problem compare dealer features to feature status.
      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          let featureQuery = result;
          
          return res.render('eligible-list', {eligibility: 'Eligible', data: determineEligibility(dealerQuery,featureQuery, true)});
        }
      })
    }
  })
});

/*
 * GET Eligible Dealer List
 */
router.get('/dealers/eligible', function(req, res) {
  Dealer.find({}).exec(function(err, result) {
    
    if (!err) {
      //If there is no problem compare dealer features to feature status.

      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          
          let featureQuery = result;
  
          return res.render('eligible-list', {eligibility: 'Eligible', data: determineEligibility(dealerQuery,featureQuery, true)});
          
        }
      })
    }
  })
});


/*
 * GET Ineligible Dealer
 */

router.get('/dealers/not/eligible/:id', function(req, res) {
  Dealer.find({'id': req.params.id}).exec(function(err, result) {
    
    if (!err) {
      
      //If there is no problem compare dealer features to feature status.
      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          let featureQuery = result;
          
          return res.render('eligible-list', {eligibility: 'Ineligible', data: determineEligibility(dealerQuery,featureQuery, false)});
        }
      })
    }
  })
});

router.get('/dealers/not/eligible', function(req, res) {
  Dealer.find({}).exec(function(err, result) {
    
    if (!err) {
      //If there is no problem compare dealer features to feature status.
      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          
          let featureQuery = result;
  
          return res.render('eligible-list', {eligibility: 'Ineligible', data: determineEligibility(dealerQuery,featureQuery, false)});
          
        }
      })
    }
  })
});



const determineEligibility = ( dealers, features, eligible = true ) => {
  
  let eligibilityList = {
    count: 0,
    dealers: []
  };
  
  dealers.forEach( (dealer, dealerIndex) => {
    
    let isEligible = true;
    let dealerJSON = {id: dealer.id, name: dealer.name, features: []};
    
    dealer.featureFlags.forEach( (flag, index) => {
      
      
        
      features.forEach( (feature) => {
  
        if(dealerIndex === 0) console.log( ">  dealer flag: ", flag, "   feature flags: ", feature.flags, "   has: ", feature.flags.indexOf(flag) >= 0 );
        
        if ( feature.flags.indexOf(flag) >= 0 ) {  //If feature's flag list contains the current flag

          if( dealerJSON.features.indexOf(feature.name) < 0 ) {
            dealerJSON.features.push(feature.name);
          }
    
          if (!feature.isComplete) isEligible = false; //If feature is not complete, dealer is ineligible
          //console.log(`The ${Object.keys(flag)[0]} feature is ${feature.isComplete ? 'complete' : 'not complete'}.`);
          //console.log(`${dealer.DealerName} is ${isEligible ? 'eligible' : 'not eligible'}.`);
    
        }
        
      })
    
    });
    
    
    if(isEligible === eligible) {
      if(!dealer.migrated) {
        eligibilityList.count += 1;
        eligibilityList.dealers.push(dealerJSON);
      }
    }
    
  });
  
  return eligibilityList
};

/*
 * GET featurelist.
 */
router.get('/features', async function(req, res) {
  // Search for all records in the Feature model
  Feature
    .find({})
    .sort({isComplete: -1})   //Sort complete features first
    .exec(function(err, result) {
      if (!err) {
        featureCount( result )  //Count the Dealers who have each feature
          .then( ( countedFeatures ) => { //... then render the view with the features
            return res.render('features-list', {features: countedFeatures })
          });
      } else {
        return res.json({message: 'Error retrieving Features List: ', err});
      }
    });
});

const featureCount = ( features ) => {
  // For Each feature, identify the number of dealers using the feature
  console.log("Counting...");
  
  return Promise.all(
    features.map((feature) => {
    
      return Dealer
        .find({
          featureFlags: {$in: feature.flags} //Find dealers whose feature flags match the current feature
        })
        .count() // Count the dealers returned
        .exec((err, count) => {
        
          if (!err) {
            feature.dealerCount = count; //Assign the dealer count to the dealer
            console.log("Count: ", count, ", dealerCount: ", feature.dealerCount);
          } else {
            console.error(err);
          }
        
        }).then( () => feature ).catch((err) => console.log(err));
    
    })
    
  );
  
};


router.use(function(err, req, res, _next) {
  console.log('Error handler', err);
  if(err instanceof IpDeniedError){
    res.status(401);
  }else{
    res.status(err.status || 500);
  }
  
  res.render('error', {
    message: 'You shall not pass',
    error: err
  });
});
module.exports = router;