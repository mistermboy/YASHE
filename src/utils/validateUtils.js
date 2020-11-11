const axios = require('axios');

var params2Form = function(params) {
    let formData = new FormData()
    Object.keys(params).forEach(key => {
        formData.append(key,params[key])
    });
    
    return formData;
}

//Labra's code modified to jquery
var showQualify = function(node, prefix) {
    const relativeBaseRegex = /^<internal:\/\/base\/(.*)>$/g;
    const matchBase = relativeBaseRegex.exec(node);
    if (matchBase) {
        const rawNode = matchBase[1];
        return "<" + rawNode + ">";
    } else {
        const iriRegexp = /^<(.*)>$/g;
        const matchIri = iriRegexp.exec(node);
        if (matchIri) {
            const rawNode = matchIri[1];
            const longNode = "<" + rawNode + ">";
            for (const key in prefix) {
                if (rawNode.startsWith(prefix[key])) {
                    const localName = rawNode.slice(prefix[key].length);
                    return $('<abbr title='+longNode+key+'>').text(':' + localName);
                }
            }

            return $('<a href='+rawNode+'>').text(longNode);
        }
    
        if (node && node.match(/^[0-9"'_]/)) return node;
        console.error("Unknown format for node: " + node);
        return node;
    }
}



var validate = function(yasme){
  $('#loader').show();
  $('#modalContent').hide();
  $('#alertValidate').remove();
 
  let schemaContent = yashe.getValue();
  let shapeMapContent = yasme.getValue();
  
  var params ={
  "activeTab": "#dataTextArea",
  "dataFormat": "TURTLE",
  "data": "",
  "dataFormatTextArea": "TURTLE",
  "activeSchemaTab": "#schemaTextArea",
  "schemaEmbedded": false,
  "schemaFormat": "ShExC",
  "schema": schemaContent,
  "schemaFormatTextArea": "ShExC",
  "shapeMapActiveTab": "#shapeMapTextArea",
  "shapeMapFormat": "Compact",
  "shapeMap": shapeMapContent,
  "shapeMapFormatTextArea": "Compact",
  "schemaEngine": "ShEx",
  "triggerMode": "shapeMap",
}

let formData = params2Form(params);

  $.ajax({
    url: 'https://rdfshape.weso.es:8080/api/schema/validate',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data){
      $('#table').remove();
                $('#modalContent').prepend(
                  $('<div class="table-responsive">'+
                      '<table id="table" class="table table-striped">'+ 
                        '<thead id="thead" class="thead-dark">'+ 
                          '<tr>'+ 
                            '<th scope="col">Id</th>'+ 
                            '<th scope="col">Node</th>'+ 
                            '<th scope="col">Shape</th>'+ 
                            '<th scope="col">Details</th>'+ 
                          '</tr>'+ 
                        '</thead>'+ 
                        '<tbody id="tBody"/>'+
                      '</table>'+
                    '<div>')
                )
              
                Object.keys(data.shapeMap).map(s=>{
                  var el = data.shapeMap[s];
                  let succces = 'table-err';
                  if(el.status == 'conformant')succces = 'table-success';

                  let id = $('<td>').text(s);
                  let node = $('<td>').append(showQualify(el.node,data.nodesPrefixMap));
                  let shape = showQualify(el.shape,data.shapesPrefixMap);
                  let details = $('<td>').append($('<details><pre>').text(el.reason));
                  if(typeof shape == 'object'){
                    shape = $('<td>').append(shape);
                  }else{
                    shape = $('<td>').text(shape);
                  }
                

                  $('#tBody')
                    .append(
                      $('<tr class='+succces+'>')
                      .append(id)
                      .append(node)
                      .append(shape)
                      .append(details)
                    ) 
                })

                setTimeout(() => {
                  $('#loader').hide();
                  $('#modalContent').show();  
                }, 500);
    }
});

/* 
    axios({
            method: 'post',
            url: 'http://rdfshape.weso.es:8080/api/schema/validate',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => response.data)
            .then((data) => {

                $('#table').remove();
                $('#modalContent').prepend(
                  $('<div class="table-responsive">'+
                      '<table id="table" class="table table-striped">'+ 
                        '<thead id="thead" class="thead-dark">'+ 
                          '<tr>'+ 
                            '<th scope="col">Id</th>'+ 
                            '<th scope="col">Node</th>'+ 
                            '<th scope="col">Shape</th>'+ 
                            '<th scope="col">Details</th>'+ 
                          '</tr>'+ 
                        '</thead>'+ 
                        '<tbody id="tBody"/>'+
                      '</table>'+
                    '<div>')
                )
              
                Object.keys(data.shapeMap).map(s=>{
                  var el = data.shapeMap[s];
                  let succces = 'table-err';
                  if(el.status == 'conformant')succces = 'table-success';

                  let id = $('<td>').text(s);
                  let node = $('<td>').append(showQualify(el.node,data.nodesPrefixMap));
                  let shape = showQualify(el.shape,data.shapesPrefixMap);
                  let details = $('<td>').append($('<details><pre>').text(el.reason));
                  if(typeof shape == 'object'){
                    shape = $('<td>').append(shape);
                  }else{
                    shape = $('<td>').text(shape);
                  }
                

                  $('#tBody')
                    .append(
                      $('<tr class='+succces+'>')
                      .append(id)
                      .append(node)
                      .append(shape)
                      .append(details)
                    ) 
                })

                setTimeout(() => {
                  $('#loader').hide();
                  $('#modalContent').show();  
                }, 500);
                
            })
            .catch(function (error) {
                $('#loader').hide();
                $('#modalContent').show();  
                console.log('Error doing server request');
                $('#modalContent').prepend(
                  $('<div id="alertValidate" class="alert">').text('Something went wrong')
                )
            }); */


 
}

module.exports = {
    validate:validate
}