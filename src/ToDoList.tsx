import {FilterValuesType} from "./App.tsx";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTaskTitle: (taskId: string, newValue:string, todolistId:string) => void
    filter:FilterValuesType
    removeToDoList:(id: string) => void
    changeTodoListTitle:(id:string, newTitle:string) => void
}

export const ToDoList = (props: PropsType) => {
    const removeToDolist =()=>{
        props.removeToDoList(props.id)
    }

    const changeTodoListTitle =(newTitle:string)=>{
       props.changeTodoListTitle(props.id, newTitle)
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
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle} editMode={false}/>
                <IconButton onClick={removeToDolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm  addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id, props.id)}

                    const onChangeStatusHandler =(e:ChangeEvent<HTMLInputElement>)=>{
                        const newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                    }

                    const onChangeTitleHandler =(newValue:string)=>{
                        props.changeTaskTitle(t.id,newValue, props.id)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox  onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan onChange={onChangeTitleHandler} title={t.title} editMode ={false} />
                        <IconButton onClick={onRemoveHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
                }
            </ul>
            <div>
                <Button  variant={props.filter==="all" ? "contained": "text"}
                        onClick={onAllTasksFilterHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter==="active" ? "contained" : "text"}
                        onClick={onActiveTasksFilterHandler}>Active
                </Button>
                <Button color={'secondary'} variant= {props.filter==="completed" ? "contained" : "text"}
                        onClick={onCompletedTasksFilterHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

