import { useSelector } from 'react-redux'
import './FileList.sass'
import { File } from './file/File'

export const FileList = props => {
   const files = useSelector(state => state.file.files).map(file => <File key={file._id} file={file} />)
   return <>
      <div className='filelist'>
         <div className='filelist_header'>
            <div className='filelist_name'>Название</div>
            <div className='filelist_date'>Дата</div>
            <div className='filelist_size'>Размер</div>
         </div>
         <div>
            {files}
         </div>
      </div>
   </>
}