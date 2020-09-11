//jQuery
window.$ = window.jQuery = require('jquery');

//SystemInformation
const si = require('systeminformation');

//ChartJS
const Chart = require('chart.js');

var cpuUsage = [0,10,20,30,40,50,60,70];

var ctx = document.getElementById("cpubarid").getContext("2d");
var BarCpu = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["1","2","3","4","5","6","7","8"],
        datasets: [{
            label: "cpu #0",
            barPercentage: 0.5,
            barThickness: 6,
            minBarLength: 7,
            data: cpuUsage
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMax: 100,
                    suggestedMin: 0
                }
            }]
        },
        animation: {
            duration: 0
        }
    }
});

function updateData() {
    si.currentLoad().then(data => {
        cpuUsage = [];
        $(".text").html("");
        jQuery.each(data["cpus"], function() {
            //$(".text").append(this["load"] + "<br>");
            cpuUsage.push(this["load"]);
        });

        //console.log(cpuUsage);
        BarCpu.data.datasets[0] = {
            data: cpuUsage
        };
        BarCpu.update();
    });
}

//updateData();
setInterval(updateData, 1000);