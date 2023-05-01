import React, {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../../css/Login.css';
import axios from 'axios'
const Login = () => {
      const [lognin, setLognin] = useState({
        email:'',
        password:''
      })

      const submit = async()=>{
        const data =await axios.post("http://localhost:4000/auth/login" , lognin)
        console.log(data);
        localStorage(JSON.stringify(data))
      }
  
      
      
  return (
    <div className='login-container'>
      <h1>Login Form</h1>

      <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>
{/* 
      <Alert variant="success" className="p-2">
         This is simple alert
      </Alert> */}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control 
          value={lognin.email}
          onChange={e=>setLognin(
              {
                ...lognin , 
              email: e.target.value
              }
          )
          } type="email" placeholder="Please Enter your Email : " />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
          value={lognin.password}
          onChange={e=>setLognin(
              {
                ...lognin , 
              password: e.target.value
              }
          )
          }
           type="password" placeholder="Please Enter your Password : " />
        </Form.Group>

        <Button onClick={submit} variant="btn btn-dark w-40" type="submit">
          Login
        </Button>
      </Form>

    </div>
  );
};

export default Login;