import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    editMode: boolean
    onChange: (newValue:string) =>void;
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")
    const activateEditMode =()=> {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateEditViewMode =()=>{
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeHendler =(e:ChangeEvent<HTMLInputElement>)=>{setTitle(e.currentTarget.value)}
    return editMode
        ? <TextField onChange={onChangeHendler} value={title} onBlur={activateEditViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}