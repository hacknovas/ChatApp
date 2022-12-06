import { Container, Box, Text, TabPanels, TabPanel, Tab, TabList, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';

export default function HomePage() {

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) { history.push("/"); }
  }, [history]);

  return (
    <>
      <Container maxW='2xl' bg='blue.600' centerContent>
        <Box padding='4' bg='blue.400' color='black' maxW='md'>
          <Text>Talk Here</Text>
        </Box>

        <Box>
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
                <Login />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
      <br />
    </>


  )
}
