import React from 'react';
import  Table  from 'react-bootstrap/Table';
import "../../css/ManageMeds.css";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const ManageMeds = () => {
    return (
        <div className='manage-meds p-5'>
            <div className='header d-flex justify-content-between mb-5'>
                <h3 className='text-center mb-3'>Manage Meds</h3>
                <Link to={'add'} className='btn btn-success'>Add New Meds</Link>
            </div>

            <Alert variant="danger" className="p-2">
                This is simple alert
            </Alert>

            <Alert variant="success" className="p-2">
                This is simple alert
            </Alert>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                        <img  className='image-avatar' alt="" 
                src="https://www.drugs.com/images/pills/custom/pill24249-1/os-cal-extra-d3.png" />
                        </td>
                        <td>OscalD</td>
                        <td>
                        What is Os-Cal Extra D3 ?<br />
                        Calcium is a mineral that is necessary for many functions of the body, 
                        especially bone formation and maintenance.<br />Vitamin D helps the body absorb calcium.<br />
                        Os-Cal Extra D3 is used to treat or prevent a calcium deficiency.<br />
                        There are many brands and forms of calcium and vitamin D combination available. 
                        Not all brands are listed on this leaflet.<br />
                        </td>
                        <td>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                            <Link to={"5"}  className='btn btn-sm btn-primary mx-2'>Update</Link>
                            <Link to={"/5"}  className='btn btn-sm btn-info'>Show</Link>
                            <button className='btn btn-sm btn-secondary mt-1'>Request</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                        <img  className='image-avatar' alt="" 
                src="https://th.bing.com/th/id/R.388e117c57832603d4c82f5e1b1cf6ea?rik=bbuow%2fF1rgoJ0g&pid=ImgRaw&r=0" />
                        </td>
                        <td>CataFlam</td>
                        <td>
                        What is Cataflam?<br />
                        Cataflam is a nonsteroidal anti-inflammatory drug (NSAID). 
                        Diclofenac works by reducing substances in the body that cause pain.<br />
                        Cataflam is used to treat mild to moderate pain, or signs and symptoms of osteoarthritis or 
                        rheumatoid arthritis.<br />
                        </td>
                        <td>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                            <Link to={"5"}  className='btn btn-sm btn-primary mx-2'>Update</Link>
                            <Link to={"/5"}  className='btn btn-sm btn-info'>Show</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>
                        <img  className='image-avatar' alt="" 
                src="https://www.zyadda.com/wp-content/uploads/2021/07/53654-1536x1037.png" />
                        </td>
                        <td>Brufen</td>
                        <td>
                        What is Brufen ?<br />
                        Brufen 200 mg & 400 mg tablet is indicated in mild to moderate type of pain such as menstrual pain, 
                        soft tissue injuries.<br />
                        Brufen 200 mg & 400 mg tablet is an anti-inflammatory drug and is indicated in the treatment of fever15.
                        </td>
                        <td>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                            <Link to={"5"}  className='btn btn-sm btn-primary mx-2'>Update</Link>
                            <Link to={"/5"}  className='btn btn-sm btn-info'>Show</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>
                        <img  className='image-avatar' alt="" 
                src="https://th.bing.com/th/id/OIP.LUKToOj4Wp5UOo1C_Zt-xgAAAA?pid=ImgDet&rs=1" />
                        </td>
                        <td>CataFast</td>
                        <td>
                        What is catafast ?<br />
                        a potent non-steroidal anti-inflammatory drug with analgesic property.<br />
                        catafast Sodium produces anti-inflammatory effect by inhibiting cyclooxygenase activity with a 
                        reduction in the tissue prostaglandin.<br />
                        catafast reduces inflammation and by extension reduces nociceptive pain and combats fever. <br />
                        It also increases the risk of developing a gastrointestinal ulcer by inhibiting the production of
                         protective mucus in the stomach.
                        </td>
                        <td>
                            <button className='btn btn-sm btn-danger'>Delete</button>
                            <Link to={"5"}  className='btn btn-sm btn-primary mx-2'>Update</Link>
                            <Link to={"/5"}  className='btn btn-sm btn-info'>Show</Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ManageMeds;