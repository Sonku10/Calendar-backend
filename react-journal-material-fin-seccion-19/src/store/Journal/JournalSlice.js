import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
     name: 'journal',
     initialState: {
          isSaving: false,
          saveMessage: '',
          notes: [],
          active: null,
          // active:{
          //     id: 'ABC123',
          //     title:'',
          //     body: '',
          //     date: 12345,
          //     imageUrls: [],
          // }
     },
     reducers: {
          savingNewNotes: (state) =>{
               state.isSaving = true;
          },
          addNewEmptynode: (state, action) => {
               state.notes.push(action.payload)
               state.isSaving = false;
          },
          setActiveNote: (state, action) => {
               state.active = action.payload
               state.saveMessage =  ''
          },
          setNotes: (state, action) => {
               state.notes = action.payload
          },
          setSaving: (state) => {
               state.isSaving= true;
               state.saveMessage =  ''
          },
          noteupdated: (state, action) => {
               state.isSaving = false;
               state.notes = state.notes.map(note => {
                    if (note.id === action.payload.id){
                         return action.payload;
                    }

                    return note
               })

               state.saveMessage = `${action.payload.title}, is good `

               //mostrar mensaje de actualizacion i guess
          },
          deleteNodeById: (state, action) => {
               state.active = null
               state.notes = state.notes.filter(note => note.id !== action.payload)
          },
          setPhotosToActiveNote: (state, action) =>{
               state.active.imageUrls=[...state.active.imageUrls, ...action.payload]
               state.isSaving=false
          },
          clearNotesLogout: (state) =>{
               state.isSaving = false
               state.saveMessage = ''
               state.notes =[]
               state.active = null
          }
     }
});


// Action creators are generated for each case reducer function
export const {clearNotesLogout ,setPhotosToActiveNote ,savingNewNotes, addNewEmptynode, setActiveNote ,setNotes, setSaving, noteupdated, deleteNodeById } = journalSlice.actions;