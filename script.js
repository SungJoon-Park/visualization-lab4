
let dataset;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{
    console.log('dataset' , data);
    dataset = data;
//    dataset.sort((a,b) => b.Income - a.Income);
//    console.log('income' , dataset);



    margin = ({top:20,bottom:20,right:20,left:20});
    const width = 650 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let svg = d3.select('.chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height+margin.top + margin.bottom)
        
    let group = svg
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data,d=>d.Income))
        .range([0, width]);
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data,d=>d.LifeExpectancy))
        .range([height,0]);
    const rScale = d3.scaleSqrt()
        .domain(d3.extent(data,d=>d.Population))
        .range([3,20]);
    const cScale = d3.scaleOrdinal(d3.schemeTableau10);     

    let circles = group.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx',d=>xScale(d.Income))
        .attr('cy',d=>yScale(d.LifeExpectancy))
        .attr('r',d=>rScale(d.Population))
        .attr("fill", d=>cScale(d.Region))
        .attr('opacity',0.7)
        .attr('stroke','black')
        .on("mouseenter", (event, d) => {
            const pos = d3.pointer(event, window)
            d3.select('.tooltip')
                .style('display','inline-block')
                .style('top',pos[1]+7+'px')
                .style('left',pos[0]+7+'px')
                .html(
                    "Country: " +d.Country + "<br> Region: " + d.Region + "<br> Population: " + d3.format(',d')(d.Population) + "<br> Income: " + d3.format(',d')(d.Income) + "<br> Life Expectancy: " + d.LifeExpectancy);
        })
        .on("mouseleave", (event, d) => {
            d3.select('.tooltip')
                .style('display', 'none');
        }); 
    
    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5,'s');
    
    const yAxis = d3.axisLeft()
        .scale(yScale);

    group.append('g')
        .attr('class','axis x-axis')
        .call(xAxis)
        .attr("transform", `translate(0, ${height})`);

    group.append('g')
        .attr('class','axis y-axis')
        .call(yAxis);
    
    svg.append('text')
        .text('Income')
        .attr('x',width-60)
        .attr('y',height+10)
        .attr('text-anchor','middle')
        .attr('font-size',12)
        .attr('alignment-baseline','middle');
    
    svg.append('text')
        .text('Life Expectancy')
        .attr('x',30)
        .attr('y',60)
        .attr('text-anchor','middle')
        .attr('font-size',12)
        .attr('alignment-baseline','middle')
        .attr('writing-mode', 'vertical-lr');

    let legend = group.selectAll('rect')
        .data(cScale.domain())
        .enter()
        .append('rect')
        .attr('class','box')
        .attr('width', 10)
        .attr('height', 10)
        .attr('x',450)
        .attr('y',(d,i)=>300+i*15)
        .attr('fill', d=>cScale(d));
    
    let label = group.selectAll('div')
        .data(cScale.domain())
        .enter()
        .append('text')
        .attr('class','region')
        .text(d=>d)
        .attr('x', 450+15)
        .attr('y',(d,i)=>308+i*15)
        .attr('text-anchor', 'beginning')
        .attr('font-size',12);

})
