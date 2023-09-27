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
}

export const ToDoList = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
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
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onRemoveHandler = () => {props.removeTask(t.id)}

                    return <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button onClick={onAllTasksFilterHandler}>All</button>
                <button onClick={onActiveTasksFilterHandler}>Active</button>
                <button onClick={onCompletedTasksFilterHandler}>Completed</button>
            </div>
        </div>
    )
}
