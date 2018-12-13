import React, { Component } from 'react';
import './App.css';
import AddTask from './addTask.js';
import ActiveTasks from './activeTask.js';

class App extends Component {
  state = {
    activeTasks: [],
      idCount: 0,
      total: 0,
      active: 0,
      complete: 0
  }

  componentWillMount(){
    localStorage.getItem('activeTasks') && localStorage.getItem('idcount') && 
    localStorage.getItem('total') && localStorage.getItem('active') && 
    localStorage.getItem('complete') && this.setState({
      activeTasks: JSON.parse(localStorage.getItem('activeTasks')),
      idCount: JSON.parse(localStorage.getItem('idcount')),
      total: JSON.parse(localStorage.getItem('total')),
      active: JSON.parse(localStorage.getItem('active')),
      complete: JSON.parse(localStorage.getItem('complete'))
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('activeTasks', JSON.stringify(nextState.activeTasks));
    localStorage.setItem('idcount', nextState.idCount);
    localStorage.setItem('total', nextState.total);
    localStorage.setItem('active', nextState.active);
    localStorage.setItem('complete', nextState.complete);
  }

  addTask = (task) =>{
    task.id = this.state.idCount+1;
    task.status = 'active';
    let newList = [task,...this.state.activeTasks];
    let newIdCount = this.state.idCount+1;
    let newTotal = this.state.total+1;
    let val = 0;
    if(task.status==="active"){
      val = this.state.active+1;
      this.setState({
        activeTasks: newList,
        idCount: newIdCount,
        total: newTotal,
        active: val
      });
    }
    else{
      val = this.state.complete+1;
      this.setState({
        activeTasks: newList,
        idCount: newIdCount,
        total: newTotal,
        complete: val
      });
    }
  }

  deleteTask = (id,status) =>{
    if(window.confirm("Are you sure if you want to delete the task?")){
      let newList = this.state.activeTasks.filter(active => {
        return active.id !== id
      });
      let taskTotal = 0;
      let newTotal = this.state.total-1;
      if(status === "active")
        taskTotal = this.state.active-1;
      else
        taskTotal = this.state.complete-1;

      this.setState({
        activeTasks: newList,
        total: newTotal,
        [status]: taskTotal
      });
    }
  }

  completeTask = (id) =>{
    let curTask = this.state.activeTasks.filter(active => {
      return active.id === id
    });

    let newList = this.state.activeTasks.filter(active => {
      return active.id !== id
    });

    
    let val = [0,0];

    if(curTask[0].status === "active"){
      curTask[0].status = "complete";
      val[0] = this.state.active-1;
      val[1] = this.state.complete+1;
      this.setState({
        active: val[0],
        complete: val[1]
      });
      newList = [...newList,curTask[0]];
    }
    
    else{
      curTask[0].status = "active";
      val[0] = this.state.complete-1;
      val[1] = this.state.active+1;
      this.setState({
        complete: val[0],
        active: val[1]
      });
      newList = [curTask[0],...newList];
    }
    

    //newList = [...newList,curTask[0]];

    console.log(curTask[0]);
    //console.log(newList);
    this.setState({
      activeTasks: newList
    });
  }

  updateTask = (id,task) =>{
    let mod = window.prompt("Please update the task",task);
    if(mod){
       // document.getElementById(id).innerHTML = mod;
       let update = this.state.activeTasks.findIndex(index =>{
         return index.id === id
        });

        let modList = this.state.activeTasks;
        modList[update].task = mod;
        this.setState({
          activeTasks: modList
        });
    }
  }

  removeAll = () =>{
    if(this.state.complete>0 && window.confirm("Are you sure if you want to delete all completed tasks?")){
      let removeTask = this.state.activeTasks.filter(remove => {
        return remove.status !== "complete"
      });
      let len = this.state.activeTasks.length-removeTask.length;
      console.log(removeTask);
      let newTotal = this.state.total-len;
      let compTotal = this.state.complete-len;
      this.setState({
        activeTasks: removeTask,
        total: newTotal,
        complete: compTotal
      });
    }
  }

  render() {
    return (
      <div className="App container">
        <h1>To Do List</h1>
        <div className="alert alert-info">Note: Click on text of Active Tasks to edit.</div>
        <div className="alert alert-secondary"><span>Total tasks: {this.state.total} | </span><span>Active tasks: {this.state.active} | </span><span>Completed tasks: {this.state.complete} </span></div>
        
        <AddTask task={this.addTask}/>

        <h2>Existing Tasks</h2>
        <ul className="list-group">
        <table><tbody>
        <ActiveTasks tasks={this.state.activeTasks} completeT={this.completeTask} update={this.updateTask} del={this.deleteTask}/>
        
        </tbody></table>
        </ul>
        <button onClick={this.removeAll} className="btn btn-danger remove-btn">Remove all Completed Tasks</button>

      </div>
    );
  }
}

export default App;
