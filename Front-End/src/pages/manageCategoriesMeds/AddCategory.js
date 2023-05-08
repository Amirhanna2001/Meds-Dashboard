import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddCategory = () => {
    const auth = getAuthUser();
    const [cat, setCat] = useState({

      name: "",
      description: "",
      err: "",
      loading: false,
      success: null,
    });
  console.log(cat);
  
    const createCat = (e) => {
      e.preventDefault();
      
      setCat({ ...cat, loading: true });
  
      let obj = {
        name:cat.name,
        description:cat.description
      }
      axios
        .post("http://localhost:4000/Categories/", obj, {
          headers: {
            token: auth.token
                  },
        })
        .then((resp) => {
          setCat({
            name: "",
            description: "",
            err: "",
            loading: false,
            success: "Category Created Successfully !",
          });
         })
        .catch((err) => {
          setCat({
            ...cat,
            loading: false,
            success: null,
            err: "Something went wrong, please try again later !",
          });
        });
    };
    return (
        <div className='login-container'>
            <h1>Add New Medicine Category </h1>
            {cat.err && (
        <Alert variant="danger" className="p-2">
          {cat.err}
        </Alert>
      )}

      {cat.success && (
        <Alert variant="success" className="p-2">
          {cat.success}
        </Alert>
      )}

<Form onSubmit={createCat}>
        <Form.Group className="mb-3">
          <Form.Control
            value={cat.name}
            onChange={(e) => setCat({ ...cat, name: e.target.value })}
            type="text"
            required
            placeholder="Category Name"
          />
        </Form.Group>
        

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={cat.description}
            required
            onChange={(e) =>
                setCat({ ...cat, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

                <Button variant="btn btn-dark w-100" type="submit">
                    Add New medicines Category
                </Button>
            </Form>
            
        </div>
    );
};

export default AddCategory;