var addTextLabel = require("./add-text-label");
var addHtmlLabel = require("./add-html-label");
var addSVGLabel  = require("./add-svg-label");

module.exports = addLabel;

function addLabel(root, node, location) {
  var label = node.label;
  var labelSvg = root.append("g");

  // Allow the label to be a string, a function that returns a DOM element, or
  // a DOM element itself.
  if (node.labelType === "svg") {
    addSVGLabel(labelSvg, node);
  } else if (typeof label !== "string" || node.labelType === "html") {
    addHtmlLabel(labelSvg, node);
  } else {
    addTextLabel(labelSvg, node);
  }

  var labelBBox = labelSvg.node().getBBox();
  // console.log("label");
  // console.log(labelSvg.node().getBBox());
  // console.log(location)
  var y;
  var x;
  switch(location) {
  case "top":
    //moves label or html label outside the cluster
    //the issue is the hight of the html label
    //and it changes based on text or html label
    y = ((-node.height) / 2);
    //y = ((-node.height) / 2);
    x = (-labelBBox.width / 2);
    break;
  case "topLeft":  
    y = ((-node.height) / 2);
    x = (-labelBBox.width);
    break;
  case "bottom":
    y = (node.height / 2) - labelBBox.height;
    x = (-labelBBox.width / 2);
    break;
  default:
    y = (-labelBBox.height / 2);
    x = (-labelBBox.width / 2);
  }
  labelSvg.attr(
    "transform",
    "translate(" + x + "," + y + ")");

  return labelSvg;
}
