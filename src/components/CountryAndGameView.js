import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { Redirect } from 'react-router-dom';

class CountryAndGameView extends Component{

    constructor(props){
        super(props);
        this.state={
            data:props.graphData,
            dauArray:[],
            revArray:[]
        }
    }

    generateData = ()=>{
        let games=this.state.data.map(d=>d.gid);
        games=Array.from(new Set(games));
        let dates=this.state.data.map(date=>date.Date);
        dates=Array.from(new Set(dates));
        let countries=this.state.data.map(d=>d.country);
        countries=Array.from(new Set(countries));    
        this.createArray(games,dates,countries)
    }

    createArray(games,dates,countries){
        let revArray=[],dauArray=[];
        for(let game of games){
            let totalRevPerDay=[],totalDauPerDay=[];
            for(let country of countries){
                let totalRevPerGameDay=[],totalDauPerGameDay=[];
                for(let date of dates){
                    let totalRevPerDayGameCountry=this.state.data.filter(d=>{return d.Date===date && d.gid===game && d.country===country})
                    .reduce((accumulator,currentValue)=>{
                        return accumulator+parseInt(currentValue.rev,10)
                    },0)
                    totalRevPerGameDay.push(totalRevPerDayGameCountry);

                    let totalDauPerDayGameCountry=this.state.data.filter(d=>{return d.Date===date && d.gid===game && d.country===country})
                    .reduce((accumulator,currentValue)=>{
                        return accumulator+parseInt(currentValue.dau,10)
                    },0)
                    totalDauPerGameDay.push(totalDauPerDayGameCountry);
                }
                totalRevPerDay.push(totalRevPerGameDay)
                totalDauPerDay.push(totalDauPerGameDay)
            }
            revArray.push(totalRevPerDay);
            dauArray.push(totalDauPerDay);
            //console.log(revArray)
            this.setState({revArray:revArray,dauArray:dauArray},()=>{
                this.createChart();
            })
        }
    }

    createChart(){
        return Highcharts.chart('chart-area',{
            chart:{
                
            },
            title:{
                text:'Country and Game View Chart'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            xAxis:[
                {
                    gridLineWidth:0,
                    categories:['us','uk','us','uk']
                },{
                    gridLineWidth:0,
                    categories:['gid4','gid5','gid4','gid5']
                }
                ,{
                gridLineWidth:0,
                gridLineDashStyle: 'ShortDash',
 
                categories:Array.from(new Set(this.state.data.map(d=>d.Date)))
                
            }],
            yAxis:[{
                title:{
                    text:'Daily Active Users'
                },opposite:true
            },{
                title:{
                    text:'Revenue'
                }
            }],
            
            series: this.generateSeriesData()
        })
    }

    generateSeriesData=()=>{
        const games=Array.from(new Set(this.state.data.map((d)=>d.gid)));
        const countries=Array.from(new Set(this.state.data.map((d)=>d.country)));
        const seriesData=games.map((game,gameIndex)=>{
            return countries.map((country,countryIndex)=>{
                return [
                    {
                        name:'Revenue-'+game+'-'+country,
                        type:'column',
                        xAxis:2,
                        yAxis:1,
                        color:'#1aadce',
                        data:this.state.revArray[gameIndex][countryIndex]
                    },{
                        name:'Dau-'+game+'-'+country,
                        type:'column',
                        xAxis:2,
                        yAxis:0,
                        color:'#0d233a',
                        data:this.state.dauArray[gameIndex][countryIndex]
                    }

                ]
            })
        })
        //console.log(seriesData.flat(2))
        return seriesData.flat(2);
    }

    componentDidMount(){
        this.generateData();
        
    }

    componentDidUpdate(prevProps){
        //console.log(this.props)
        if(this.props.graphData!==prevProps.graphData){
            this.setState({data:this.props.graphData},()=>{
                this.generateData();
            })
        }
    }

    render(){
        //this.generateData();
        //console.log(this.props)
        
        return React.createElement('div',{id:'chart-area'})
    }


}

export default CountryAndGameView;