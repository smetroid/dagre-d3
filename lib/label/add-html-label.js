var util = require("../util");

module.exports = addHtmlLabel;

function addHtmlLabel(root, node) {
  console.log(root)
  console.log(node)
  var fo = root
    .append("foreignObject")
    .attr("width", "100000");

  var div = fo
    .append("xhtml:div");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  div.attr("class", "htmlLabel");

  var label = node.label;
  switch(typeof label) {
  case "function":
    div.insert(label);
    break;
  case "object":
    // Currently we assume this is a DOM object.
    div.insert(function() { return label; });
    break;
  default: div.html(label);
  }

  util.applyStyle(div, node.labelStyle);
  div.style("display", "inline-block");
  // Fix for firefox
  div.style("white-space", "nowrap");

  var client = div.node().getBoundingClientRect();
  console.log(client)
  fo
    // This makes the width of the foreighObject wider
    .attr("width", client.width)
    // This enlogates the rectangle
    .attr("height", client.height); 

  return fo;
}
