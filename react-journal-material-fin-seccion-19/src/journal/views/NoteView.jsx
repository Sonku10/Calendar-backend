import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote } from '../../store/Journal/JournalSlice';
import { startDeletingNotes, startSaveNote, startUploadingFiles } from '../../store/Journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

    const dispatch = useDispatch()

    const { active: note, saveMessage, isSaving } = useSelector(state => state.journal)

    const { body, title, onInputChange, formState, date,} = useForm(note)

    const dateStrign =useMemo(() => {
        const newDate = new Date(date)

        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState))

    }, [formState])
    
    const onSaveNote = () =>{
        dispatch(startSaveNote())
    }

    useEffect(() => {
        if (saveMessage.length > 0){
            Swal.fire('Nota actualizada', saveMessage, 'success')
        }
    }, [saveMessage])

    const onFileInputChange = ({target}) => {
        if(target.files === 0)return



        console.log('uploading')
        dispatch(startUploadingFiles(target.files))
    }

    const fileInputRef = useRef()

    const onDelete = ()=>{
        dispatch(startDeletingNotes())
    }

    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateStrign}</Typography>
            </Grid>
            <Grid item>

                <input type='file' multiple onChange={onFileInputChange} style={{display: 'none'}} ref={fileInputRef}/>
                
                


                <IconButton color='primary' disabled={isSaving} onClick={()=>fileInputRef.current.click()}>
                    <UploadOutlined/>
                </IconButton>

                <Button color="primary" sx={{ padding: 2 }} onClick={onSaveNote} disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value ={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name='body'
                    value ={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container justifyContent='end'>
                <Button onClick={onDelete} sx={{mt: 2}} color='error'>
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images = {note.imageUrls}/>

        </Grid>
    )
}
