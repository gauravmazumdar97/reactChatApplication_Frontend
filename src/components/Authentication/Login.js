import { Button,FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';




const Login = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, confirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);

  const postDetails = (pics)=>{}
  
  const submitHandler = ()=>{}

  return <VStack spacing={'5px'} color={'black'} >
    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input type='text' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
    </FormControl>
    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input type={show?'text':'password'} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
        <InputRightElement width={'4.5rem'} >
          <Button h="1.75rem" size="sm" onClick={()=>[ setShow(!show) ]}> {show ? "Hide" : "Show"} </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    


    <Button colorScheme='blue' width={'100%'} style={{marginTop:15}} onClick={()=>[ submitHandler(!show) ]}> Login </Button>
    
    <Button variant='solid' colorScheme='red' width={'100%'} style={{marginTop:15}} onClick={()=>[ setEmail('guest@example.com'), setPassword('123456') ]}> Get Guest User Credentials </Button>

  </VStack>
}

export default Login