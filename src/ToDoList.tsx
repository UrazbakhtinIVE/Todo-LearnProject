import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    id:string,
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, toDoListId:string) => void
    addTask: (title: string, id: string) => void
    changeTaskStatus: (taskId: string, isDone:boolean, todolistId:string) => void
    filter:FilterValuesType
    removeToDoList:(id: string) => void
}

export const ToDoList = (props: PropsType) => {
    const removeToDolist =()=>{
        props.removeToDoList(props.id)
    }

    const onAllTasksFilterHandler = () => {
        {
            props.changeFilter("all",props.id)
        }
    }
    const onActiveTasksFilterHandler = () => {
        {
            props.changeFilter("active",props.id)
        }
    }
    const onCompletedTasksFilterHandler = () => {
        props.changeFilter("completed",props.id)
    }

    const addTask=(title:string)=>{
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeToDolist} >X</button>
            </h3>
            <AddItemForm  addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id, props.id)}

                    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
                        const newIsDoneValue = e.currentTarget.checked;
                           props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}

                        /><span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button className= {props.filter==="all" ? "active-filter" : ""}
                        onClick={onAllTasksFilterHandler}>All</button>
                <button className= {props.filter==="active" ? "active-filter" : ""}
                        onClick={onActiveTasksFilterHandler}>Active</button>
                <button className= {props.filter==="completed" ? "active-filter" : ""}
                        onClick={onCompletedTasksFilterHandler}>Completed</button>
            </div>
        </div>
    )
}


