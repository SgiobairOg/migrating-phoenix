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
  mongoose = require('mongoose');

const
  dealerSchema = new mongoose.Schema({
    "DealerID": String,
    "DealerName": String,
    "DealerURL": String,
    "CountryCode": String,
    "DealerClassCode": String,
    "FeatureFlags": []
  }),
  Dealer = mongoose.model('dealers', dealerSchema);

const
  featureSchema = new mongoose.Schema({
    "name": String,
    "flags": [String],
    "isComplete": Boolean
  }),
  Feature = mongoose.model('features', featureSchema);

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
          
          res.json(determineEligibility(dealerQuery,featureQuery, true));
          
        }
      })
    }
  })
});

router.get('/dealers/eligible/:id', function(req, res) {
  Dealer.find({'DealerID': req.params.id}).exec(function(err, result) {
    
    if (!err) {
      
      //If there is no problem compare dealer features to feature status.
      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          let featureQuery = result;
          
          res.json(determineEligibility(dealerQuery,featureQuery, true));
        }
      })
    }
  })
});

/*
 * GET Ineligible Dealer List
 */
router.get('/dealers/ineligible', function(req, res) {
  Dealer.find({}).exec(function(err, result) {
    
    if (!err) {
      //If there is no problem compare dealer features to feature status.
      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          
          let featureQuery = result;
          
          res.json(determineEligibility(dealerQuery,featureQuery, false));
          
        }
      })
    }
  })
});

router.get('/dealers/ineligible/:id', function(req, res) {
  Dealer.find({'DealerID': req.params.id}).exec(function(err, result) {
    
    if (!err) {
      
      //If there is no problem compare dealer features to feature status.
      let dealerQuery = result;
      
      Feature.find({}).exec(function(err, result) {
        if (!err) {
          let featureQuery = result;
          
          res.json(determineEligibility(dealerQuery,featureQuery, false));
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
  
  dealers.forEach( (dealer) => {
    
    let isEligible = true;
    let dealerJSON = {id: dealer.DealerID, name: dealer.DealerName, features:[]};
    
    dealer.FeatureFlags.forEach( (flag) => {
      
      if(Object.values(flag)[0]) { //If the flag is turned on for the dealer
        
        features.forEach( (feature) => {
          
          if ( feature.flags.indexOf(Object.keys(flag)[0]) >= 0 ) {  //If feature's flag list contains the current flag
            
            //Feature is in use with dealer
            dealerJSON.features.push({name: Object.keys(flag)[0]});
            //console.log(`${dealer.DealerName} has the ${Object.keys(flag)[0]} feature.`);
      
            if (!feature.isComplete) isEligible = false; //If feature is not complete, dealer is ineligible
            //console.log(`The ${Object.keys(flag)[0]} feature is ${feature.isComplete ? 'complete' : 'not complete'}.`);
            //console.log(`${dealer.DealerName} is ${isEligible ? 'eligible' : 'not eligible'}.`);
      
          }
        })
      }
    });
    
    if(isEligible === eligible) {
      eligibilityList.count += 1;
      eligibilityList.dealers.push(dealerJSON);
    }
    
  });
  return eligibilityList
};

/*
 * GET featurelist.
 */
router.get('/features', function(req, res) {
  Feature.find({}).exec(function(err, result) {
    if (!err) {
      //res.json(result);
      res.render('features-list', {features: result})
    } else {
      res.json({message: 'Error retrieving Features List: ', err});
    }
  });
});

module.exports = router;