import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const AddMeds = () => {
  const auth = getAuthUser();

  const [med, setMed] = useState({
    Name: "",
    Description: "", 
    Price: "",
    ExpireDate: "",
    CategoryId: "",
    image_url:null,
    err: "",
    loading: false,
    success: null,

  });

  const image = useRef(null);

  const createMed = async (e) => {
    e.preventDefault();

    setMed({ ...med, loading: true });
    console.log(med);
    const formData = new FormData();
    formData.append("Name", med.Name);
    formData.append("Description", med.Description);
    formData.append("price", med.Price);
    formData.append("ExpireDate", med.ExpireDate);
    formData.append("CategoryId", med.CategoryId);
    formData.append("image_url",med.image_url);
    console.log(formData);
      axios.post("http://localhost:4000/Medicines", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
        setMed({
        Name: "",
        Description: "",
        Price: "",
        ExpireDate: "",
        CategoryId: "",
        err: "",
        loading: false,
        success: "Medicine Created Successfully!",
      });
      image.current.value = null;})
       .catch ((error)=>{
      // console.error(error.response);
      setMed({
        ...med,
        loading: false,
        success: null,
        err: "Something went wrong, please try again laterrr!",
      });
    });
  };

  return (
    <div className="login-container">
      <h1>Add New Medicine Form</h1>

      {med.err && <Alert variant="danger" className="p-2">{med.err}</Alert>}
      {med.success && <Alert variant="success" className="p-2">{med.success}</Alert>}

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
            onChange={(e) => setMed({ ...med, Description: e.target.value })}
            rows={5}
          ></textarea>
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
            value={med.CategoryId}
            onChange={(e) => setMed({ ...med, CategoryId: e.target.value })}
            type="number"
            required
            placeholder="Category ID"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={med.ExpireDate}
            onChange={(e) => setMed({ ...med, ExpireDate: e.target.value })}
            type="date"
            required
            placeholder="Expire Date"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" 
            onChange={(e) => setMed({ ...med, image_url: e.target.files[0] })}
           />
        </Form.Group>

        <Button variant="dark" type="submit">
          Add New Medicine
        </Button>
      </Form>
    </div>
  );
};

export default AddMeds;
