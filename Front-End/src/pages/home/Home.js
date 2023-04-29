import React, {  } from 'react';
import Form from "react-bootstrap/Form";
import MedsCard from '../../components/MedsCard';

const Home = () => {

    return (
        <div className='home-container p-5'>
            {/* Filter */}
            <Form>
                <Form.Group className='mb-3 d-flex' >
                    <Form.Control type='text' placeholder='Search Meds' className='rounded-0' />
                    <button className='btn btn-dark rounded-0'>Search</button>
                </Form.Group>
            </Form>
 

            <div className='row'>
                <div className='col-3 card-meds-container'>
                <MedsCard />
                </div>
                <div className='col-3 card-meds-container'>
                <MedsCard />
                </div>
                <div className='col-3 card-meds-container'>
                <MedsCard />
                </div>
            </div>
        </div>
    );
};

export default Home;