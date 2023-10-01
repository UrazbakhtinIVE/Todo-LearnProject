import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() === "") {
            setError("Title is require")
        } else {
            props.addItem(title.trim())
            setTitle("")
        }
    }
    return <>
        <div>
            <TextField  variant="outlined"
                        label ={"type value"}
                        value={title}
                        onChange={onNewTitleChangeHandler}
                        onKeyDown={onKeyPressHandler}
                        error={!!error}
                        helperText={error}
            />

            <IconButton onClick={addTask}  color={'primary'} >
                <ControlPoint/>
            </IconButton>

            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    </>
}