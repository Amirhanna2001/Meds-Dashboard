import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateMeds  = () => {
    let { id } = useParams();
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

  const updateMed = (e) => {
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
      .put("http://localhost:4000/Medicines/Edit/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setMed({
          ...med,
          loading: false,
          success: "Medicine updated successfully !",
          reload: med.reload + 1,
        });
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/Medicines/GetMedicine/" + id)
      .then((resp) => {
        setMed({
          ...med,
          Name: resp.data.Name,
          Description: resp.data.Description,
          image_url: resp.data.image_url,
          Price:resp.data.Price,
          ExpireDate:resp.data.ExpireDate,
          CategoryId:resp.data.CategoryId
        });
      })
      .catch((err) => {
        setMed({
          ...med,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [med.reload]);

  return (
    <div className="login-container">
      <h1>Update Medicine Form</h1>

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

<Form onSubmit={updateMed} className="text-center py-2">
        <img
          alt={med.Name}
          style={{
            width: "50%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={"http://localhost:4000/"+med.image_url}
        />

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Med Name"
            value={med.Name}
            onChange={(e) => setMed({ ...med, Name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={med.Description}
            onChange={(e) => setMed({ ...med, Description: e.target.value })

            }
            rows={5}></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={image} />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Movie
        </Button>
      </Form>
    </div>
  );
};

export default UpdateMeds;