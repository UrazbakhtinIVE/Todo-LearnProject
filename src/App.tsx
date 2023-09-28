import './App.css'
import {TaskType, ToDoList} from "./ToDoList.tsx";
import {useState} from "react";
import {v1} from 'uuid';

export type  FilterValuesType = "all" | "completed" | "active"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title:"HTML & CSS", isDone:true},
        { id: v1(), title:"JS", isDone:true},
        { id: v1(), title:"React", isDone:false},
        { id: v1(), title:"Redux", isDone:false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(title:string){
        const newTask = {
            id:v1(),
            title:title,
            isDone:false};
        const newTasks = [newTask,...tasks];
        setTasks(newTasks)
    }

    function removeTask(id:string){
        const filterTask =  tasks.filter(t=>t.id !==id)
        setTasks(filterTask)
    }

    function changeFilter(value:FilterValuesType){
        setFilter(value)
    }

    function changeTask(taskId: string, isDone:boolean){
        const task = tasks.find(t=>t.id===taskId)

        if(task){
           task.isDone = isDone
       }

        setTasks( [... tasks])

    }

    let tasksForList = tasks;
    if(filter ==="active"){
        tasksForList = tasks.filter(t=>!t.isDone);
    }
    if(filter==="completed"){
        tasksForList = tasks.filter(t=>t.isDone);
    }

    return (
        <div className="App">
            <ToDoList title="What to lern"
                      tasks={tasksForList}
                      removeTask={removeTask}
                      changeFilter = {changeFilter}
                      addTask={addTask}
                      changeTaskStatus = {changeTask}
                      filter = {filter}
            />
        </div>
    )
}
export default App;

