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
      var posibles = yashe.getTokenAt(cur).state.possibleNext;
      console.log(posibles)
      var matches = [];
      Object.keys(KEYWORDS).forEach(k => {
        if(posibles.indexOf(KEYWORDS[k].toUpperCase())>=0){
          matches.push(KEYWORDS[k])
        }
      });

      if(posibles.indexOf('PNAME_NS')){
        var prefixes = module.exports.PREFIXES
        Object.keys(prefixes).forEach(p => {
          matches.push(p+':');
        })
      }
      

      var prefixes = rdfUtils.namespaceShortCuts;
      var wikiPrefixes = '';
      Object.keys(prefixes).forEach(p => {
          wikiPrefixes+='PREFIX '+p+': <'+prefixes[p]+'>\n';
      });
      
      matches.push('wikidata-prefixes');

      var trie = new Trie()
      Object.keys(matches).forEach(m => {
          trie.insert(matches[m]);
      });

    

     var completions = trie.autoComplete(token.toLowerCase())

     var final = []
     var list={}
     for(var c in completions){

        var text = completions[c]
        var displayText = completions[c]

        console.log(module.exports.isInPrefixList(completions[c]))
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