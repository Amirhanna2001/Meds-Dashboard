import React from 'react';
import  Table  from 'react-bootstrap/Table';

const Request = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Request Patients</h3>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Medicines</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Panadol</td>
                        <td>Accept</td>
                        <td>
                            <button className='btn btn-sm btn-danger m-1'>Delete</button>
                            <button className='btn btn-sm btn-primary m-1'>Accept</button>

                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default Request;