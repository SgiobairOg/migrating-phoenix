/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DealerList from '../DealerList/index';
import { connect } from 'react-redux';
//import * as dealerActions from '../../Actions/dealerActions';
import './DealerDetailPage.css';
import '../DealerList';

class DealerStatusPage extends Component {
  render() {
    return (
      <div className="DealerDetailsPage">
        <h1>{this.props.dealer.DealerName}</h1>
        <ul>
          <li>DealerID: {this.props.dealer.DealerID}</li>
          <li>DealerName: {this.props.dealer.DealerName}</li>
          <li>DealerURL: {this.props.sherrodrvcenter.com",
          "CountryCode": "US",
          "DealerClassCode": "R",
          "HasUseChat": false,
          "HasLeadXmlExport": false,
          "HasFinanceApps": true,
          "HasMobile": false,
          "HasOnlineCatalog": false,
          "HasOnlineOrders": false,
          "HasCoupons": true,
          "HasGuestBook": false,
          "HasMassEmail": true,
          "HasInvoices": true,
          "HasCallManagement": true,
          "HasEmailManagement": true,
          "HasEmploymentApps": true,
          "HasOEMPromotions": false,
          "HasRentals": false,
          "HasMobile_MobileMaintenanceOptions": false,
          "HasSitemapManager": false,
          "HasBannerBuilder": false,
          "HasSocialMedia": false,
          "HasMigratedToPhoenix": false,
          "HasImChatFee": false,
          "HasCallTrackingFee": false,
          "HasEmailFee": false,
          "HasSocialMediaFee": false,
          "HasRVWSNewsletterFee": false,
          "HasNewsletterTransmissionFee": false,
          "HasOEMPromotionsFee": false,
          "HasRentalsModuleFee": false,
          "HasMultiLocationFee": false,
          "HasFreeSiteFee": false,
          "HasCatalogPackDistributorFee": false,
          "HasCatalogPackPremiumFee": false,
          "HasCatalogPackStandardFee": false,
          "HasCraigslistQuickPlusFee": false,
          "HasCraigslistQuickPlusEbayFee": false,
          "HasDataDistributionFee": false,
          "HasEbayAuctionsClassifiedsFee": false,
          "HasRVABasicFee": false,
          "HasRVUSAFee": false,
          "HasSocialLinkRVFee": false,
          "HasTotalDataDistributionFee": false,
          "HasVideoBrochureFee": false,
          "HasWebsiteFlixFee": false,
          "HasRVWSBronzePowerPakFee": false,
          "HasRVWGoldPowerPakFee": false,
          "HasRVWSPlatinumPowerPakFee": false,
          "HasRVWSSilverPowerPakFee": false,
          "HasFiche": false,
          "HasTestimonials": false,
          "HasLotVantageEbay": false,
          "HasLotVantageCraigsList": false,
          "HasClazRV": false,
          "HasCarSourRV": false,
          "HasOodleRV": false,
          "HasPennySaverRV": false,
          "HasGeebo": false,
          "HasRVandCycleShopper": false,
          "HasRVTraderApi": true,
          "HasCapitalDealerSolutions": false,
          "HasRVUSA": false,
          "HasEbayRV": false,
          "HasCraigsListRV": false,
          "HasJaycoInventory": false,
          "HasKijiji": false,
          "HasAutoTraderCA": false,
          "HasOnDemandInventoryExtract": false,
          "HasKijijiLeadImport": false,
          "HasPSNLeadImport": false,
          "IsDisplayingSharedInventory": false,
          "IsSharingInventory": false,
          "HasDataXInventory": false,
          "HasTraderOnlineInventory": false,
          "ExportLeadsTo": "",
          "HasLoginPage": false
      </div>
    );
  }
}

DealerStatusPage.propTypes = {
  dealers: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let cat = { "DealerID": "",
    "DealerName": "",
    "DealerURL": "",
    "CountryCode": "",
    "DealerClassCode": "R",
    "HasUseChat": false,
    "HasLeadXmlExport": false,
    "HasFinanceApps": true,
    "HasMobile": false,
    "HasOnlineCatalog": false,
    "HasOnlineOrders": false,
    "HasCoupons": true,
    "HasGuestBook": false,
    "HasMassEmail": true,
    "HasInvoices": true,
    "HasCallManagement": true,
    "HasEmailManagement": true,
    "HasEmploymentApps": true,
    "HasOEMPromotions": false,
    "HasRentals": false,
    "HasMobile_MobileMaintenanceOptions": false,
    "HasSitemapManager": false,
    "HasBannerBuilder": false,
    "HasSocialMedia": false,
    "HasMigratedToPhoenix": false,
    "HasImChatFee": false,
    "HasCallTrackingFee": false,
    "HasEmailFee": false,
    "HasSocialMediaFee": false,
    "HasRVWSNewsletterFee": false,
    "HasNewsletterTransmissionFee": false,
    "HasOEMPromotionsFee": false,
    "HasRentalsModuleFee": false,
    "HasMultiLocationFee": false,
    "HasFreeSiteFee": false,
    "HasCatalogPackDistributorFee": false,
    "HasCatalogPackPremiumFee": false,
    "HasCatalogPackStandardFee": false,
    "HasCraigslistQuickPlusFee": false,
    "HasCraigslistQuickPlusEbayFee": false,
    "HasDataDistributionFee": false,
    "HasEbayAuctionsClassifiedsFee": false,
    "HasRVABasicFee": false,
    "HasRVUSAFee": false,
    "HasSocialLinkRVFee": false,
    "HasTotalDataDistributionFee": false,
    "HasVideoBrochureFee": false,
    "HasWebsiteFlixFee": false,
    "HasRVWSBronzePowerPakFee": false,
    "HasRVWGoldPowerPakFee": false,
    "HasRVWSPlatinumPowerPakFee": false,
    "HasRVWSSilverPowerPakFee": false,
    "HasFiche": false,
    "HasTestimonials": false,
    "HasLotVantageEbay": false,
    "HasLotVantageCraigsList": false,
    "HasClazRV": false,
    "HasCarSourRV": false,
    "HasOodleRV": false,
    "HasPennySaverRV": false,
    "HasGeebo": false,
    "HasRVandCycleShopper": false,
    "HasRVTraderApi": true,
    "HasCapitalDealerSolutions": false,
    "HasRVUSA": false,
    "HasEbayRV": false,
    "HasCraigsListRV": false,
    "HasJaycoInventory": false,
    "HasKijiji": false,
    "HasAutoTraderCA": false,
    "HasOnDemandInventoryExtract": false,
    "HasKijijiLeadImport": false,
    "HasPSNLeadImport": false,
    "IsDisplayingSharedInventory": false,
    "IsSharingInventory": false,
    "HasDataXInventory": false,
    "HasTraderOnlineInventory": false,
    "ExportLeadsTo": "",
    "HasLoginPage": false
  };
  const dealerId = ownProps.params.id;
  if (state.dealers.length > 0) {
    dealer = Object.assign({}, state.dealers.find(dealer => dealer.id id)
  }
  return {
    dealer: dealer
  };
};

export default connect(mapStateToProps)(DealerStatusPage);