(function(){
  goog.require('goog.cssom');
  goog.require('Blockly.Css');
  var cssContent = [
    ".main {",
    "  height: 500px;",
    "  width: 500px;",
    "}",
    "",
    "button {",
    "  border-radius: 4px;",
    "  padding: 2em;",
    "}"
  ].join('\n');

  Blockly.Css.inject = function(){
    goog.cssom.addCssText(cssContent);
  };
})();