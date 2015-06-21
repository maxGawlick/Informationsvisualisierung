var express = require('express');
var router = express.Router();

/*
 * GET data.
 */
router.get('/springer', function(req, res) {
    var dbSpringer = req.dbSpringer;
    var collection = dbSpringer.get('2006');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
    
});

router.get('/springer2007', function(req, res) {
    var dbSpringer = req.dbSpringer;
    var collection = dbSpringer.get('2007');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;
