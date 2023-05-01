import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import "../css/MedsCard.css";

const MedsCard = (prop) => {
    return (
        <div>
            <Card>
                <Card.Img className='card-image' variant='top' src={"http://localhost:4000/"+prop.image_url}  />
                <Card.Body>
                    <Card.Title>{prop.Name}</Card.Title>
                    <Card.Text>
                        {prop.Description}
                    </Card.Text>

                    <Link className='btn btn-dark w-100' to={"/"+prop.ID}>Details</Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MedsCard;