import React from 'react';
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const ManageCategoriesMeds = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Categories medicines</h3>
                <Link to={'add'} className='btn btn-success'>Add New Category medicines</Link>
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
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>OscalD</td>
                        <td>
                        What is Os-Cal Extra D3 ?<br />
                        Calcium is a mineral that is necessary for many functions of the body, 
                        especially bone formation and maintenance.<br />Vitamin D helps the body absorb calcium.<br />
                        Os-Cal Extra D3 is used to treat or prevent a calcium deficiency.<br />
                        There are many brands and forms of calcium and vitamin D combination available. 
                        Not all brands are listed on this leaflet.<br />
                        </td>
                        <td>
                            <Link to={"/5"}  className='btn btn-sm btn-info mx-1'>Show</Link>
                            <Link to={"5"}  className='btn btn-sm btn-primary mx-1'>Update</Link>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                </tbody>

            </Table>

        </div>
    );
};

export default ManageCategoriesMeds;