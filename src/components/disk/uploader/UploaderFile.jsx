import { useDispatch } from 'react-redux'
import './Uploader.sass'
import { removeUploadFile } from '../../../reducers/uploadReducer'

export const UploaderFile = ({ file }) => {
   const dispatch = useDispatch()
   const closeUploaderFileHandler = () => dispatch(removeUploadFile(file.id))

   return <>
      <div className='uploader-file'>
         <div className='uploader-file_header'>
            <div className='uploader-file_name'>{file.name}</div>
            <div className='uploader-file_close' onClick={closeUploaderFileHandler} >X</div>
         </div>
         <div className='uploader-file_progress-bar'>
            <div className='uploader-file_upload-bar' style={{ width: file.progress + '%' }}></div>
            <div className='uploader-file_percent'>{file.progress}%</div>
         </div>
      </div>
   </>
}