import {MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import NavigationBar from '../NavigationBar';

const ChatsPage = () => {
    let props = localStorage.getItem("item_key");
    const chatProps = useMultiChatLogic(
        '370efb2b-acaf-416e-84f8-0cc573879e6a', 
        props, props
        );
    return (<>
    <NavigationBar/>
         {/* <div style={{height: '100vh'}}>
             <MultiChatSocket {...chatProps} />
             <MultiChatWindow {...chatProps} style = {{height: '100%'}} />
         </div> */}
        {/* <div className='row mt-5'></div> */}
        <div style={{ height: "100vh", width: "100vw" }}>

         <PrettyChatWindow
      projectId="370efb2b-acaf-416e-84f8-0cc573879e6a"
      username={props}
      secret={props}
      style={{ height: '500px' }}
     
    /> 
    </div>
    </>
    )
}

export default ChatsPage