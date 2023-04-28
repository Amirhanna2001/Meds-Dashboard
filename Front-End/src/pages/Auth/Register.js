import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  Alert  from 'react-bootstrap/Alert';
import '../../css/Register.css'; 

const Register = () => {
    return  <div className='register-container'>
     <h1>Register Form</h1>
     
     <Alert variant="danger" className="p-2">
        This is simple alert
     </Alert>

     <Form>
      <Form.Group className="mb-3" controlId="register-name">
        <Form.Label>Name: </Form.Label>
        <Form.Control type="text" placeholder="Full Name : " />
      </Form.Group>

      <Form.Group className="mb-3" controlId="register-email">
        <Form.Label>Email: </Form.Label>
        <Form.Control type="email" placeholder="Email : " />
      </Form.Group>

      <Form.Group className="mb-3" controlId="register-phone">
        <Form.Label>phone : </Form.Label>
        <Form.Control type="number" placeholder="Phone : " />
      </Form.Group>

      <Form.Group className="mb-3" controlId="register-password">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" placeholder="Password : " />
      </Form.Group>

      <Button variant="btn btn-dark w-40" type="submit">
        Register
      </Button>
     </Form> 
    </div>
};

export default Register;