import React, { Component } from 'react';

class AddTask extends Component{
    
    state = {
        task: ''//,
        //status: 'active'
    }

    newTask = () => {
        if(this.state.task.length>0){
            this.props.task(this.state);
            document.getElementById('addInput').value = '';
            this.setState({
                task: ''
            });
        }
    }

    inputValue = (e) => {
        this.setState({
            task: e.target.value
        });
    }

    

    render(){
        
        return(
            <div className="newTask input-group">
                <input type="text" className="form-control" id="addInput" placeholder="Add a task" name="newTask" onChange={this.inputValue}/>
                <div className="input-group-append">
                <button onClick={this.newTask} className="btn btn-outline-primary">Add</button>
                </div>                
            </div>
        );
    }
}

export default AddTask;