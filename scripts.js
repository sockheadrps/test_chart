function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setInterval() {
    for (let i = 0; i < 6; i++) {
        updateData(i)
        await sleep(1000);
        if (i > 4){
            i = 0;
        }
    }
}

setInterval();




// Chart Objects
let cpuUsageChart = document.getElementById("cpuUsage");

// Common Chart Options (Line)
let commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: "rgba(33,31,51,0.5)",
    borderColor: "rgba(33,31,51,1)",
    fill: true,
    scales: {
      x: {
        color: "black",
        grid: {
            display: false
        },
        ticks: {
            color: "black"
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
            color: "rgba(33,31,51,0.2)"
        },
        ticks: {
            color: "black"
        },
      }
    },
    legend: {display: false},
    tooltips:{
      enabled: false
    }
};


// cpuUsageChart Instance
var cpuUsageChartInstance = new Chart(cpuUsageChart, {
    type: 'line',
    data: {
      datasets: [{
          label: "CPU Usage",
          data: 0,
          borderWidth: 1
      }]
    },
    options: Object.assign({}, commonOptions, {
    responsive: true,
      title:{
        display: true,
        text: "CPU Usage",
        fontSize: 18
      }
    })
});


// Chart configs
let numberElements = 4;

//Globals
let updateCount = 0;

// Function to push data to chart object instances
function addData(data) {

    if(data){
        console.log(updateCount, numberElements, data)

        let today = new Date();
        let time
        if (today.getMinutes < 10){
            time = today.getHours() + ":0" + today.getMinutes();
        }else{
            time = today.getHours() + ":" + today.getMinutes();
        }
        // CPU Usage
        cpuUsageChartInstance.data.labels.push(time);
        cpuUsageChartInstance.data.datasets.forEach((dataset) =>{dataset.data.push(data)});

      if(updateCount > numberElements){
        console.log(updateCount)
        // For shifting the x axis markers
        // CPU Usage
        cpuUsageChartInstance.data.labels.splice(0, numberElements + 3);
        cpuUsageChartInstance.data.datasets[0].data.splice(0, numberElements + 3);
        console.log(cpuUsageChartInstance.data.datasets[0].data)
        console.log(cpuUsageChartInstance.data.datasets[0].data)
        updateCount=0;

        
      }else{
        updateCount++
        console.log('up count greater than num elms')
        cpuUsageChartInstance.update();
      }
    }
      
  };

  // Update HTML elements
function updateData(data) {
    addData(data)
}
updateData()