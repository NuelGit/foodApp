import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({children, openProps, onCloseProps, className=''}) => {

    const dialog = useRef()

    useEffect(() =>{
        const modal = dialog.current

        if(openProps){
            modal.showModal()
        }
        return () => modal.close()


    }, [openProps])


  return createPortal( 
  <dialog ref={dialog} className={ `modal ${className}`} onClose={onCloseProps} > {children} </dialog>,
     document.getElementById('modal')
  
)}

export default Modal