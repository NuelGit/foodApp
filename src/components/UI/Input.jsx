import React from 'react'

const Input = ({labelPros, idProps, ...props}) => {
  return (
    <p className='control'>
        <label htmlFor={idProps}> {labelPros} </label>
        <input id={idProps} name={idProps} required {...props} />

    </p>
  )
}

export default Input