queue()
.defer(d3.json, "transactions.json")
.await(makeCharts);

function makeCharts(error, transactionsData) {
    let ndx = crossfilter(transactionsData);

    // let nameDim = ndx.dimension( function(d){
    //     return d. name;

    //  });
    let nameDim = ndx.dimension(dc.pluck("name")); //dimensions for charts
    let totalSpendPerPerson = nameDim.group().reduceSum(dc.pluck("spend")); //wwe create our group that it will be our y axis and it will be Spend

    let spendChart = dc.barChart("#chart-goes-here"); // dc bar chart that it will go to the id from our html file
    let personColors = d3.scale.ordinal().range(["red", "pink", "turquoise"]);

    spendChart //give the different attr 
        .width(300)
        .height(150)
        .colorAccessor(function(d) {
            return d.key
        })
        .colors(personColors)
        .dimension(nameDim)
        .group(totalSpendPerPerson)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Person")
        .yAxis().ticks(2)

    let storeDim = ndx.dimension(dc.pluck("store"));
    let totalSpendPerStore = storeDim.group().reduceSum(dc.pluck("spend"));


    let storeChart = dc.barChart("#store-chart");
    let storeColors = d3.scale.ordinal().range(["purple", "lightblue", "lightgreen"]);


    storeChart //give the different attr 
        .width(300)
        .height(150)
        .colorAccessor(function(d) {
            return d.key
        })
        .colors(storeColors)
        .dimension(storeDim)
        .group(totalSpendPerStore)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Store")
        .yAxis().ticks(8)

    let stateDim = ndx.dimension(dc.pluck("state"));
    let totalSpendPerState = stateDim.group().reduceSum(dc.pluck("spend"));

    let stateChart = dc.pieChart("#state-chart"); //pie chart automatically will give you more colors

    stateChart //give the different attr 
        .width(300)
        .radius(150) //radius instead of height
        .dimension(stateDim)
        .group(totalSpendPerState)
    // .x(d3.scale.ordinal())
    // .xUnits(dc.units.ordinal)
    // .xAxisLabel("State")
    // .yAxis().ticks(2)  no need of this ones on the pie chart




    dc.renderAll(); // to call all attbs and variables together

}
