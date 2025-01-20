import React from 'react'

const Button = ({
    type='',
    onClick=()=>null,
    className='',
    classButton='',
    name='',
}) => {
  return (
    <div className={`flex flex-col justify-evenly items-center w-[full] mt-4 ${className}`} >
        <button className={`bg-black text-white w-[80%] border border-black hover:border-white rounded-lg h-full  ${classButton}`}  type={type} onClick={onClick}>{name}</button>
    </div>
  )
}

export default Button