import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from '../../helper/Storage';
import axios from "axios";
const ManageCategoriesMeds = () => {
  const auth = getAuthUser();
  const [cats, setCats] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setCats({ ...cats, loading: true });
    axios
      .get("http://localhost:4000/Categories/")
      .then((resp) => {
        setCats({ ...cats, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setCats({
          ...cats,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [cats.reload]);

  const deleteCat = (id) => {
    axios
      .delete("http://localhost:4000/Categories/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setCats({ ...cats, reload: cats.reload + 1 });
      })
      .catch((err) => { });
  };
  return (
    <div className='manage-meds p-5'>
      <div className='header d-flex justify-content-between mb-5'>
        <h3 className='text-center mb-3'>Manage Categories medicines</h3>
        <Link to={'add'} className='btn btn-success'>Add New Category medicines</Link>
      </div>

      

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
          {cats.results.map((cat) => (
            <tr key={cat.Id}>
              <td>{cat.Id}</td>
              <td> {cat.Name} </td>
              <td>{cat.Description}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteCat(cat.Id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + cat.Id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                {/* <Link to={"" + cat.Id} className="btn btn-sm btn-info">
                  show
                </Link> */}
              </td>
            </tr>
          ))}

        </tbody>

      </Table>

    </div>
  );
};

export default ManageCategoriesMeds;