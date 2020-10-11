
let dataset;


d3.csv('wealth-health-2014.csv', d3.autoType).then(d=>{
    console.log('dataset', d);


    width = 100;
    height = 100;

    const svg = d3
        .select('.chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

})


