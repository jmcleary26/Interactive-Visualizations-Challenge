// FUNCTION for building the charts in the dashboard
function buildCharts(UID) {

    d3.json("samples.json").then(data => {
        // console.log(data.samples)

        // Grab data from the samples list
        var sampleids = data.samples
        var filteredData = sampleids.filter(sampleid => sampleid.id == UID)[0]
        // console.log(filteredData)

        // Grab data from the metadata list
        var boxData = data.metadata
        var filteredBoxData = boxData.filter(sampleid => sampleid.id == UID)[0]
        // console.log(filteredBoxData)

        // Variables for each graph
        var ids = filteredData.otu_ids;
        // console.log(ids)
        var values = filteredData.sample_values;
        // console.log(values)
        var labels = filteredData.otu_labels;
        // console.log(labels)

        // Variables for top 10 bar chart 
        var topValues = filteredData.sample_values.slice(0,11).reverse();
        // console.log(topValues)
        var topLabels = filteredData.otu_labels.slice(0,11);
        // console.log(topLabels)
        var topIds = filteredData.otu_ids.slice(0,11).reverse();
        // console.log(topIds)
        var fullId = topIds.map(topIds => "OTU " + topIds);
        // console.log(fullId)
        
        // Bar Chart
        var traceBar = [{
            x: topValues,
            y: fullId,
            text: topLabels,
            type: "bar",
            orientation: "h",
        }];

        var layoutBar = {
            title: "Top 10 OTU Ids",
        }

        Plotly.newPlot("bar", traceBar, layoutBar)

        // Bubble Chart
        var traceBubble = [{
            x: ids,
            y: values,
            text: labels,
            mode: 'markers',
            marker: {
                size: values,
                color: ids,
            }
        }];

        var layoutBubble = {
            xaxis: {
                title: {
                    text: "OTU ID"},
                }
        };
        
        Plotly.newPlot("bubble", traceBubble, layoutBubble);

        // Gauge Chart
        var traceGauge = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: filteredBoxData.wfreq,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: {
                  axis: { range: [null, 9] },
                  bar: { color: "red"},
                  steps: [
                      {range: [0,1], color: "charcoal"},
                      {range: [1,2], color: "gray"},
                      {range: [2,3], color: "lightgray"},
                      {range: [3,4], color: "lightgreen"},
                      {range: [4,5], color: "lime"},
                      {range: [5,6], color: "springgreen"},
                      {range: [6,7], color: "forestgreen"},
                      {range: [7,8], color: "green"},
                      {range: [8,9], color: "darkgreen"},
                      
                  ]
                }
            }
          ];

          var layoutGauge = { 
              width: 600, height: 400 
            };

          Plotly.newPlot("gauge", traceGauge, layoutGauge);
        // console.log(filteredBoxData)

     })

};

// FUNCTION for building the demographics box
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

// FUNCTION for changing charts & box with different test subject
function optionChanged(UID) {
    // console.log(UID);
    buildCharts(UID);
    populateDemoInfo(UID);
}

// FUNCTION for init dashboard
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