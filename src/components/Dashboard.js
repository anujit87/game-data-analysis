import React, { Component } from 'react';
import CountryView from './CountryView';
import GameView from './GameView';
import CountryAndGameView from './CountryAndGameView';
import {Link,BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import FileUpload from './FileUpload';

class Dashboard extends Component{

    constructor(props){
        super(props);
        //console.log('dashboard')
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        /*csv(data,(error,data)=>{
            console.log(data)
        })*/
        if(sessionStorage.getItem('csv-data'))
        this.setState({data:JSON.parse(sessionStorage.getItem('csv-data'))})
    }

    updateData = (data)=>{
        this.setState({data:data});
    } 

    render(){
        //console.log(this.state.data)
        return(
            
            <div>
                <nav className="navbar navbar-dark sticky-top bg-dark ">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Game Data Analysis</a>
                </nav>
                
                    <div className="sidebar">
                        <Link to="/upload" className={window.location.pathname==='/upload'?'active':''}>File Upload</Link>
                        <Link to="/country" className={window.location.pathname==='/country'?'active':''} >Country View</Link>
                        <Link to="/game" className={window.location.pathname==='/game'?'active':''}>Game View</Link>
                        <Link to="/country-game" className={window.location.pathname==='/country-game'?'active':''}>Country and Game View</Link>
                    </div>
                    <div className="content">
                        {/*<CountryView />*/}
                        {/*<GameView />*/}
                        {/*<CountryAndGameView />*/}
                        <Route exact path="/upload" render={(props)=><FileUpload updateData={this.updateData} />} />
                        <Route exact path="/country" render={(props)=><CountryView graphData={this.state.data} />} />
                        <Route exact path="/game" render={(props)=><GameView graphData={this.state.data} />} />
                        <Route exact path="/country-game"  render={(props)=><CountryAndGameView  graphData={this.state.data} />}/>
                    </div>
                
            </div>
            
        )
    }
}

export default Dashboard;