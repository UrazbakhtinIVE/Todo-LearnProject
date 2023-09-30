import './App.css'
import {TaskType, ToDoList} from "./ToDoList.tsx";
import {useState} from "react";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm.tsx";

export type  FilterValuesType = "all" | "completed" | "active"

type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType ={
    [key:string]:Array<TaskType>
}

function App() {

    function  removeTask(id: string, todolistId:string){
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(t => t.id != id);
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId:string) {
        // const newTask = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // };
        // const newTasks = [newTask, ...tasksObj];
        // setTasksObj(newTasks)
        const task = {id:v1(),title: title, isDone:false};
        const tasks = tasksObj[todolistId];
        tasksObj[todolistId] = [task, ...tasks];
        setTasks({...tasksObj});
    }
    function addTodoList(title:string){
        const todolist:ToDoListType={
            id: v1(),
            filter:"all",
            title:title
        };
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]:[]
        })
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        const toDoList = todolists.find(tl=>tl.id===todoListId);
        if(toDoList){
            toDoList.filter=value
            setTodolists([...todolists])
        }
    }
    function changeStatus(taskId: string, isDone: boolean,todolistId:string) {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t=>t.id === taskId);
        if(task){
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }
    const todolistId1 = v1();
    const todolistId2 = v1();
    const [todolists, setTodolists] = useState<Array<ToDoListType>>([
        {id:todolistId1, title:"What to learn", filter:"all"},
        {id:todolistId2, title:"What to buy", filter:"all"}
    ])
    const removeTodoList = (todolistId:string) =>{
        const filterTodolist = todolists.filter(tl=>tl.id !== todolistId)
        setTodolists(filterTodolist);
        delete tasksObj[todolistId]
        setTasks({...tasksObj});
    }

    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]:[
            {id:v1(), title:"Html&CSS", isDone:true},
            {id:v1(), title:"JS", isDone:true},
            {id:v1(), title:"React", isDone:false},
            {id:v1(), title:"RestAPI", isDone:false},
        ],
        [todolistId2]:[
            {id:v1(), title:"Milk", isDone: false},
            {id: v1(), title: "Book", isDone: true}
        ]
    });

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === "active") {
                       tasksForTodoList = tasksForTodoList.filter(t=>!t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                    }

                    return <ToDoList
                                     key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                                     removeToDoList={removeTodoList}
                            />
                })
            }

        </div>
    )
}

export default App;

