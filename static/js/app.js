// FUNCTION #1 of 4
function buildCharts(UID) {

    var barChart = d3.select("#bar");
    var bubbleChart = d3.select("#bubble");
    var guageChart = d3.select("#guage");

    d3.json("samples.json").then(data => {
        console.log(data)
    })
};

// FUNCTION #2 of 4
function populateDemoInfo(UID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        console.log(data)
    })
}

// FUNCTION #3 of 4
function optionChanged(UID) {
    console.log(UID);
    buildCharts(UID);
    populateDemoInfo(UID);
}

// FUNCTION #4 of 4
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var names = data.names;
        names.forEach(UID => {
            dropdown.append("option").text(UID).property("value", UID)
        })
        buildCharts(names[0]);
        populateDemoInfo(names[0]);
    });
};

initDashboard();