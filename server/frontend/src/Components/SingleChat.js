import { ArrowBackIcon } from '@chakra-ui/icons';
import "./style.css";
import { Toast, useToast } from '@chakra-ui/react';
import { Box, FormControl, IconButton, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider'
import { getSender, getSenderFull } from '../config/ChatLogic';
import ProfileModel from './MiscLenous/ProfileModel';
import UpdateGroupChatModal from './MiscLenous/UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';

export default function SingleChat({ fetchAgain, setfetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const toast = useToast();


    useEffect(() => {
        fetchMessage();

    }, [selectedChat]);


    const fetchMessage = async () => {

        if (!selectedChat) {
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };

            setLoading(true);

            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

            console.log(messages);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }

    }

    const sendMessage = async (e) => {

        if (e.key === "Enter" && newMessage) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                setNewMessage("")
                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                console.log(data);
                setMessages([...messages, data]);

            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    }

    const typingHandler = async (e) => {
        setNewMessage(e.target.value);
    }

    return (
        <>
            {
                selectedChat ?
                    <div>
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            pb={3}
                            px={2}
                            w="100%"
                            fontFamily="Work sans"
                            d="flex"
                            justifyContent={{ base: "space-between" }}
                            alignItems="center"
                        >

                            <IconButton
                                d={{ base: "flex", md: "none" }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectedChat("")}
                            />
                            {
                                (!selectedChat.isGroupChat ? (
                                    <>
                                        {getSender(user, selectedChat.user)}
                                        <ProfileModel user={getSenderFull(user, selectedChat.user)}
                                        />

                                    </>
                                ) : (
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        <UpdateGroupChatModal
                                            fetchAgain={fetchAgain}
                                            setfetchAgain={setfetchAgain}
                                            fetchMessage={fetchMessage}
                                        />
                                    </>
                                ))}

                        </Text>

                        <Box
                            d="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                            p={3}
                            bg="#E8E8E8"
                            w="100%"
                            h="100%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            {
                                loading ? <div>Loading</div> :
                                    <div className="messages">
                                        <ScrollableChat messages={messages} />
                                    </div>
                            }

                            <FormControl onKeyDown={sendMessage} id="first-name" isRequired mt={3}>
                                <Input
                                    variant="filled"
                                    bg="#E0E0E0"
                                    placeholder="Enter a message.."
                                    value={newMessage}
                                    onChange={typingHandler}
                                />
                            </FormControl>
                        </Box>
                    </div>
                    :
                    (
                        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                                Click on a user to start chatting
                            </Text>
                        </Box>
                    )
            }
        </>
    )
}
