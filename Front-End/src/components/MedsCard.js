import React from 'react';
import Card from 'react-bootstrap/Card';
import { Form, Link } from 'react-router-dom';
import "../css/MedsCard.css";
import { Button } from 'react-bootstrap';
import getURL from '../helper/SiteURL'
import { getAuthUser } from '../helper/Storage';

const MedsCard = (prop) => {
    const user = getAuthUser();
    const [Requests, setRquests] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
      });

    useEffect(() =>{
        setMeds({...Requests,loading:true})
        axios.post(getURL+"Requests/"+user.data.ID,{
            params:{
                
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
    const RequestFun = (e) => {
        e.preventDefault();
        setLogin({ ...login, loading: true, err: [] });
        axios
          .post(SiteURL+"auth/login", {
            email: login.email,
            password: login.password,
          })
          .then((resp) => {
            setLogin({ ...login, loading: false, err: [] });
            setAuthUser(resp.data);
            navigate("/");
          })
          .catch((errors) => {
            setLogin({
              ...login,
              loading: false,
              err: errors.response.data.errors,
            });
          });
      };
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
                        <Form onSubmit={RequestFun}>
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