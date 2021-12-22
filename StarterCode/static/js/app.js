// declare global ID //
var ID = 0;


// // write a function to filter demographics by ID //
function selectDemographics(Demographics) {
    return Demographics.id == ID;
}

// // write a function to filter samples by ID //
function selectSamples(Samples) {
    return Samples.id == ID;
}

// // loop to build drop down //
function BuildDropDown(Names){
    var dropdown = d3.select("select");
    for (let i=0; i<Names.length; i++){
        var TempID = dropdown.append("option").text(`ID: ${Names[i]}`);
        TempID.attr("value",Names[i]);

    };
}

// // function to build the bar chart
function createBarChart(BarSamples){

    let title = `Top 10 OTUs found in Subject ID`;

    let OTUIDArray = [];
    
    for (let i=0; i<10; i++){
        OTUIDArray.push("OTU " + BarSamples.otu_ids[i]);
    };

    let bartrace = {
        y: OTUIDArray,
        x: BarSamples.sample_values.slice(0,10),
        type: 'bar',
        orientation: "h",
        hovertext: BarSamples.otu_labels.slice(0,10)
    
    };

    let barlayout ={
    title: title
    };

    Plotly.newPlot("bar", [bartrace], barlayout);

};

// function to build the bubble chart
function createBubbleChart(BubbleSamples){

    let MarkerArray = [];
    
    for (let i=0; i<BubbleSamples.otu_ids.length; i++){
        MarkerArray.push(Math.sqrt(BubbleSamples.sample_values[i])*5);
    };

    let bubbletrace = {
        x: BubbleSamples.otu_ids,
        y: BubbleSamples.sample_values,
        mode: 'markers',
        hovertext: BubbleSamples.otu_labels,
        marker: {
            colorscale: "Earth",
            size: MarkerArray,
            color: BubbleSamples.otu_ids
        }
    };

    let bubblelayout ={
        showlegend: false,
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", [bubbletrace], bubblelayout);


};

// function to build the guage
function createGuageChart(GuageDem){


};

// function to use D3 to populate demographics data 
function createDemData(NewDem) {
    // console.log(NewDem.ethnicity);
    // console.log(NewDem.wfreq);
    // console.log(NewDem.age);
    // console.log(NewDem.location);
    // console.log(NewDem.id);
    d3.selectAll("p.deleteMe").remove();

    var Panel = d3.select("div.panel-body");
    var TempPanel = Panel.append("p").text(`ID: ${NewDem.id}`);
    TempPanel.attr("class","deleteMe");
    var TempPanel = Panel.append("p").text(`Age: ${NewDem.age}`);
    TempPanel.attr("class","deleteMe");
    var TempPanel = Panel.append("p").text(`BBType: ${NewDem.bbtype}`);
    TempPanel.attr("class","deleteMe");
    var TempPanel = Panel.append("p").text(`Ethnicity: ${NewDem.ethnicity}`);
    TempPanel.attr("class","deleteMe");
    var TempPanel = Panel.append("p").text(`Location: ${NewDem.location}`);
    TempPanel.attr("class","deleteMe");
    var TempPanel= Panel.append("p").text(`WFreq: ${NewDem.wfreq}`);
    TempPanel.attr("class","deleteMe");
    var TempPanel = Panel.append("p").text(`Gender: ${NewDem.gender}`);
    TempPanel.attr("class","deleteMe");
};

// call function each time a new ID is selected from dropdown
function optionChanged(option){

    console.log(option);

    d3.json("data/samples.json").then(function(sampledata) {

        Names = sampledata.names;
        Demographics = sampledata.metadata;
        Samples = sampledata.samples;

        ID = option;
        var FilterDemographics = Demographics.filter(selectDemographics);
        var FilterSamples  = Samples.filter(selectSamples);
        console.log(FilterDemographics);
        console.log(FilterSamples);

        createDemData(FilterDemographics[0]);
        createBarChart(FilterSamples[0]);
        createBubbleChart(FilterSamples[0]);
        createGuageChart(FilterDemographics[0]);
    })
};


// reading data and displaying first selected ID
d3.json("data/samples.json").then(function(sampledata) {
    console.log(sampledata);
    
    Names = sampledata.names;
    Demographics = sampledata.metadata;
    Samples = sampledata.samples;
    
    ID = Names[0];


    console.log(Names);
    console.log(Demographics);
    console.log(Samples);


    BuildDropDown(Names);

    var FilterDemographics = Demographics.filter(selectDemographics);
    var FilterSamples  = Samples.filter(selectSamples);
    console.log(FilterDemographics);
    console.log(FilterSamples);

    createDemData(FilterDemographics[0]);
    createBarChart(FilterSamples[0]);
    createBubbleChart(FilterSamples[0]);
    createGuageChart(FilterDemographics[0]);

});
