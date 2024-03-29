import React, { useState, useEffect } from "react";
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../helper/Storage';
import axios from "axios";

const ManagePatients = () => {
    const auth = getAuthUser();
    const [users, setUsers] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0,
    });

    useEffect(() => {
        setUsers({ ...users, loading: true });
        axios
          .get("http://localhost:4000/Users/")
          .then((resp) => {
            setUsers({ ...users, results: resp.data, loading: false, err: null });
          })
          .catch((err) => {
            setUsers({
              ...users,
              loading: false,
              err: " something went wrong, please try again later ! ",
            });
          });
      }, [users.reload]);
    
      const deleteUser = (id) => {
        axios
          .delete("http://localhost:4000/Users/"+ id, {
            headers: {
              token: auth.token,
            },
          })
          .then((resp) => {
            setUsers({ ...users, reload: users.reload + 1 });
          })
          .catch((err) => {});
      };
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Patients</h3>
                <Link to={'add'} className='btn btn-success'>Add New Patient</Link>
            </div>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.results.map((cat) => (
            <tr key={cat.Id}>
              <td>{cat.Id}</td>
              <td> {cat.Name} </td> 
              <td>{cat.email}</td>
              <td>{cat.phone}</td>
              <td>{cat.role === 1?"Admin":"User"}</td>


              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteUser(cat.ID);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + cat.ID}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
              </td>
            </tr>
          ))}
                </tbody>
            </Table>
            
        </div>
    );
};

export default ManagePatients;