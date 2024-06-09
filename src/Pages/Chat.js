import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  // const fetchChats = async () => {
  //   try {
  //     const response = await axios.get("/api/chats");
  //     setChats(response.data);
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div className='ChatCSS'>
      {/* <h1>Chat List:</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>
            {chat._id}    : {chat.chatName}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ChatPage;
