import React from 'react';
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Request = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Patients</h3>
                <Link to={'add'} className='btn btn-success'>Add New Patient</Link>
            </div>

            <Alert variant="danger" className="p-2">
                This is simple alert
            </Alert>

            <Alert variant="success" className="p-2">
                This is simple alert
            </Alert>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Medicines</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </Table>
        </div>
    );
};

export default Request;