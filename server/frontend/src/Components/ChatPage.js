import React, { useEffect, useState } from 'react';
import { ChatState } from "../Context/chatProvider";
import { Box } from '@chakra-ui/react';
import SideDrawer from "./MiscLenous/SideDrawer";
import MyChats from './MyChats';
import Chatbox from './Chatbox';

export default function ChatPage() {

    const { user } = ChatState();
    const [fetchAgain, setfetchAgain] = useState(false)

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats fetchAgain={fetchAgain}/>}
                {user && <Chatbox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />}
            </Box>
        </div>
    )
}
