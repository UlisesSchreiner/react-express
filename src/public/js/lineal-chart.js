function CreateLinealChart(canvas, lavelsArr, valuesArr, eventScale) {
  //var ctx= document.getElementById("canvasVisorTres").getContext("2d");
  var ctx = canvas.getContext("2d");
  var myChart= new Chart(ctx,{
    type: 'line',
  data: {
    labels: lavelsArr,
    datasets: [{
      label: eventScale,
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: valuesArr,
      pointRadius: 0
    }],
  },
  options: {
    responsive:true,
    maintainAspectRatio: false,
    
  }
  });
}
  