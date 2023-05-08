import "../../css/MedsDetails.css";
import { useParams } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';

const MedsDetails = () => {
    let { id } = useParams();
    const [med, setMed] = useState({
        loading: true,
        result: null,
        err: null,
      });
    

      useEffect(() => {
        setMed({ ...med, loading: true });
        axios
          .get("http://localhost:4000/Medicines/" + id)
          .then((resp) => {
            console.log(resp);
            setMed({ ...med, result: resp.data, loading: false, err: null });
          })
          .catch((err) => {
            setMed({
              ...med,
              loading: false,
              err: "OOPS  An Error Happened ",
            });
          });
      }, []);
    return (
        
        <div className='home-container p-5'>
            {med.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {
        med.loading === false &&med.err == null &&(
           
        <div className='meds=details-container p-5'>
            <div className='row'>
                {/*Details Meds */}
                <div className='col-3'>
                <img  className='meds-image' alt={med.result[0].Name}
                src= {"http://localhost:4000/"+med.result[0].image_url}/>
                </div>
                
                <div className='col-9'>
                    <h3>{med.result[0].Name}</h3>
                    <h4>Price : {med.result[0].Price} $</h4>
                    <p>
                        {med.result[0].Description}
                    </p>
                    <p>Expire Date : {med.result[0].ExpireDate} </p>
                    
                </div>
            </div>
        </div>)}
        {/* TODO:Return error msg from db */}
        {med.loading === false && med.err != null && (
        <Alert variant="danger" className="p-2">
          {med.err}
        </Alert>
      )}
        </div>
    )}


export default MedsDetails;