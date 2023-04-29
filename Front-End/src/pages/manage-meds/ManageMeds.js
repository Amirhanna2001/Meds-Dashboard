import React from 'react';
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const ManageMeds = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Medicines</h3>
                <Link to={'add'} className='btn btn-success'>Add New medicines</Link>
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
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Expiration date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                        <img  className='image-avatar' alt="" 
                src="https://www.drugs.com/images/pills/custom/pill24249-1/os-cal-extra-d3.png" />
                        </td>
                        <td>OscalD</td>
                        <td>
                        What is Os-Cal Extra D3 ?<br />
                        Calcium is a mineral that is necessary for many functions of the body,<br />
                        especially bone formation and maintenance.<br />Vitamin D helps the body absorb calcium.<br />
                        </td>
                        <td>50 EGP</td>
                        <td>20/05/2023</td>
                        <td>
                            <Link to={"/5"}  className='btn btn-sm btn-info mx-1'>Show</Link>
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

export default ManageMeds;