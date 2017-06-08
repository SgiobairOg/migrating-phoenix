/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 6/8/17.
 *
 * No license is granted for this project.
 */
const
  express = require('express'),
  router = express.Router();

/*
 * GET dealerlist.
 */
router.get('/dealers', function(req, res) {
  res.json({message: 'Dealers List'});
});

/*
 * GET featurelist.
 */
router.get('/features', function(req, res) {
  res.json({message: 'Features List'});
});

module.exports = router;