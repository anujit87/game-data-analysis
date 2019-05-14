import React, { Component } from 'react';
import Highcharts from 'highcharts';
import { Redirect } from 'react-router-dom'

class GameView extends Component{
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
        //let filterByCountry=this.state.data.filter(data=>data.country==="us");
        //console.log(countries,dates);
        let revArray=[];
        let dauArray=[];
        for(let game of games){
            let revPerDay=[],dauPerDay=[]
            for(let date of dates){
                let totalRevPerDay=this.state.data.filter((data)=>{
                    return data.Date===date && data.gid===game
                }).reduce((accumulator,currentValue)=>{
                    return accumulator+parseInt(currentValue.rev,10)
                },0);
                revPerDay.push(totalRevPerDay);

                let totalDauPerDay=this.state.data.filter(data=> {return data.Date===date && data.gid===game})
                .reduce((accumulator,currentValue)=>{ return accumulator+parseInt(currentValue.dau,10)},0);
                dauPerDay.push(totalDauPerDay)
            }
            revArray.push(revPerDay)
            dauArray.push(dauPerDay);
        }
        console.log(dauArray)
        this.setState({revArray:revArray,dauArray:dauArray},()=>{
            this.createChart();
        })
            
        
    }

    createChart(){
        return Highcharts.chart('chart-area',{
            chart:{
              
            },
            title:{
                text:'Game View Chart'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            xAxis:[{
                gridLineWidth:1,
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
        const games=Array.from(new Set(this.state.data.map((d)=>d.gid)))
        const seriesData=games.map((game,index)=>{
            return [{
                name:'Revenue-'+game,
                type:'column',
                xAxis:0,
                yAxis:1,
                color:'#1aadce',
                data:this.state.revArray[index]
            },{
                name:'Dau-'+game,
                type:'column',
                xAxis:0,
                yAxis:0,
                color:'#0d233a',
                data:this.state.dauArray[index]
            }]
        })
        console.log(seriesData.flat())
        return seriesData.flat();
    }

    componentDidMount(){
        this.generateData();
        //this.createChart();
    }

    componentDidUpdate(prevProps){
        console.log(this.props)
        if(this.props.graphData!==prevProps.graphData){
            this.setState({data:this.props.graphData},()=>{
                this.generateData();
            })
        }
    }

    render(){
        
        return React.createElement('div',{id:'chart-area'})

    }
}

export default GameView;