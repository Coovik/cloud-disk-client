import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, uploadFile } from '../../actions/file'
import './Disk.sass'
import { Popup } from './Popup'
import { FileList } from './fileList/FileList'
import { popFromStack, setCurrentDir } from '../../reducers/fileReducer'
import { Uploader } from './uploader/Uploader'


export const Disk = props => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.file.currentDir)
   const stack = useSelector(state => state.file.stack)

   const backClickHandler = () => {
      dispatch(popFromStack())
      dispatch(setCurrentDir(stack.at(-1)))
   }

   const fileUploadHendler = (e) => {
      const files = [...e.target.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
   }

   const [popup, setPopup] = useState('none')
   const [dragEnter, setDragEnter] = useState(false)
   const [sort, setSort] = useState('date')

   const sortHandler = e => setSort(e.target.value)

   useEffect(() => {
      dispatch(getFiles(currentDir, sort))
   }, [currentDir, sort])

   const dragEnterHandler = e => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(true)
   }
   const dragLeaveHandler = e => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(false)
   }
   const dorpHandler = e => {
      e.preventDefault()
      e.stopPropagation()
      const files = [...e.dataTransfer.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
      setDragEnter(false)
   }

   return !dragEnter ?
      <>
         <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
            <div className='disk_btns'>
               <button className='disk_back btn' disabled={stack.length === 0 && true} onClick={() => backClickHandler()} >Назад</button>
               <button className='disk_create btn' onClick={() => setPopup('flex')}>Создать папку</button>
               <div className='disk_upload btn'>
                  <label htmlFor='disk_upload-input' className='disk_upload-label btn'>Загрузить файл</label>
                  <input multiple onChange={fileUploadHendler} type='file' className='disk_upload-input' id='disk_upload-input' />
               </div>
               <div className='btn'>
                  <label htmlFor='sortSelector' >Сортировка:</label>
                  <select value={sort} onChange={sortHandler} id='sortSelector' className='disk_sort btn'>
                     <option value='name'>По имени</option>
                     <option value='date'>По дате</option>
                     <option value='size'>По размеру</option>
                  </select>
               </div>
            </div>
            <FileList />
         </div>
         <Popup popup={popup} setPopup={setPopup} />
         <Uploader />
      </>
      :
      <div className='drop-area' onDrop={dorpHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >Перенесите файлы в эту область</div>
}