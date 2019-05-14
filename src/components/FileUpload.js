import React, { Component } from 'react';
import {csv} from 'd3-request';
import { Redirect } from 'react-router-dom';


class FileUpload extends Component{

    constructor(props){
        super(props);
        this.state={
            displayText:'Choose file',
            invalidFile:false,
            redirect:false
        }
    }

    onChange = (e)=>{
        let files=e.target.files;
        //console.log(files);
        let reader=new FileReader();
        reader.readAsDataURL(files[0]);
        
        const extension=files[0].name.split('.').pop();
        if(extension.toLowerCase()==='csv'){
            this.setState({displayText:files[0].name})
            reader.onload=(e)=>{
                //console.log(e.target.result)
                csv(e.target.result,(error,data)=>{
                    if(!error){
                        console.log(data)
                        //this.props.updateData(data);
                        this.setState({data:data})
                        //localStorage.setItem('csv-data',JSON.stringify(data))
                        //localStorage.setItem('csv-file',this.state.displayText)
                    }
                    
                })
            }
        }else{
            this.setState({invalidFile:true})
            //console.log('Please upload a CSV file')
        }

        
    }

    componentDidMount(){
        if(sessionStorage.getItem('csv-file')){
            this.setState({displayText:sessionStorage.getItem('csv-file')})
        }
    }

    generateChart = ()=>{
        // console.log(this.state.data)
        if(this.state.data){
            sessionStorage.setItem('csv-data',JSON.stringify(this.state.data));
            sessionStorage.setItem('csv-file',this.state.displayText);
            this.setState({redirect:true})
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/country" />
        }
        return <div className="container">
            <h3 className="text-center mt-4">Please upload the CSV file</h3>
            <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                <div className="input-group mt-4">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01" onChange={this.onChange} />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.displayText}</label>
                    </div>
                </div>
                <button className="btn btn-primary mt-2" onClick={this.generateChart}>Generate Charts</button>
                {this.state.invalidFile && <p style={{color:'red'}}>Please select a valid CSV file</p>}
            </div>
            <div className="col-sm-3"></div>
            </div>
        </div>
    }
}

export default FileUpload;