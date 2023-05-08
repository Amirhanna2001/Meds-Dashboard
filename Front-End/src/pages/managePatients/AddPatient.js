import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddPatient = () => {
    const auth = getAuthUser();
    const [user, setuser] = useState({

      Name: "",
      email: "",
      password: "",
      phone: "",
      err: "",
      loading: false,
      success: null,
    });
  
    const image = useRef(null);
  
    const createUser = (e) => {
      e.preventDefault();
  
      setuser({ ...user, loading: true });
  
      const formData = new FormData();
      formData.append("Name", user.Name);
      formData.append("email", user.email);
      formData.append("role", user.role);
      formData.append("phone", user.phone);
      if (image.current.files && image.current.files[0]) {
        formData.append("Image", image.current.files[0]);
      }
      axios
        .post("http://localhost:4000/Users/", formData, {
          headers: {
            token: auth.token,
          },
        })
        .then((resp) => {
          setuser({
            Name: "",
            email: "",
            password: "",
            phone: "",
            err: "",
            loading: false,
            success: "Medicine Created Successfully !",
          });
          image.current.value = null;
        })
        .catch((err) => {
          setuser({
            ...user,
            loading: false,
            success: null,
            err: "Something went wrong, please try again later !",
          });
        });
    };
    return ( 
        <div className='login-container'>
            <h1>Add New Patient</h1>
            <Alert variant="danger" className="p-2">
                This is simple alert
            </Alert>

            <Alert variant="success" className="p-2">
                This is simple alert
            </Alert>

            <Form >
                <Form.Group className="mb-3" controlId="register-name">
                    <Form.Label>Name : </Form.Label>
                    <Form.Control type="text" placeholder="Full Name : " />
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-email">
                    <Form.Label>Email : </Form.Label>
                    <Form.Control type="email" placeholder="Email : " />
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-phone">
                    <Form.Label>phone : </Form.Label>
                    <Form.Control type="number" placeholder="Phone : " />
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-name">
                    <Form.Label>Type : </Form.Label>
                    <Form.Control type="text" placeholder="Role" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="register-name">
                    <Form.Label>Password : </Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>

                <Button variant="btn btn-dark w-40" type="submit">
                    Add New Patient
                </Button>
            </Form>
            
        </div>
    );
};

export default AddPatient;