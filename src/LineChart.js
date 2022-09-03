import React, { useEffect } from 'react'
import './LineChart.css'
import * as d3 from 'd3'

const LineChart = ({data, width, height, widthOfBar, padding}) => {
    
    useEffect(() => {
        createChart();
    })

    const createChart = () => {
        const dates = data.map(item => new Date(item[0]))
        
        const years = data.map(item => {
            let temp = item[0].substring(5,7)
            let quarter;
            if(temp === '01'){
                quarter = 'Q1' 
            } else if(temp === '04'){
                quarter = 'Q2'
            } else if(temp === '07'){
                quarter = 'Q3'
            } else if(temp === '10'){
                quarter = 'Q4'
            }

            return item[0].substring(0,4) + ' ' + quarter;
        })
        
            
        const tooltip = d3.select('#tooltip')
                          .style('visibility', 'hidden')

        const xScale = d3.scaleLinear()
                         .domain([0, data.length -1])
                         .range([padding, width - padding])

        const yScale = d3.scaleLinear()
                         .domain([0, d3.max(data, item =>{
                            return item[1]
                         })])
                         .range([0, height - (padding * 2)])

        const xScaleAxis = d3.scaleTime()
                             .domain([d3.min(dates), d3.max(dates)])
                             .range([padding, width - padding])

        const yScaleAxis = d3.scaleLinear()
                             .domain([0, d3.max(data, item =>{
                                return item[1]
                            })])
                             .range([height - (padding * 2), 0])   


        const xAxis = d3.axisBottom(xScaleAxis)
        const yAxis = d3.axisLeft(yScaleAxis)
                             
        d3.select('svg')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('height', (item) => yScale(item[1]))
        .attr('width', (width - (2 * padding)) / data.length) 
        .attr('x', (item, index) => {
            return xScale(index)
        })
        .attr('y', (item) => {
            return (height - padding) - yScale(item[1])
        })
        .attr('data-date', item => item[0])
        .attr('data-gdp', item => item[1])
        .on('mouseover', (e ,item) => {
            tooltip
                    .style('visibility', 'visible')
                    .html(`${years[data.indexOf(item)]} <br/> $${item[1]} Billion`)
                    .style('left', (e.pageX - (widthOfBar - 20)) + 'px')
                    .style('top', (e.pageY - 40) + 'px')
                    document.querySelector('#tooltip').setAttribute('data-date', item[0])
            })
            .on('mouseout', () => {
                tooltip.style('visibility', 'hidden');
                });

            d3.select('svg').append('g')
                        .call(xAxis)
                        .attr('id', 'x-axis')
                        .attr('transform', 'translate(0,' + (height - padding) + ')')
            d3.select('svg').append('g')
                        .call(yAxis)
                        .attr('id', 'y-axis')
                        .attr('transform', 'translate(' + padding + ',' + padding + ')')
            }

    return (
            <svg id='svgContainer' width={width} height={height}></svg>
    )
} 

export default LineChart;