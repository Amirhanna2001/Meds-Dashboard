import React, { useState, useEffect } from "react";
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { getURL } from '../../helper/SiteURL';
import { getAuthUser } from '../../helper/Storage';
import axios from "axios";

const ManageMeds = () => {
    const auth = getAuthUser();
  const [meds, setMeds] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setMeds({ ...meds, loading: true });
    axios
      .get("http://localhost:4000/Medicines/")
      .then((resp) => {
        setMeds({ ...meds, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMeds({
          ...meds,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [meds.reload]);

  const deleteMed = (id) => {
    axios
      .delete("http://localhost:4000/Medicines/"+ id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setMeds({ ...meds, reload: meds.reload + 1 });
      }) 
      .catch((err) => {});
  };

    return (
        <div className='manage-meds p-5'> 
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Medicines</h3>
                <Link to={'add'} className='btn btn-success'>Add New medicines</Link>
            </div>

            {/* <Alert variant="danger" className="p-2">
                This is simple alert
            </Alert>

            <Alert variant="success" className="p-2">
                This is simple alert
            </Alert> */}

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
          {meds.results.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>
                <img
                  src={"http://localhost:4000/"+med.image_url}
                  alt={med.Name}
                  className="image-avatar"
                />
              </td>
              <td> {med.Name} </td>
              <td>{med.Description}</td>
              <td>{med.Price} $</td>
              <td>{med.ExpireDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteMed(med.ID);
                  }}>
                  Delete
                </button>
                <Link
                  to={"" + med.ID}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                <Link to={"/" + med.ID} className="btn btn-sm btn-info">
                  show
                </Link>
              </td>
            </tr>
          ))}
                    
                </tbody>
            </Table>
        </div> 
    );
};

export default ManageMeds;