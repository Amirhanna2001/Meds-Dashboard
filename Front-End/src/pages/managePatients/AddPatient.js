import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const AddPatient = () => {
    return (
        <div className='login-container'>
            <h1>Add New Patient</h1>
            <Alert variant="danger" className="p-2">
                This is simple alert
            </Alert>

            <Alert variant="success" className="p-2">
                This is simple alert
            </Alert>

            <Form>
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
                    <Form.Control type="text" placeholder="Full Name : " />
                </Form.Group>

                <Button variant="btn btn-dark w-40" type="submit">
                    Add New Patient
                </Button>
            </Form>
            
        </div>
    );
};

export default AddPatient;