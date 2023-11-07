import React from 'react'

type MessageProps = {
    message:string,
    sender: {
      image: string;
    },
    time:string
  }

export const Message :React.FC<MessageProps> =({message,sender,time}) => {
    
  return (
    
    <div className='messageBox'>
       <div className='senderDp'> <img src={sender.image}></img></div>
        <div className='senderMessage'><p>{message}</p></div>
    </div>
  )
}
