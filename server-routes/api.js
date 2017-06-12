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
    "FeatureFlags": [
      {"HasUseChat": Boolean},
      {"HasLeadXmlExport": Boolean},
      {"HasFinanceApps": Boolean},
      {"HasMobile": Boolean},
      {"HasOnlineCatalog": Boolean},
      {"HasOnlineOrders": Boolean},
      {"HasCoupons": Boolean},
      {"HasGuestBook": Boolean},
      {"HasMassEmail": Boolean},
      {"HasInvoices": Boolean},
      {"HasCallManagement": Boolean},
      {"HasEmailManagement": Boolean},
      {"HasEmploymentApps": Boolean},
      {"HasOEMPromotions": Boolean},
      {"HasRentals": Boolean},
      {"HasMobile_MobileMaintenanceOptions": Boolean},
      {"HasSitemapManager": Boolean},
      {"HasBannerBuilder": Boolean},
      {"HasSocialMedia": Boolean},
      {"HasMigratedToPhoenix": Boolean},
      {"HasImChatFee": Boolean},
      {"HasCallTrackingFee": Boolean},
      {"HasEmailFee": Boolean},
      {"HasSocialMediaFee": Boolean},
      {"HasRVWSNewsletterFee": Boolean},
      {"HasNewsletterTransmissionFee": Boolean},
      {"HasOEMPromotionsFee": Boolean},
      {"HasRentalsModuleFee": Boolean},
      {"HasMultiLocationFee": Boolean},
      {"HasFreeSiteFee": Boolean},
      {"HasCatalogPackDistributorFee": Boolean},
      {"HasCatalogPackPremiumFee": Boolean},
      {"HasCatalogPackStandardFee": Boolean},
      {"HasCraigslistQuickPlusFee": Boolean},
      {"HasCraigslistQuickPlusEbayFee": Boolean},
      {"HasDataDistributionFee": Boolean},
      {"HasEbayAuctionsClassifiedsFee": Boolean},
      {"HasRVABasicFee": Boolean},
      {"HasRVUSAFee": Boolean},
      {"HasSocialLinkRVFee": Boolean},
      {"HasTotalDataDistributionFee": Boolean},
      {"HasVideoBrochureFee": Boolean},
      {"HasWebsiteFlixFee": Boolean},
      {"HasRVWSBronzePowerPakFee": Boolean},
      {"HasRVWGoldPowerPakFee": Boolean},
      {"HasRVWSPlatinumPowerPakFee": Boolean},
      {"HasRVWSSilverPowerPakFee": Boolean},
      {"HasFiche": Boolean},
      {"HasTestimonials": Boolean},
      {"HasLotVantageEbay": Boolean},
      {"HasLotVantageCraigsList": Boolean},
      {"HasClazRV": Boolean},
      {"HasCarSourRV": Boolean},
      {"HasOodleRV": Boolean},
      {"HasPennySaverRV": Boolean},
      {"HasGeebo": Boolean},
      {"HasRVandCycleShopper": Boolean},
      {"HasRVTraderApi": Boolean},
      {"HasCapitalDealerSolutions": Boolean},
      {"HasRVUSA": Boolean},
      {"HasEbayRV": Boolean},
      {"HasCraigsListRV": Boolean},
      {"HasJaycoInventory": Boolean},
      {"HasKijiji": Boolean},
      {"HasAutoTraderCA": Boolean},
      {"HasOnDemandInventoryExtract": Boolean},
      {"HasKijijiLeadImport": Boolean},
      {"HasPSNLeadImport": Boolean},
      {"IsDisplayingSharedInventory": Boolean},
      {"IsSharingInventory": Boolean},
      {"HasDataXInventory": Boolean},
      {"HasTraderOnlineInventory": Boolean},
      {"HasLoginPage": Boolean}
    ]
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
      let eligible = true;
      
      
      
    }
    
    
  })
});

/*
 * GET featurelist.
 */
router.get('/features', function(req, res) {
  Feature.find({}).exec(function(err, result) {
    if (!err) {
      res.json(result);
    } else {
      res.json({message: 'Error retrieving Features List: ', err});
    }
  });
});

module.exports = router;