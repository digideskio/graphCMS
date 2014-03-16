'use strict';

var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');

exports.save = function(req, res) {

    db.insertNode({
        title: req.body.title,
        description: 'No description yet'
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