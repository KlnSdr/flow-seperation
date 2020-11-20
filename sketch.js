function startup() {
    jQuery.loadScript = function (url, callback) {
        jQuery.ajax({
            url: url,
            dataType: 'script',
            success: callback,
            async: true
        });
    }

    if (localStorage.getItem("flow-seperation") == undefined) {
        alert("empty");
    } else {
        alert(localStorage.getItem("flow-seperation"));
    }

    window.addEventListener("resize", adjustHeight, false);
    adjustHeight();

    let date = new Date();
    document.getElementById("outputDatum").innerText = date.getDate() + "." + (parseInt(date.getMonth()) + 1) + "." + date.getFullYear();

    switchTo("mainMenu");
    // switchTo("addValue");
    //switchTo("displayChart", displayChart);
}

function adjustHeight() {
    let width = 0;
    for (let bttn of document.getElementsByClassName("mainMenuButton")) {
        if (bttn.offsetWidth > 0) {
            width = bttn.offsetWidth;
            break;
        }
    }

    $('.mainMenuButton').css({
        'height': width + 'px'
    });

    // if (document.getElementsByName("p5Canvas").length > 0) {
    //     resizeCanvas(windowWidth - 20, 200);
    // }
}

function switchTo(target, callback = () => {}) {
    console.log(target);
    for (div of $('.content')) {
        div.classList = "hidden";
    }

    document.getElementById(target).classList = "content" + ((target == "displayChart") ? " chartDiv" : "");

    document.getElementById("homebutton").classList = (target == "mainMenu") ? document.getElementById("homebutton").classList + " hidden" : (document.getElementById("homebutton").className).replace("hidden", "");
    callback();
}

function valueInputChanged() {
    let colours = ["red", "yellow", "#0f0"];
    let value = document.getElementById("inputValue").value;
    if (value < 740) {
        if (value < 700) {
            document.getElementById("indicator").style.backgroundColor = colours[0];
        } else {
            document.getElementById("indicator").style.backgroundColor = colours[1];
        }
    } else {
        document.getElementById("indicator").style.backgroundColor = colours[2];
    }
}

function saveValue() {
    let value = document.getElementById("inputValue").value.replace(/ /g, "");
    if (value != "") {
        let db = localStorage.getItem("flow-seperation");
        //======================================================
        let date = new Date();

        let morning = false;

        let nextDay = parseInt(date.getHours()) <= 3;

        if (parseInt(date.getHours()) >= 18 || nextDay == true) {
            morning = false;
        } else {
            morning = true;
        }

        let datum = "";

        let day = (morning == false && nextDay) ? (parseInt(date.getDate()) - 1).toString() : date.getDate();
        let month =
            (parseInt(date.getMonth()) + ((nextDay == true && day == "0") ? 0 : 1)).toString();

        let year = parseInt(date.getFullYear());
        if (day == "0") {
            switch (month) {
                case "1":
                case "3":
                case "5":
                case "7":
                case "8":
                case "10":
                    day = "31";
                    break;

                case "4":
                case "6":
                case "9":
                case "11":
                    day = "30";
                    break;

                case "2":
                    //ist das Jahr ein Schaltjahr?
                    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                        day = "29";
                    } else {
                        day = "28";
                    }
                    break;

                case "0":
                    day = "31";
                    break;
            }
        }

        if (month == "0") {
            year -= 1;
            month = "12";
        }

        console.log(day);
        console.log(month);
        console.log(year);

        datum = ((day.length == 1) ? "0" : "") + day + "." + ((month.length == 1) ? "0" : "") + month + "." + year;

        console.log(datum);
        //======================================================

        if (db != undefined) {
            db = JSON.parse(db);
            if (morning == true) {
                db[datum] = {
                    morgen: value
                };
            } else {
                if (db[datum] != undefined) {
                    db[datum]["abend"] = value;
                } else {
                    db[datum] = {
                        morgen: null,
                        abend: value
                    };
                }
            }
            localStorage.setItem("flow-seperation", JSON.stringify(db));
        } else {
            db = new Object;
            db[datum] = value;
            localStorage.setItem("flow-seperation", JSON.stringify(db));
        }
    }
    document.getElementById("inputValue").value = "";
    valueInputChanged();
}

// class Date {
//     Date() {}

//     getDate() {
//         return "2";
//     }

//     getMonth() {
//         return "1";
//     }

//     getFullYear() {
//         return "2020";
//     }

//     getHours() {
//         return "01";
//     }
// }
