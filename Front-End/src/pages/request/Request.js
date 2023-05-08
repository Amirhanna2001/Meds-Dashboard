import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import MedsCard from '../../components/MedsCard';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import  Table  from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../helper/Storage';

const Request = () => {
    const auth = getAuthUser()
    const [meds, setMeds] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
      });

    useEffect(() =>{
        setMeds({...meds,loading:true})
        axios.get("http://localhost:4000/Requests",{
            headers: {
                token: auth.token,
              },
        })
        .then((resp)=>{
            console.log(resp);
        setMeds({...meds,results: resp.data,loading:false,err:null})

        })
        .catch(err=>{
        setMeds({...meds,loading:false,err:"An Error Happened"})
            
        })
    },[meds.reload]);
    console.log(meds);

    const deleteMeds = (id) => {
        axios
          .put("http://localhost:4000/Requests/Refuse/" + id, {
            
              token: auth.token,
            
          }) 
          .then((resp) => {
            setMeds({ ...meds, reload: meds.reload + 1 });
          })
          .catch((err) => { });
      };
      const Accept = (id) => {
        axios
          .put("http://localhost:4000/Requests/Accept/" + id, {
            headers: {
              token: auth.token,
            },
          }
          )
          .then((resp) => {
            setMeds({ ...meds, reload: meds.reload + 1 });
          })
          .catch((err) => { });
      };
      const Delete = (id) => {
        axios
          .delete("http://localhost:4000/Requests/" + id, {
            headers: {
              token: auth.token,
            },
          }
          )
          .then((resp) => {
            setMeds({ ...meds, reload: meds.reload + 1 });
          })
          .catch((err) => { });
      };
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Request Patients</h3>
            </div>

            <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Medicine ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meds.results.map((cat) => (
            <tr key={cat.ID}>
              <td>{cat.ID}</td>
              <td> {cat.medicine_id} </td>
              <td>{cat.request_status===0?"Painding":cat.request_status===1?"Acccepted":"Rejected"}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteMeds(cat.ID);
                  }}>
                  Refuse
                </button>
                <button
                  className="btn btn-sm btn-primary m-2"
                  onClick={(e) => {
                    Accept(cat.ID);
                  }}>
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-danger m-2"
                  onClick={(e) => {
                    Delete(cat.ID);
                  }}>
                  Delete
                </button>
                
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

export default Request;