var util = require("./util");
var d3 = require("./d3");
var addLabel = require("./label/add-label");

module.exports = createClusters;

function createClusters(selection, g) {
  var clusters = g.nodes().filter(function(v) { return util.isSubgraph(g, v); });
  var svgClusters = selection.selectAll("g.cluster")
    .data(clusters, function(v) { return v; });

  svgClusters.selectAll("*").remove();
  svgClusters.enter().append("g")
    .attr("class", "cluster")
    .attr("id",function(v){
      var node = g.node(v);
      return node.id;
    })
    .style("opacity", 0);
  
  svgClusters = selection.selectAll("g.cluster");

  util.applyTransition(svgClusters, g)
    .style("opacity", 1);
  //ISSUE: previous diagram clusters are still present
  svgClusters.each(function(v) {
    try {
      var node = g.node(v); // node is undefined if v is from the old diagram cluster
      var thisGroup = d3.select(this);
      d3.select(this).append("rect");
      var labelGroup = thisGroup.append("g").attr("class", "label");
      addLabel(labelGroup, node, node.clusterLabelPos);

 } catch (error) {
      //issue clusters still have the old diagram cluster
      //g.node(v) new graph(g) does not know of the old diagram clusters
      //we somehow need to delete the old diagram clusters
      console.log(svgClusters)
      svgClusters.remove(v)
    }
  });

  svgClusters.selectAll("rect").each(function(c) {
    try {
      console.log(c)
      var node = g.node(c);
      var domCluster = d3.select(this);
      util.applyStyle(domCluster, node.style);

    } catch (error) {
      console.log(error)
    }
  });

  var exitSelection;

  if (svgClusters.exit) {
    exitSelection = svgClusters.exit();
  } else {
    exitSelection = svgClusters.selectAll(null); // empty selection
  }

  util.applyTransition(exitSelection, g)
    .style("opacity", 0)
    .remove();

  return svgClusters;
}
