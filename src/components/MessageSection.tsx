  import React from 'react'
  import {useEffect,useState,useContext,useRef} from 'react'
  import { Message } from './Message'
  import { MyContext } from '../context/TopContext'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare,faPaperPlane,faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { MyMessage } from './MyMessage';
  
  export const MessageSection = () => {
    const { name, from, to } = useContext(MyContext)
    const {setFrom,setTo,setName,setImage,image} = useContext(MyContext)
    const[page,setPage]= useState<number>(0)
    const [data, setData] = useState<chatDefinition["chats"]>([]);
    const containerRef = useRef<HTMLDivElement>(null)
    const [message,setMessage] = useState<string>("")
 
    const [loading, setLoading] = useState(false);
  type chatDefinition = {
    chats :{
      message:string,
      sender:{
        image:string,
      },
      myMessage?:string
      time:string
    }[],
    
    name:string,
    from:string,
    to:string
  }

 
    const fetchData = async ()=>{
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`)
    const chats:chatDefinition = await response.json()
    setData((prevData) => [...chats.chats, ...prevData]);
    const newPage = page+1;
    setPage(newPage)
    setLoading(false)
    setName(chats.name)
    setFrom(chats.from)
    setTo(chats.to)
    setImage(chats.chats[0].sender.image)

    const container = containerRef.current
    if(container){
      setTimeout(()=>{
        container.scrollTop=container.scrollHeight + container.clientHeight
        console.log(container.scrollHeight+container.clientHeight)
      },1)
    }
  } 
   

  const handleScroll = async() => {
    const container = containerRef.current;
    console.log("scrolling")
    if (container && container.scrollTop === 0) {
      setLoading(true);
      const newPage = page+1
      const response = await fetch(`https://qa.corider.in/assignment/chat?page=${newPage}`)
      const chats:chatDefinition = await response.json()
      setData((prevData) => [...chats.chats, ...prevData]);
      setPage(newPage)
      setLoading(false)
      console.log("Page number is "+page)
    }
  };
  const handleMessageChange =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setMessage(e.target.value)
  }
  const sendMessage = ()=>{
    
    const newMessage = {
      message,
      sender: { image: "" },
      myMessage: "yes",
      time: ""
    };
    // Concatenate the new message to the existing data array
    const newData = [...data,newMessage];
    setData(newData);
    setMessage("");
    const container = containerRef.current
    if(container){
      setTimeout(()=>{
        container.scrollTop=container.scrollHeight + container.clientHeight
        console.log(container.scrollHeight+container.clientHeight)
      },1)
    }
  }
 
   
  useEffect(() => {
    const container = containerRef.current
    if(container){
    container.addEventListener('scroll', handleScroll);
    console.log("inside container",container)
    return () => {
      container.removeEventListener('scroll', handleScroll);
    }};
  }, [handleScroll]);

  useEffect(()=>{
   
    fetchData()
  },[])

    return (
<div className="chatRoom">
<div className="chatRoomHeader">
  <div className="containNameDiv"><FontAwesomeIcon className="icon" icon={faArrowLeft} /><div className="nameDiv"><b>{name}</b></div><FontAwesomeIcon className="icon edit"  icon={faPenToSquare} /></div>
  <div className="toFromDiv">
    <div className="groupDisplayPicture"><div><img src={image}></img></div></div>
    <div className="toFrom">
    <p>From <b>{from}</b></p>
    <p>To <b>{to}</b></p>
    </div>
  </div>
</div>
<div style={{height:"100%",position:"relative", overflow:"hidden"}}>   <div className=' chatRoomBody' id="section"ref={containerRef}>
        {loading } 
        {data.length>0 && data.map((data,index:number)=>{
          if(data.myMessage==="yes"){
            return <MyMessage key={index} message={data.message} sender={{image:data.sender.image}} time={data.time}/>
          }else{
          return <Message key={index} message={data.message} sender={{image:data.sender.image}} time={data.time}/>
          }
        })}
        
      </div></div>
<div className="chatRoomFooter"><div className="messageInputBox"><textarea value={message} onChange={handleMessageChange}></textarea><div><FontAwesomeIcon icon={faPaperclip} /></div><div><FontAwesomeIcon icon={faPaperPlane} className="send" onClick={sendMessage}/></div></div></div>
</div>
      
    )
  }
