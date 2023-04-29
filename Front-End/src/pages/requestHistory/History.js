import React from 'react';
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import Alert from 'react-bootstrap/Alert';

const History = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>History Patients</h3>
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
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </Table>
        </div>
    );
};

export default History;