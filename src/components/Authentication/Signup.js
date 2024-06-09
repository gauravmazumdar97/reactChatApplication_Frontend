import { Button, FormControl, Toast, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, sconfirmPassword] = useState();
  const [loading, setLoading] = useState();
  const [profilePic, setProfilePic] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


// Upload the image with pre-signed url
  const postDetails = async () => {

    if (profilePic.type === 'image/jpeg' || profilePic.type === 'image/png') {
      try {
        // Get pre-signed URL from the backend
        const { data } = await axios.put('/api/v1/signed-url', {
          email: email,
          folderName: "images",
          fileName: `${profilePic.name.split('.')[0]}_${Date.now()}.${profilePic.name.split('.')[1]}`
        });

        const { url, key } = data.signedUrl;

        // Upload image to S3 using the pre-signed URL
        await fetch(url, {
          method: 'PUT',
          body: profilePic,
          headers: { 'Content-Type': profilePic.type },
        });

        // setPic(key);
        setLoading(false);
        toast({
          title: 'Image Uploaded Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } catch (error) {
        console.log(error);
        toast({
          title: 'Image Upload Failed',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
      }
    } else {
      toast({
        title: 'Please Select a Valid Image',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    }


  };

  // Function to set the image in a variable 
  const setImage = async (image) => {

    setLoading(true);
    const selectedFile = image.target.files[0];

    if (selectedFile === undefined) {
      toast({
        title: 'Please Select an Image',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
      return;

    } else {
      setProfilePic(image.target.files[0]);
      setLoading(false);
    }



  }

// Submitting the Form Data 
  const submitHandler = async () => {

    console.log('Name :', name);
    console.log('Email :', email);
    console.log('Password :', password);
    console.log('profilePic', profilePic);

    if (!name || !email || !password || !profilePic) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      setLoading(false);
      return;

    } else if (password !== confirmpassword) {
      toast({
        title: 'Password do not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else {

      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        }

        const pic = `${profilePic.name.split('.')[0]}_${Date.now()}.${profilePic.name.split('.')[1]}`;


        const { data } = await axios.post("/api/v1/register", { name, email, password, pic }, config);
        await postDetails();

        toast({
          title: 'Registration Successfull',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);

        navigate('/chats')

      } catch (error) {

        toast({
          title: 'Error in Submission',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });

        console.log("Error :=>",error );

        setLoading(false)
      }

    }

  }

  return <VStack spacing={'5px'}  >
    <FormControl id='firstName' isRequired>
      <FormLabel>Name</FormLabel>
      <Input type='text' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
    </FormControl>
    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input type='text' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
    </FormControl>
    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input type={show ? 'text' : 'password'} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
        <InputRightElement width={'4.5rem'} >
          <Button h="1.75rem" size="sm" onClick={() => [setShow(!show)]}> {show ? "Hide" : "Show"} </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <FormControl id='confirmPassword' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input type={show ? 'text' : 'password'} placeholder='Confirm password' onChange={(e) => sconfirmPassword(e.target.value)} />
        <InputRightElement width={'4.5rem'} >
          <Button h="1.75rem" size="sm" onClick={() => [setShow(!show)]}> {show ? "Hide" : "Show"} </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <FormControl id='profilePic' isRequired>
      <FormLabel>Upload Profile</FormLabel>
      <Input type='file' p={1.5} multiple={false} onChange={setImage} />
    </FormControl>

    <Button colorScheme='blue' accept='image/*' isLoading={loading} width={'100%'} style={{ marginTop: 15 }} onClick={() => [submitHandler(!show)]}> Sign Up </Button>

  </VStack>
}

export default Signup