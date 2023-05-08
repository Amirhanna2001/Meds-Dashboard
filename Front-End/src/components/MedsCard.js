import React from 'react';
import Card from 'react-bootstrap/Card';
import { Form, Link } from 'react-router-dom';
import "../css/MedsCard.css";
import { Button } from 'react-bootstrap';
import getURL from '../helper/SiteURL'
import { getAuthUser } from '../helper/Storage';
import axios from 'axios';

const MedsCard = (prop) => {

    console.log(prop.ID);
    const user = getAuthUser();
    const AddRequest =async ()=>{
        let token = user.token;
        console.log(token);
        let id =await axios.post(`http://localhost:4000/Requests/33`,{},{headers:{
            token:token
    }
        });
        console.log("This is "+id);
    }
    
    return (
        <div>
                <Card>
                    <Card.Img className='card-image' variant='top' src={"http://localhost:4000/"+prop.image_url}  />
                    <Card.Body>
                        <Card.Title>{prop.Name}</Card.Title>
                        <Card.Text>
                            {prop.Description}
                        </Card.Text>

                        <div className='d-flex justify-content-between'>
                            <Link className='btn btn-dark ' to={"/"+prop.ID}>Details</Link>
                            <Form onSubmit={AddRequest()}>
                                <Button
                                onClick={()=>AddRequest()}

                                    className="btn btn-dark"
                                    variant="primary"
                                    type="submit"
                                    >
                                    Request
                                </Button>
                            </Form>
                        </div>
                        
                    </Card.Body>
                </Card>
        </div>
    );
};

export default MedsCard;