import React from 'react';
import Card from 'react-bootstrap/Card';
import { Form, Link } from 'react-router-dom';
import "../css/MedsCard.css";
import { Button } from 'react-bootstrap';
import getURL from '../helper/SiteURL'
import { getAuthUser } from '../helper/Storage';

const MedsCard = (prop) => {
    const user = getAuthUser();
    
    
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
                        <Form >
                            <Button
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