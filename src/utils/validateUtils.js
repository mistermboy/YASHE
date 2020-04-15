const axios = require('axios');

var params2Form = function(params) {
    let formData = new FormData()
    Object.keys(params).forEach(key => {
        formData.append(key,params[key])
    });
    
    return formData;
}



var validate = function(yasme){
  $('#loader').show();
  $('#modalContent').hide();

 
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
                      '</table>'+
                    '<div>')
                )
              
                Object.keys(data.shapeMap).map(s=>{
                  var el = data.shapeMap[s];
                  let succces = 'table-err';
                  if(el.status == 'conformant')succces = 'table-success';
                  $('#table').append(
                    $('<tbody>')
                    .append(
                      $('<tr class='+succces+'>').append(
                        $('<td>').text(s)
                      ).append(
                        $('<td>').append($('<a href="'+el.node.substring(1,el.node.length-1)+'">').text(el.node))
                      ).append(
                        $('<td>').text(el.shape)
                      ).append(
                        $('<td>').text(el.status)
                      )
                    )
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
                console.log(error);
            });


 
}

module.exports = {
    validate:validate
}