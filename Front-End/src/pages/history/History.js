import React from 'react';
import  Table  from 'react-bootstrap/Table';

const History = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>History Patients</h3>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Medicines</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Panadol</td>
                        <td>25/06/2024</td>
                        <td>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
        </div>
    );
};

export default History;