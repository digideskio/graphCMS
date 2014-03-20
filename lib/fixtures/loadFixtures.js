'use strict';

var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');
var csv = require('require-csv');
var data = require('./data.csv');

console.log("Gelesenes CSV:\n\n", data);


module.exports.fixtures = function() {

    console.log('Writing database fixtures...');

    for ( var i = 0; i < data.length - 1; i++) {

        var labels = data[i][4].split(',');
        var labels = labels.join(':');

        db.cypherQuery("CREATE (n:" + labels + " { title: '" + data[i][0] + "', description: '" + data[i][1] + "'})", function(err, result){
            if(err) throw err;

            console.log(result.data); // delivers an array of query results
            console.log(result.columns); // delivers an array of names of objects getting returned

        });
    }

}();

