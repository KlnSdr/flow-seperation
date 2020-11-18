let chartScriptLoaded = false;

var charterJet;

function displayChart() {
    console.log("chartshow");
    if (chartScriptLoaded == false) {
        $.loadScript('./include/chart.js/Chart.js', function () {
            console.log("start");
            chartScriptLoaded = true;

            //=============================================================
            let dataAbends = [600,
                600,
                625,
                600,
                600,
                800,
                650,
                800,
                790,
                800,
                800,
                800,
                800,
                800,
                800,
                800,
                650,
                650,
                600,
                600,
                650,
                800,
                700,
                750,
                650,
                700,
                650,
                600,
                600,
                650,
                800,
                800,
                800,
                800,
                700,
                800,
                700,
                800,
                800,
                800,
                800,
                700,
                700,
                800,
                700,
                700,
                800,
                800
            ];
            let dataMorgens = [650,
                800,
                700,
                800,
                800,
                800,
                800,
                700,
                800,
                700,
                800,
                800,
                800,
                800,
                800,
                800,
                800,
                700,
                800,
                800,
                700,
                700,
                650,
                780,
                790,
                680,
                790,
                700,
                700,
                800,
                800,
                700,
                680,
                750,
                650,
                800,
                650,
                800,
                800,
                800,
                800,
                800,
                650,
                700,
                700,
                700,
                800,
                800
            ];
            let yData = [];

            dataAbends.forEach(point => {yData.push("");});
            charterJet = new Chart(document.getElementById('outputChart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: yData,
                    datasets: [{
                        data: dataMorgens,
                        borderWidth: 2,
                        label: "Morgens",
                        backgroundColor: function (context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];
                            // return value < 0 ? 'red' :  // draw negative values in red
                            //     index % 2 ? 'blue' :    // else, alternate values in blue and green
                            //     'green';
                            return 'rgba(252, 157, 3, 0)';
                        },
                        borderColor: function (context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];
                            // return value < 0 ? 'red' :  // draw negative values in red
                            //     index % 2 ? 'blue' :    // else, alternate values in blue and green
                            //     'green';
                            return 'rgba(252, 157, 3, 255)';
                        }
                    }, {
                        data: dataAbends,
                        borderWidth: 2,
                        label: "Abends",
                        backgroundColor: [
                            'rgba(0, 0, 0, 0)'
                        ],
                        borderColor: function (context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];
                            // return value < 0 ? 'red' :  // draw negative values in red
                            //     index % 2 ? 'blue' :    // else, alternate values in blue and green
                            //     'green';
                            return 'rgba(26, 160, 232, 255)';
                        }
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontColor: "#ffffff",
                                maxTicksLimit: dataAbends.length,
                                min: 500,
                                max: 900
                            },
                            gridLines: {
                                color: "#ffffff22"
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: dataAbends.length
                            },
                            gridLines: {
                                color: "#0000"
                            }

                        }]
                    },
                    legend: {
                        position: 'bottom'
                    },
                    tooltips: {
                        enabled: false
                    },
                    title: {
                        display: true,
                        text: "Oktober",
                        fontColor: "white"
                    },
                    animation: {
                        duration: 1000
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                },
            });
            //=============================================================
        });
    } else {
        let options = charterJet.config;
        charterJet.destroy();
        charterJet = new Chart(document.getElementById('outputChart').getContext('2d'), options);
    }
}