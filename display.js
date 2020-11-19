let chartScriptLoaded = false;

var charterJet;

let headLineMonth = "";
let monatsNamen = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
let data;

let dataAbends = [];
let dataMorgens = [];

let displayYear;
let displayMonth;

function displayChart() {
    console.log("chartshow");
    if (chartScriptLoaded == false) {
        $.loadScript('./include/chart.js/Chart.js', function () {
            console.log("start");
            chartScriptLoaded = true;

            //=============================================================
            let json = JSON.parse(localStorage.getItem("flow-seperation"));

            data = {};
            for (let key of Object.keys(json)) {
                let tmp = key.split(".");
                let year = tmp[2];
                let month = tmp[1];

                if (data[year] != undefined) {
                    if (data[year][month] != undefined) {
                        data[year][month].push({
                            value: json[key],
                            date: key
                        });
                    } else {
                        data[year][month] = [];
                        data[year][month].push({
                            value: json[key],
                            date: key
                        });
                    }
                } else {
                    data[year] = {};
                    data[year][month] = [];
                    data[year][month].push({
                        value: json[key],
                        date: key
                    });
                }
                console.log(data);
            }

            let date = new Date();

            let currentMonth = data[date.getFullYear()][date.getMonth() + 1];

            displayYear = date.getFullYear();
            displayMonth = Object.keys(data[displayYear]).indexOf(((date.getMonth + 1 < 10) ? "0" : "") + (date.getMonth() + 1).toString());
            console.log(Object.keys(data[displayYear]));
            console.log(displayMonth);

            console.log(data);


            for (let day of currentMonth) {
                if (day.value.abend == undefined || day.value.abend == null) {
                    day.value.abend = day.value.morgen;
                }

                if (day.value.morgen == undefined || day.value.morgen == null) {
                    day.value.morgen = day.value.abend;
                }

                dataAbends.push(day.value.abend);
                dataMorgens.push(day.value.morgen);
            }

            headLineMonth = monatsNamen[currentMonth[0].date.split(".")[1] - 1] + " " + displayYear;

            let yData = [];

            dataAbends.forEach(point => {
                yData.push("");
            });

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
                        position: 'bottom',
                        labels: {
                            fontColor: "white"
                        }
                    },
                    tooltips: {
                        enabled: false
                    },
                    title: {
                        display: true,
                        text: headLineMonth,
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

function displayPreviouseMonth() {
    console.log("prev");

    let schlussel = Object.keys(data[displayYear]);
    console.log(schlussel);
    let previouse = null;

    for (let i = 0; i < schlussel.length; i++) {
        if (data[displayYear][schlussel[i]] != undefined) {
            console.log(schlussel[i]);
            console.log(schlussel[displayMonth]);

            if (previouse == null) {
                previouse = i;
            } else {
                if (parseInt(previouse) == parseInt(displayMonth) && parseInt(schlussel[i]) < parseInt(schlussel[displayMonth])) {
                    previouse = i;
                } else {
                    if (parseInt(schlussel[previouse]) > parseInt(schlussel[displayMonth]) && parseInt(schlussel[i]) < parseInt(schlussel[displayMonth])) {
                        previouse = i;
                    } else {
                        if (parseInt(schlussel[i]) < parseInt(schlussel[displayMonth]) && parseInt(schlussel[i]) > parseInt(schlussel[previouse])) {
                            previouse = i;
                        }
                    }
                }
            }
        }
    }

    let currentMonth = data[displayYear][schlussel[previouse]];
    displayMonth = previouse;


    dataAbends = [];
    dataMorgens = [];
    for (let day of currentMonth) {
        if (day.value.abend == undefined || day.value.abend == null) {
            day.value.abend = day.value.morgen;
        }

        if (day.value.morgen == undefined || day.value.morgen == null) {
            day.value.morgen = day.value.abend;
        }

        dataAbends.push(day.value.abend);
        dataMorgens.push(day.value.morgen);
    }

    headLineMonth = monatsNamen[currentMonth[0].date.split(".")[1] - 1] + " " + displayYear;

    let yData = [];

    dataAbends.forEach(point => {
        yData.push("");
    });

    let options = charterJet.config;

    options.data.datasets[0].data = dataMorgens;
    options.data.datasets[1].data = dataAbends;
    options.data.labels = yData;
    options.options.scales.yAxes[0].ticks.maxTicksLimit = dataAbends.length;
    options.options.scales.xAxes[0].ticks.maxTicksLimit = dataAbends.length;
    options.options.title.text = headLineMonth;

    charterJet.update(options);
}

function displayNextMonth() {
    console.log("next");
}

function saveChart() {
    console.log("save");
    // document.getElementById("outputChart").toBlob((blob) => {
    //     saveAs("chart.png");;
    // });
    let b64 = charterJet.toBase64Image();
    let a = document.createElement("a");
    a.href = b64;
    a.download = "chart.png";
    a.click();
}