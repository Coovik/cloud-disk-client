import axios from 'axios'
import { addFile, deleteFileActioin, setFiles } from '../reducers/fileReducer'
import { addUploadFile, changeUploadFile, showUploader } from '../reducers/uploadReducer'

const instance = axios.create({
   baseURL: 'http://localhost:4000/api/files',
})

export const getFiles = (dirId, sort) => {
   return async dispatch => {
      try {
         let url = ''
         if (dirId) {
            url = '?parent=' + dirId
         }
         if (sort) {
            url = '?sort=' + sort
         }
         if (dirId && sort) {
            url = '?parent=' + dirId + '&sort=' + sort
         }
         const res = await instance.get(url, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
         })
         dispatch(setFiles(res.data))
      } catch (e) {
         // alert(e.response.data.message)
      }
   }
}
export const createDir = (name, dirId) => {
   return async dispatch => {
      try {
         const res = await instance.post('', { name, parent: dirId, type: 'dir' },
            {
               headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })
         dispatch(addFile(res.data))
      } catch (e) {
         alert(e.response.data.message)
      }
   }
}
export const uploadFile = (file, dirId) => {
   return async dispatch => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         if (dirId) {
            formData.append('parent', dirId)
         }
         const uploadFile = { name: file.name, progress: 0, id: Date.now() }
         dispatch(showUploader())
         dispatch(addUploadFile(uploadFile))
         const res = await instance.post('/upload', formData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
            onUploadProgress: progressEvent => {
               const totalLength = progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
               console.log('total ', totalLength)
               if (totalLength) {
                  uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                  dispatch(changeUploadFile(uploadFile))
               }
            }
         })
         dispatch(addFile(res.data))
      } catch (e) {
         alert(e.response.data.message)

      }
   }
}
export const downloadFile = async (file) => {
   const res = await fetch('http://localhost:4000/api/files/download?id=' + file._id, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
   })
   if (res.status === 200) {
      const blob = await res.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
   }
}
export const deleteFile = (file) => {
   return async dispatch => {
      try {
         const res = await instance.delete('?id=' + file._id, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
         })
         dispatch(deleteFileActioin(file._id))
         // alert(res.data.message)
      } catch (e) {
         alert(e.response.data.message)
      }
   }
}