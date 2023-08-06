import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, imageListClasses } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/Journal/JournalSlice"


export const SideBarItem = ({ note }) => {

    const newTitle = useMemo(() => {
        return note.title.length > 17
            ? note.title.substring(0, 17) + '...'
            : note.title
    }, [note.title])

    const dispatch = useDispatch()

    const notechange = () =>{
        dispatch(setActiveNote(note))
    }

    return (
        <ListItem key={note.id} disablePadding>
            <ListItemButton onClick={notechange}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={note.body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
