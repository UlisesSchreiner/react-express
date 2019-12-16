function CreateGenericChart(type, canvas, lavelsArr, valuesArr, colorsArr, eventScale, Descriptext) {
    //var ctx= document.getElementById("canvasVisorTres").getContext("2d");
    var ctx = canvas.getContext("2d");
    var myChart= new Chart(ctx,{
      type: type,
    data: {
      labels: lavelsArr,
      datasets: [{
        label: eventScale,
        lineTension: 0.3,
        backgroundColor: colorsArr,
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
      title: {
        display: true,
        text: Descriptext
      }
    }
    });
  }
    