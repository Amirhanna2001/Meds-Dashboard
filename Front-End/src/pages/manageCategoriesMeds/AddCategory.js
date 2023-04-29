import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const AddCategory = () => {
    return (
        <div className='login-container'>
            <h1>Add New Category medicines</h1>
            <Alert variant="danger" className="p-2">
                This is simple alert
            </Alert>

            <Alert variant="success" className="p-2">
                This is simple alert
            </Alert>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name : </Form.Label>
                    <Form.Control type="text" placeholder="Meds Name : " />
                </Form.Group>

                <Form.Group className="mb-3">
                    <textarea className='form-control' placeholder='Description' rows={5}></textarea>
                </Form.Group>

                <Button variant="btn btn-dark w-40" type="submit">
                    Add New Category medicines
                </Button>
            </Form>
            
        </div>
    );
};

export default AddCategory;