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
                $('#tableBody').remove();
                $('#modalContent').prepend(
                    $('<table id="tableBody" class="table">').append(
                      $('<thead>').append(
                        $('<tr>').append(
                          $('<th scope="col">Id</th>')
                        ).append(
                          $('<th scope="col">Node</th>')
                        ).append(
                          $('<th scope="col">Shape</th>')
                        )
                      )
                    )
                )
                console.log(data)
                Object.keys(data.shapeMap).map(s=>{
                  var el = data.shapeMap[s];
                  $('#tableBody').append(
                    $('<tr>').append(
                      $('<td>').append($('<a href="'+el.node.substring(1,el.node.length-1)+'">').text(el.node))
                    ).append(
                      $('<td>').text(el.shape)
                    ).append(
                      $('<td>').text(el.status)
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