import './Disk.sass'
import { Input } from '../../utils/input/Input'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/file'

export const Popup = props => {
   const currentDir = useSelector(state => state.file.currentDir)
   const [dirName, setDirName] = useState('')
   const dispatch = useDispatch()
   const displayNone = () => props.setPopup('none')
   const createDirHandler = () => {
      dispatch(createDir(dirName, currentDir))
      setDirName('')
      displayNone()
   }
   return <>
      <div className='popup' style={{ display: props.popup }} onClick={() => displayNone()}  >
         <div className='popup_content' onClick={e => e.stopPropagation()}>
            <div className='popup_header'>
               <div className='popup_close' onClick={() => displayNone()} ></div>
               <div className='popup_title'>Введите название папки</div>
            </div>
            <Input type='text' value={dirName} setValue={setDirName} placeholder='Название папки' />
            <button className='popup_btn' onClick={() => createDirHandler()} >Создать</button>
         </div>
      </div>
   </>
}