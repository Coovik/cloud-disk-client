import { useDispatch, useSelector } from 'react-redux'
import fileIcon from '../../../../assets/img/file-icon.svg'
import folderIcon from '../../../../assets/img/folder-icon.svg'
import downloadIcon from '../../../../assets/img/download-icon.svg'
import deleteIcon from '../../../../assets/img/delete-icon.svg'
import { formatSize } from '../../../../utils/sizeFormat'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import './File.sass'
import { deleteFile, downloadFile } from '../../../../actions/file'

export const File = ({ file }) => {
   const dispatch = useDispatch()
   const currentDir = useSelector(state => state.file.currentDir)
   const openDirHandler = () => {
      if (file.type === 'dir') {
         dispatch(pushToStack(currentDir))
         dispatch(setCurrentDir(file._id))
      }
   }
   const downloadClickHandler = e => {
      e.stopPropagation()
      downloadFile(file)
   }
   const deleteFileClickHandler = e => {
      e.stopPropagation()
      dispatch(deleteFile(file))
   }
   return <>
      <div className='file' onClick={() => openDirHandler()} >
         <img src={file.type === 'dir' ? folderIcon : fileIcon} alt='' className='file_img' />
         <div className='file_name'>{file.name}</div>
         {file.type !== 'dir' && <img className='file_download' src={downloadIcon} onClick={downloadClickHandler} />}
         <img className='file_delete ' src={deleteIcon} onClick={deleteFileClickHandler} />
         <div className='file_date'>{file.date.slice(0, 10)}</div>
         <div className='file_size'>{formatSize(file.size)}</div>
      </div>
   </>
}