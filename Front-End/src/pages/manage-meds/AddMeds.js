import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddMeds = () => {
    const auth = getAuthUser();
    const [med, setMed] = useState({

      Name: "",
      Description: "",
      Price: "",
      ExpireDate: "",
      CategoryId: "",
      err: "",
      loading: false,
      success: null,
    });
  
    const image = useRef(null);
  
    const createMed = (e) => {
      e.preventDefault();
  
      setMed({ ...med, loading: true });
  
      const formData = new FormData();
      formData.append("Name", med.Name);
      formData.append("Description", med.Description);
      formData.append("Price", med.Price);
      formData.append("ExpireDate", med.ExpireDate);
      formData.append("CategoryId", med.CategoryId);
      if (image.current.files && image.current.files[0]) {
        formData.append("Image", image.current.files[0]);
      }
      axios
        .post("http://localhost:4000/Medicines/Create", formData, {
          headers: {
            token: auth.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          setMed({
            Name: "",
            Description: "",
            Price: "",
            ExpireDate: "",
            CategoryId: "",
            err: "",
            loading: false,
            success: "Medicine Created Successfully !",
          });
          image.current.value = null;
        })
        .catch((err) => {
          setMed({
            ...med,
            loading: false,
            success: null,
            err: "Something went wrong, please try again later !",
          });
        });
    };
    return (
        <div className='login-container'>
            <h1>Add New medicine Form</h1>
            {med.err && (
        <Alert variant="danger" className="p-2">
          {med.err}
        </Alert>
      )}

      {med.success && (
        <Alert variant="success" className="p-2">
          {med.success}
        </Alert>
      )}

            <Form onSubmit={createMed}>
        <Form.Group className="mb-3"> 
          <Form.Control
            value={med.Name}
            onChange={(e) => setMed({ ...med, Name: e.target.value })}
            type="text"
            required
            placeholder="Medicine Name"
          />
        </Form.Group>
        

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={med.Description}
            required
            onChange={(e) =>
              setMed({ ...med, Description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={med.Price}
            onChange={(e) => setMed({ ...med, Price: e.target.value })}
            type="text"
            required
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={med.ExpireDate}
            onChange={(e) => setMed({ ...med, ExpireDate: e.target.value })}
            type="Date"
            required
            placeholder="Expire Date"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} required />
        </Form.Group>

                <Button variant="btn btn-dark w-40" type="submit">
                    Add New Medicine
                </Button>
            </Form>
        </div>
    );
};

export default AddMeds;