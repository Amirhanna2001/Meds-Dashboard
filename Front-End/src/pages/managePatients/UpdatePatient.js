import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePatient = () => {
    let { id } = useParams();
  const auth = getAuthUser();
    const [user, setuser] = useState({

      Name: "",
      email: "",
      phone: "",
      err: "",
      loading: false,
      success: null,
    });
  

    const Updateuser = (e) => { 
      e.preventDefault();
  
      setuser({ ...user, loading: true });
        let obj = {
        name:user.Name,
        email:user.email,
        phone:user.phone,

      }
      console.log(id);
      axios
        .put(`http://localhost:4000/Users/${id}`, obj, {
          headers: {
            token: auth.token,
                  },
        })
        .then((resp) => {
          setuser({
            ...user,
            Name: "",
            email: "",
            phone:"",
            err: "",
            loading: false,
            success: "Patient Updated Successfully !",
            reload: user.reload + 1
          });
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
    useEffect(() => {
      axios
        .get(`http://localhost:4000/Users/${id}` )
        .then((resp) => {
          console.log(resp);
          setuser({
            ...user,
            Name: resp.data.Name,
            email: resp.data.email,
            phone:resp.data.phone
          });
          console.log("Seeet");
        })
        .catch((err) => {
          setuser({
            ...user,
            loading: false,
            success: null,
            err: "Something went wrong, please try again later !",
          });
        });
    }, [user.reload]);

    return (
        <div className='login-container'>
            <h1>Update Patient</h1>
            {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}

            <Form onSubmit={Updateuser}>
                <Form.Group className="mb-3" controlId="register-name">
                    <Form.Label>Name : </Form.Label>
                    <Form.Control type="text" placeholder="Full Name : " 
                    value={user.Name}
                        onChange={(e) => setuser({ ...user, Name: e.target.value })}/>
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-email">
                    <Form.Label>Email : </Form.Label>
                    <Form.Control type="email" placeholder="Email : " 
                    value={user.email}
                    onChange={(e) => setuser({ ...user, email: e.target.value })}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-phone">
                    <Form.Label>phone : </Form.Label>
                    <Form.Control type="text" placeholder="Phone : "
                    value={user.phone}
                    onChange={(e) => setuser({ ...user, phone: e.target.value })} />
                </Form.Group>


                <Button variant="btn btn-dark w-40" type="submit">
                    Update Patient
                </Button>
            </Form>
            
        </div>
    );
};

export default UpdatePatient;