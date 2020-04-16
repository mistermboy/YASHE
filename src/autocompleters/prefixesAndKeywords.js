"use strict";
var $ = require("jquery")
var yashe = require('../main.js')
var Trie = require('../../lib/trie.js')
var rdfUtils = require('../utils/rdfUtils.js')

module.exports = function(yashe, name) {

  
  return {
    isValidCompletionPosition: function() {
      return module.exports.isValidCompletionPosition(yashe);
    },
    get: function(token) {


      var cur = yashe.getCursor();
      let posibles = yashe.getTokenAt(cur).state.possibleNext;
      let matches = [];
      Object.keys(KEYWORDS).forEach(k => {
        if(posibles.indexOf(KEYWORDS[k].toUpperCase())>=0){
          matches.push(KEYWORDS[k])
        }
      });

      let prefixes = rdfUtils.namespaceShortCuts;
      let wikiPrefixes = '';
      Object.keys(prefixes).forEach(p => {
          wikiPrefixes+='PREFIX '+p+': <'+prefixes[p]+'>\n';
      });
      
      matches.push('wikidata-prefixes');

      var trie = new Trie()
      Object.keys(matches).forEach(m => {
        wikiPrefixes+='PREFIX '+p+': <'+matches[m]+'>\n';
      });

    

     var completions = trie.autoComplete(token.toLowerCase())
     console.log(completions)
     var final = []
     var list={}
     for(var c in completions){

        var text = completions[c]
        var displayText = completions[c]

        if(!module.exports.isInPrefixList(completions[c])){
          text = text.toUpperCase()
        }

        if(completions[c]=='wikidata-prefixes'){
          text = wikiPrefixes;
        }

        list =  {
          text: text,
          displayText: displayText
        } 

        final.push(list)
      }
    

      return final

    },
    async: false,
    bulk: false,
    autoShow: false
  };
};

module.exports.isValidCompletionPosition = function(yashe) {
  module.exports.PREFIXES = yashe.getDefinedPrefixes();
  return true
};



module.exports.isInPrefixList = function(completion){

  for(var prefix in module.exports.PREFIXES){
      if(completion == prefix+":")return true
  }
  return false

}

module.exports.PREFIXES = []

var KEYWORDS = [
  'base',
  'prefix',
  'import',
  'external',
  'or',
  'and',
  'not"',
  'iri',
  'bnode',
  'literal',
  'nonliteral',
  'length',
  'minlength',
  'maxlength',
  'mininclusive',
  'minexclusive',
  'maxinclusive',
  'maxexclusive',
  'totaldigits',
  'fractiondigits',
  'closed',
  'extra'
  ]