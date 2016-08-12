'use strict';

var request = require('request');
var config = require('../../config/configuration.js');

//----------------------------------------------------------
//					Organisation
//----------------------------------------------------------

var getOrgs = function (callback) {
    console.log('get_orgs, ,', (new Date()).toString());
    var org = config.org;
    if (org == undefined || org == null) {
        console.error("GHORG must be set as an env var (e.g.: GHORG=adobe)");
    }
    var options = {
        url: 'https://raw.githubusercontent.com/' + org + '/' + org.toLowerCase() + '.github.com/master/data/org.json',
        headers: {
            'User-Agent': 'server.adobe.com'
        }
    };

    request(options, function (err, res, obj) {
        if (!err && res.statusCode == 200) {
            var info = JSON.parse(obj);
            callback(info);
        } else {
            config.errorLog(options.url, res, err);
        }
    });
};

module.exports = {
    getOrgs: getOrgs
}