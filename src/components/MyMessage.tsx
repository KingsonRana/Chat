import React from 'react'

type MessageProps = {
    message:string,
    sender: {
      image: string;
    },
    time:string
  }

export const MyMessage :React.FC<MessageProps> =({message,sender,time}) => {
    
  return (
    
    <div className='mymessageBox'>
        <div className='sendMessage'><p>{message}</p></div>
    </div>
  )
}
