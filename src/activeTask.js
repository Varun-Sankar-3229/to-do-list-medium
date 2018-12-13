import React from 'react';



const ActiveTasks = ({tasks,completeT,update,del}) => {
    
    const arrayList = tasks.map(taskList => {
        
        if(taskList.status === "active"){ 
        return(
            <tr className="list-group-item" key={taskList.id}>
                <td className="left-t">
                <span className="align-left" id={taskList.id} onClick={() => update(taskList.id,taskList.task)}>{taskList.task}</span>
                </td>
                <td className="right">
                <span className="btn-group">
                    <button onClick={() => {completeT(taskList.id)}} className="btn btn-success">Complete</button>
                    <button onClick={() => {del(taskList.id,taskList.status)}} className="btn btn-danger">Delete</button>
                </span>
                </td>
            </tr>
         )
        }
        else{
            return(
                <tr className="task list-group-item" key={taskList.id}>
                    <td className="left-t">
                        <span className="align-left" id={taskList.id}><del>{taskList.task}</del></span>
                    </td>
                    <td className="right">
                        <span className="btn-group">
                        <button onClick={() => {completeT(taskList.id)}} className="btn btn-dark">Uncomplete</button>
                        <button onClick={() => {del(taskList.id,taskList.status)}} className="btn btn-danger">Delete</button>
                        </span>
                    </td>
                </tr>
            )
        } 
     });


    if(arrayList.length !== 0){
        return(
            arrayList
        );
    }
     
    else{
        return(
            <tr className="list-group-item">
                <td>There are no existing tasks.</td>
            </tr>
        );
    }
     
    
}

export default ActiveTasks;