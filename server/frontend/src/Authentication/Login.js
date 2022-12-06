import { Button, FormControl,useToast, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack } from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";


export default function Login() {

    const [show, setshow] = useState(false)

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [loading, setloading] = useState(false);
    const history = useHistory();
    const toast = useToast();

    const submitHandler = async () => {
        setloading(true);
        if (!email || !pass) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setloading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, pass },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setloading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setloading(false);
        }

    }

    return (
        <VStack divider={<StackDivider borderColor='gray.200' />} spacing="5px" align='stretch'>

            <FormControl id="_email">
                <FormLabel>Email</FormLabel>
                <Input placeholder={email} onChange={(e) => {
                    setemail(e.target.value)
                }}></Input>
            </FormControl>


            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder={pass} type={show ? "text" : "password"} onChange={(e) => {
                        setpass(e.target.value)
                    }}></Input>
                    <InputRightElement>
                        <Button onClick={() => {
                            show ? setshow(false) : setshow(true);
                        }}>
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>


            <Button onClick={submitHandler}>
                Login
            </Button>
            <Button onClick={() => {
                setemail("guest@example.com");
                setpass("12345");
            }}>
                Click to guest User
            </Button>
        </VStack>

    )
}
