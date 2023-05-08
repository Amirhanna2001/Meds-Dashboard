import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import MedsCard from '../../components/MedsCard';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import  Table  from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../helper/Storage';

const History = () => { 
    const auth = getAuthUser();
    const [hist, sethist] = useState({
      loading: true,
      results: [],
      err: null,
      reload: 0, 
    });

    useEffect(() => {
      console.log(History.results);
        sethist({ ...hist, loading: true });
        axios
          .get(`http://localhost:4000/Requests/history/${auth.ID}`)
          .then((resp) => {
            sethist({ ...hist, results: resp.data, loading: false, err: null });
          })
          .catch((err) => {
            sethist({
              ...hist,
              loading: false,
              err: " something went wrong, please try again later ! ",
            });
          });
      }, [hist.reload]);
    
      const deleteHist = (id) => {
        axios
          .delete("http://localhost:4000/Requests/DeleteHistory/"+ id, {
            headers: {
              token: auth.token,
            },
          })
          .then((resp) => {
            sethist({ ...hist, reload: hist.reload + 1 });
          })
          .catch((err) => {});
      };
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>History Patients</h3>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Medicine</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {hist.results.map((med) => (
            <tr key={med.ID}>
              <td>{med.ID}</td>
              <td> {med.Searched} </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteHist(med.ID);
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
                </tbody>
            </Table>
            
        </div>
    );
};

export default History;