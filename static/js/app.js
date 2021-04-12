// FUNCTION #1 of 4
function buildCharts(UID) {

    var barChart = d3.select("#bar");
    var bubbleChart = d3.select("#bubble");
    var guageChart = d3.select("#gauge");

    d3.json("samples.json").then(data => {
        console.log(data.samples)
        var sampleids = data.samples
        filteredData = sampleids.filter(sampleid => sampleid.id == UID)[0]
        console.log(filteredData)

        // Variables for each graph
        var ids = data.samples[0].otu_ids;
        console.log(ids)
        var values = data.samples[0].sample_values;
        console.log(values)
        var labels = data.samples[0].otu_labels;
        console.log(labels)

        // Variables for top 10 bar chart 
        var topValues = data.samples[0].sample_values.slice(0,11).reverse();
        console.log(topValues)
        var topLabels = data.samples[0].otu_labels.slice(0,11);
        console.log(topLabels)
        var topIds = data.samples[0].otu_ids.slice(0,11).reverse();
        console.log(topIds)
        var fullId = topIds.map(topIds => "OTU " + topIds);
        
        // Bar Chart
        var trace1 = {
            x: topValues,
            y: fullId,
            text: topLabels,
            type: "bar",
            orientation: "h",
        };

        var layout1 = {
            title: "Top 10 OTU Ids",
        }

        var dataBar = [trace1];

        Plotly.newPlot("bar", dataBar, layout1)

        // Bubble Chart
        var trace2 = [{
            x: ids,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                color: ids,
            }
        }];

        var layout2 = {
            xaxis: {
                title: {
                    text: "OTU ID"},
                }
        };
        
        Plotly.newPlot("bubble", trace2, layout2);

        // Gauge Chart
        var trace3 = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: UID,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 500] } }
            }
          ];

          var layout3 = { width: 600, height: 400 };
          Plotly.newPlot("gauge", trace3, layout3);

    })

};

// FUNCTION #2 of 4
function populateDemoInfo(UID) {

    var demographicInfoBox = d3.select("#sample-metadata");
    //Clear out any existing data in demographic box
    demographicInfoBox.html("");

    d3.json("samples.json").then(data => { 
        var boxData = data.metadata
        filteredData = boxData.filter(sampleid => sampleid.id == UID)[0]
        Object.entries(filteredData).forEach(([key, value]) => {
            demographicInfoBox.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });
      
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