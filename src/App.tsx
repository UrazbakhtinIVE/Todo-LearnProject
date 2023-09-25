import './App.css'
import {TaskType, ToDoList} from "./ToDoList.tsx";
import {useState} from "react";

export type  FilterValuesType = "all" | "completed" | "active"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title:"HTML & CSS", isDone:true},
        { id: 2, title:"JS", isDone:true},
        { id: 3, title:"React", isDone:false},
        { id: 4, title:"Redux", isDone:false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')
 function removeTask(id:number){
        const filterTask =  tasks.filter(t=>t.id !==id)
        setTasks(filterTask)
    }

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    let tasksForList = tasks;
    if(filter ==="active"){
        tasksForList = tasks.filter(t=>t.isDone);
    }
    if(filter==="completed"){
        tasksForList = tasks.filter(t=>!t.isDone);
    }

    return (
        <div className="App">
            <ToDoList title="What to lern"
                      tasks={tasksForList}
                      removeTask={removeTask}
                      changeFilter = {changeFilter}
            />
        </div>
    )

}
export default App;

