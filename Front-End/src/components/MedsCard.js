import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import "../css/MedsCard.css";

const MedsCard = () => {
    return (
        <div>
            <Card>
                <Card.Img className='card-image' variant='top' src="https://th.bing.com/th/id/R.3ec869fe659b07f30ee606112b5978cf?rik=%2fMjeX6fAaaXnOA&pid=ImgRaw&r=0" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to bulid on hte card title and make up the bulk of the card's content.
                    </Card.Text>

                    <Link className='btn btn-dark w-100' to={"/5"}>Show More</Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MedsCard;