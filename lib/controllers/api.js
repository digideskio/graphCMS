'use strict';

var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');

exports.search = function(req, res) {

    console.log(req.body.titleTerms);
    console.log(req.body.descTerms);

    var titleTerms = req.body.titleTerms;
    var descTerms = req.body.descTerms;

    var titleClause = '1 <> 1';
    var descClause  = '1 <> 1';

    if (titleTerms != '"(.*.*)"' ) {
        titleClause = "n.title =~ " + titleTerms + " ";
    }

    if (descTerms != '"(.*.*)"' ) {
        descClause = "n.description =~ " + descTerms + " ";
    }



    db.cypherQuery("START n = node(*) " +
        "WHERE " + titleClause + " OR " + descClause + " " +
        "RETURN n;", function(err, result){
        if(err) throw err;

        console.log(result.data); // delivers an array of query results
        console.log(result.columns); // delivers an array of names of objects getting returned

        res.json({
            result: result.data
        })
    });
};

exports.all = function(req, res) {

    db.cypherQuery("MATCH n RETURN n", function(err, result){
        if(err) throw err;

        console.log(result.data); // delivers an array of query results
        console.log(result.columns); // delivers an array of names of objects getting returned

        res.json({
            result: result.data
        })
    });
};

exports.save = function(req, res) {

    db.insertNode({
        title: req.body.title,
        description: req.body.description
    },function(err, node){
        if(err) throw err;

        // Output node properties.
        console.log(node);

        // Output node id.
        console.log(node._id); /* for 2.0.0-RC6, use: console.log(node._id) */
    });

    res.json ({
        "message": "Allet jut"
    });
};

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};