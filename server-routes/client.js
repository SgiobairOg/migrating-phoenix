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

// GET users listing. */
router.get('/', function(req, res) {
  res.send('index.html');
});

module.exports = router;