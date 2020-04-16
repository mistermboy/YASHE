"use strict";
var $ = require("jquery"),
rdfUtils = require('../utils/rdfUtils.js')

module.exports = function(yashe, name) {
  return {
    isValidCompletionPosition: function() {
      return module.exports.isValidCompletionPosition(yashe);
    },
    get: function(token) {
     
        var list =[]
        let prefixes = rdfUtils.namespaceShortCuts;
        let finalText = '';
        Object.keys(prefixes).forEach(p => {
            finalText+='PREFIX '+p+': <'+prefixes[p]+'>\n';
        });
        list = [ {
        text: finalText,
        displayText: 'wikidata-prefixes'
        } ];
        return list;
        
    },
    async: false,
    bulk: false,
    autoShow: false
  };
};


module.exports.isValidCompletionPosition = function(yashe) {
  return true;
};
