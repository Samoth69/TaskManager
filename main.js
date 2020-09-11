//jQuery
window.$ = window.jQuery = require('jquery');

//SystemInformation
const si = require('systeminformation');
 
// promises style - new since version 3
/*
si.mem()
  .then(data => console.log(data))
  .catch(error => console.error(error));

si.cpuTemperature()
  .then(data => console.log(data))
  .catch(error => console.error(error));

si.currentLoad()
  .then(data => console.log(data))
  .catch(error => console.error(error));

si.graphics()
  .then(data => console.log(data))
  .catch(error => console.error(error));

si.networkStats()
  .then(data => console.log(data))
  .catch(error => console.error(error));
  */

function updateData() {
    si.currentLoad().then(data => {
        $(".text").html("");
        //console.log(data);
        jQuery.each(data["cpus"], function() {
            //console.log(this);
            $(".text").append(this["load"] + "<br>");
        });

        
    });
}

//updateData();
setInterval(updateData, 1000);