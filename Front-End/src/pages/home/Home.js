import React, { useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";
import MedsCard from '../../components/MedsCard';
import axios from 'axios';
import { Alert, Spinner } from 'react-bootstrap';


const Home = () => {
    const [meds, setMeds] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
      });

    useEffect(() =>{
        setMeds({...meds,loading:true})
        axios.get("http://localhost:4000/Medicines/",{
            params:{
                search:search
            }
        })
        .then((res)=>{
            console.log(meds);
        setMeds({...meds,results: res.data,loading:false})

        })
        .catch(err=>{
        setMeds({...meds,loading:false,err:"An Error Happened"})
            
        })
    },[meds.reload]);
    const [search, setSearch] = useState("");

    const searchMed =(e)=>{
        e.preventDefault();
        setMeds({...meds,reload:meds.reload+1})
        } 

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
                {/* Filter */}
            <Form onSubmit={searchMed}>
                <Form.Group className='mb-3 d-flex' > 
                    <Form.Control 
                        required
                        type='text' placeholder='Search Meds' className='rounded-0'
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)} />
                    <button className='btn btn-dark rounded-0'>Search</button>
                </Form.Group>
            </Form>
 

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