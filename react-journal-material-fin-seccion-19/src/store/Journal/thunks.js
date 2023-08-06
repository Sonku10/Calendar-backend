import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptynode, deleteNodeById, noteupdated, savingNewNotes, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, } from "./JournalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"

export const startNewNote = () =>{

    return async(dispatch, getState) =>{

        const {uid} = getState().auth


        const newNote={
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        dispatch(savingNewNotes())
        dispatch(addNewEmptynode(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () =>{
    return async (dispatch, getState) =>{

        const {uid} = getState().auth
        if (!uid) throw new Error('the shit is not in here dude(uid)')
        dispatch(setNotes(await loadNotes(uid)))
        
    }
}

export const startSaveNote = () =>{
    return async(dispatch, getState) =>{

        dispatch(setSaving())

        const {uid} = getState().auth
        const {active:note} = getState().journal

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, {merge: true})

        dispatch(noteupdated(note))
    }
}

export const startUploadingFiles = (files = []) =>{
    return async (dispatch) =>{
        dispatch(setSaving())

        // await fileUpload(files[0])
        const fileUploadPromises =[]
        for (const file of files){
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)

        dispatch(setPhotosToActiveNote(photosUrls))
        
    }
}

export const startDeletingNotes = ()=>{
    return async (dispatch, getState) =>{
        const {uid} = getState().auth
        const {active:note} = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNodeById(note.id))
    }
}