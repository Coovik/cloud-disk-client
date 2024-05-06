import './Input.sass'

export const Input = props => {
   return <>
      <input className='input'
         onChange={(e) => props.setValue(e.target.value)}
         value={props.value}
         type={props.type}
         placeholder={props.placeholder} />
   </>
}