//jQuery
window.$ = window.jQuery = require('jquery');

//SystemInformation
const si = require('systeminformation');

//ChartJS
const Chart = require('chart.js');

const CpuChartOptions = {
    legend: {
        display: true
    }, 
    scales: {
        xAxes: [{
            ticks: {
                type: 'linear',
                max: 60,
                min: 0,
                beginAtZero: true
            }
        }],
        yAxes: [{
            ticks: {
                type: 'linear',
                max: 100,
                min: 0,
                beginAtZero: true
            }
        }]
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 0
    },
    hover: {
        animationDuration: 0
    },
    responsiveAnimationDuration: 0
};

var cpu_nbcores;
var cpu_labels;
var ctx;
var BarCpu;
var ChartCpuLine;

var CpuCounter = 0;

function updateData() {
    si.currentLoad().then(data => {
        //cpuUsage[60] = [];
        

        /*jQuery.each(data["cpus"], function() {
            cpuUsage[CpuCounter].push(this["load"]);
        });*/
        for (let i = 0; i < data.cpus.length; i++) {
            cpuUsage[i][CpuCounter] = Math.round(data["cpus"][i].load);
            //console.log(data["cpus"][i].load);
        }

        //console.log(cpuUsage);

        CpuCounter++;
        if (CpuCounter >= 60) {
            CpuCounter = 0;
        }
        //console.log(cpuUsage);
        /*BarCpu.data.datasets[0] = {
            backgroundColor: "rgba(255,0,0,0.5)",
            borderColor: "rgba(255,0,0,1)",
            borderWidth: 1,
            data: cpuUsage,
            label: "cpu"
        };*/
        //BarCpu.update();

        if (typeof cpuUsage !== 'undefined') {
            for (let i = 0; i <data.cpus.length; i++) {
                ChartCpuLine.data.datasets[i] = {
                    data: cpuUsage[i],
                    label: "cpu"
                }
            }
            console.log(cpuUsage[0]);
        }

        ChartCpuLine.update();
        
    });
}

function init() {
    si.cpu()
        .then(data => {
            cpu_labels = new Array(data.cores);

            for (let i = 0; i < cpu_nbcores; i++) {
                cpu_labels[i] = "core " + i;
            }

            console.log(cpu_labels);

            ctx = document.getElementById("cpubarid").getContext("2d");
            /*BarCpu = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: cpu_labels,
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
            });*/
            ChartCpuLine = new Chart(ctx, {
                type: "line",
                data: [],
                options: CpuChartOptions
            })

            cpuUsage = createArray(data.cores, 60);
            for (let i = 0; i < data.cores; i++) {
                for (let j = 0; j < 60; j++) {
                    cpuUsage[i][j] = 0;
                }
            }
            console.log(cpuUsage);
            setInterval(updateData, 1000);
            //updateData();
        })
    
    
    $(".text").html("");
}

//createArray();     // [] or new Array()

//createArray(2);    // new Array(2)

//createArray(3, 2); // [new Array(2),
                   //  new Array(2),
                   //  new Array(2)]
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

init();
//updateData();