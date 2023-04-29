import React from 'react';
import  Table  from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const ManagePatients = () => {
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Youstina</td>
                        <td>youstinaashraf654@gmail.com</td>
                        <td>01236558947</td>
                        <td>user</td>
                        <td>
                            <Link to={"5"}  className='btn btn-sm btn-primary mx-1'>Update</Link>
                            <button className='btn btn-sm btn-secondary mx-1'>Request</button>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
        </div>
    );
};

export default ManagePatients;