import './Uploader.sass'
import { useDispatch, useSelector } from 'react-redux'
import { UploaderFile } from './UploaderFile'
import { hideUploader } from '../../../reducers/uploadReducer'

export const Uploader = props => {
   const dispatch = useDispatch()
   const files = useSelector(state => state.upload.files)
   const isVisible = useSelector(state => state.upload.isVisible)
   const closeUploaderHandler = () => dispatch(hideUploader())

   return isVisible &&
      <>
         <div className='uploader'>
            <div className='uploader_header'>
               <div className='uploader_title'>Загрузки</div>
               <div className='uploader_close' onClick={closeUploaderHandler} >X</div>
            </div>
            {files.map(file => <UploaderFile file={file} key={file.id} />)}
         </div>
      </>
}