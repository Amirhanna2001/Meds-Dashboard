import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import MedsCard from '../../components/MedsCard';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const Home = () => {
    let {id} = useParams();
    const [meds, setMeds] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
      });

    useEffect(() =>{
        setMeds({...meds,loading:true})
        axios.get(`http://localhost:4000/Medicines/SameCategory/${id}`,{
        })
        .then((res)=>{
            console.log(meds);
        setMeds({...meds,results: res.data,loading:false})

        })
        .catch(err=>{
        setMeds({...meds,loading:false,err:"An Error Happened"})
            
        })
    },[meds.reload]);

    return (
        <div className='home-container p-5'>
            {meds.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {
        meds.loading === false &&meds.err == null &&(
            <>
            <div className='row'>
               {meds.results.map((med)=>(
                  <div className="col-3 card-movie-container" key={med.ID}>
                    <MedsCard 
                        ID = {med.ID} 
                        Name= {med.Name}
                        Description= {med.Description}
                        Price = {med.Price}
                        ExpireDate =  {med.ExpireDate}
                        CategoryId = {med.CategoryId}
                        image_url = {med.image_url} 
                        
                    />
                  </div>
               ))}
            </div>
            </>
        )}
        {meds.loading === false &&
        meds.err == null &&
        meds.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No Medicines Found !
          </Alert>
        )}
            
        </div>
    );
};

export default Home;