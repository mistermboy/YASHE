const YASME = require('yasme');
const validateUtils = require('./validateUtils.js');

$(document).ready(function() {
  $('.yashe').prepend(
                $('<div id="myModal" class="modal">').append(
                  $('<div class="modal-content">')
                    .append($('<span class="close">&times;</span>'))
                    .append($('<div id="loader" class="loaderCont"><div class="loader"></div></div>'))
                    .append($('<div id="modalContent">')
                      .append($('<div id="shapeMap">')))
                  
                
                )
              )


$('#loader').hide();

var yasme = YASME(document.getElementById('shapeMap'),
{
  lineNumbers:true,
});



$('#modalContent')
.append($('<button class="validateBtn">Validate</button>')
        .click(()=>validateUtils.validate(yasme)))                 


yasme.setSize(null,100);
yasme.setValue('<https://www.wikidata.org/wiki/Q1>@<human>,\n'+
'<https://www.wikidata.org/wiki/Q2>@<mal>,\n'+
'<https://www.wikidata.org/wiki/Q3>@<human>,\n'+
'<https://www.wikidata.org/wiki/Q4>@start');

yasme.refresh();

var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


module.exports = {
  yasme:yasme
}

})
