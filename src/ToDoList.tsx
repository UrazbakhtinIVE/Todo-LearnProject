import {FilterValuesType} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone:boolean) => void
    filter:FilterValuesType
}

export const ToDoList = (props: PropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            props.addTask(title)
            setTitle("")
        }
    }
    const addTask = () => {
        if(title.trim()===""){
            setError("Title is require")
        }
        else {
            props.addTask(title)
            setTitle("")
        }


    }
    const onAllTasksFilterHandler = () => {
        {
            props.changeFilter("all")
        }
    }
    const onActiveTasksFilterHandler = () => {
        {
            props.changeFilter("active")
        }
    }
    const onCompletedTasksFilterHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}

            </div>
            <ul>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => {props.removeTask(t.id)}

                    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
                           props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return <li className={t.isDone ? "is-done" : ""}><input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeHandler}
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
