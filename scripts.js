// Chart configs
// The number of points along the x-axis we want to maintain.
const X_AXIS_MAX_LENGTH = 4;  
  
// 5 second. For whatever reason the render time takes some extra time.
// 5 seconds appears to work. 1 second does not.
const TIMEOUT = 5000;

// Generates data but this is probably where you want to make your call to
// get the server data.
async function generateData() {
  while(true) {
    // Gets the data from a server? For now it is a random number.
    const data = Math.random() * 10;
    addData(data);
    await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  }
}

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


// Function to push data to chart object instances
function addData(data) {
  if(!data) {
    // Quit early, data is null
    return;
  }

  // Get the date time for the label.
  const today = new Date();
  const hrs = today.getHours().toString();
  const mins = today.getMinutes().toString();
  const secs = today.getSeconds().toString();
  const time =
      `${hrs.padStart(2, '0')}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`;

  // CPU Usage
  // Adding new data
  cpuUsageChartInstance.data.labels.push(time);
  cpuUsageChartInstance.data.datasets.forEach(
      (dataset) =>{dataset.data.push(data)});
  
  // Check if the cpu usage list is longer than the desired length, if it is
  // we should remove the first element by shifting the x axis markers.
  if(cpuUsageChartInstance.data.labels.length > X_AXIS_MAX_LENGTH) {
    cpuUsageChartInstance.data.labels.shift();
    cpuUsageChartInstance.data.datasets.forEach(
      (dataset) =>{dataset.data.shift()});
  }

  // The HTML update call.
  cpuUsageChartInstance.update();
};

// Generates data and calls the add data that is responsible for updating
// the chart.
generateData();
