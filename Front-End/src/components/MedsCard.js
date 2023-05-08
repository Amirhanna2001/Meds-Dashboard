import React from 'react';
import Card from 'react-bootstrap/Card';
import { Form, Link } from 'react-router-dom';
import "../css/MedsCard.css";
import { Button } from 'react-bootstrap';
import getURL from '../helper/SiteURL'
import { getAuthUser } from '../helper/Storage';
import axios from 'axios';

const MedsCard = (prop) => {

    // console.log(prop.ID);
    const user = getAuthUser();
    console.log(user.token);

    const AddRequest = async (id) => {
        console.log(id);

        const respon =  axios.post(`http://localhost:4000/Requests/NewRequest`,{
            id
        },
            {
                headers: {
                    token: user.token
                }
            });
            console.log(respon);

    }

    return (
        <div>
            <Card>
                <Card.Img className='card-image' variant='top' src={"http://localhost:4000/" + prop.image_url} />
                <Card.Body>
                    <Card.Title>{prop.Name}</Card.Title>
                    <Card.Text>
                        {prop.Description}
                    </Card.Text>

                    <div className='d-flex justify-content-between'>
                        <Link className='btn btn-dark ' to={"/" + prop.ID}>Details</Link>
                        <Button
                            onClick={() => AddRequest(prop.ID)}

                            className="btn btn-dark"
                            variant="primary"
                        >
                            Request
                        </Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default MedsCard;