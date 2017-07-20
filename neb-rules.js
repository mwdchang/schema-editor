define("NebRules", [], function(require, exports, module) {
  "use strict";

  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;


  const NebRules = function(x) {

     // Lifted from mode-java - should be good enough
     const identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";

     const controlled = [
       'study',
       'classes',
       'models'
     ];

     const controlled2 = [
       'demo',
     ];


     const keywordMapper = this.createKeywordMapper({
       'neb_controlled': controlled.join('|'),
       'neb_controlled2': controlled2.join('|')
     }, 'identifier');


     this.setKeywords = function(kwMap) {
       this.keywordRule.onMatch = this.createKeywordMapper(kwMap, "identifier")
     }

     this.keywordRule = {
       regex : "\\w+",
       onMatch : function() {return "text"}
     }

     this.$rules = {
       "start" : [
           // this.keywordRule,
           {
             token: 'neb_comment',
             regex: /#.*$/
           },
           {
             token: 'neb_enum',
             regex: /\benum:\|.*\|\b/
           },
           {
             token: keywordMapper,
             regex: identifierRe
             // regex : "\\w+",
             // onMatch : function() {return "text"}
             // regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
           }
       ]
     };
     this.normalizeRules()
  };

  oop.inherits(NebRules, TextHighlightRules);

  exports.NebRules = NebRules;

});
