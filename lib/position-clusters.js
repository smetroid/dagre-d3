"use strict";

var util = require("./util");
var d3 = require("./d3");

module.exports = positionClusters;

function positionClusters(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });

  function translate(v) {
    try {
      var node = g.node(v);
      return "translate(" + node.x + "," + node.y + ")";
    } catch (error) {
      console.log(error)
    }
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g)
    .style("opacity", 1)
    .attr("transform", translate);

  try {
    util.applyTransition(created.selectAll("rect"), g)
      .attr("width", function(v) { return g.node(v).width; })
      //this creates a higher cluster 
      //this is what is needed to fit the html label
      .attr("height", function(v) { return g.node(v).height; })
      .attr("x", function(v) {
        var node = g.node(v);
        return -node.width / 2;
      })
      .attr("y", function(v) {
        var node = g.node(v);
        //return (-node.height) / 2;
        //seems to move the rectangle cluster down
        return (-node.height) / 2;
      });

  } catch (error) {
    console.log(error)
  }
}
