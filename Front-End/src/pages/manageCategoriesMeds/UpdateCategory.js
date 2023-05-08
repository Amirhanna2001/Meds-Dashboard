import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateCategory = () => {
    let { id } = useParams();
    const auth = getAuthUser();
    const [cat, setCat] = useState({

        Name: "",
        Description: "",
        err: "",
        loading: false,
        success: null,
      });
      const UpdateCat = (e) => { 
        e.preventDefault();
    
        setCat({ ...cat, loading: true });
    
        let obj = {
          name:cat.Name,
          description:cat.Description,

        }
        console.log(id);
        axios
          .put(`http://localhost:4000/Categories/${id}`, obj, {
            headers: {
              token: auth.token,
                    },
          })
          .then((resp) => {
            setCat({
              ...cat,
              name: "",
              description: "",
              err: "",
              loading: false,
              success: "Category Updated Successfully !",
              reload: cat.reload + 1
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
      useEffect(() => {
        axios
          .get("http://localhost:4000/Categories/" + id)
          .then((resp) => {
            console.log(resp);
            setCat({
              ...cat,
              Name: resp.data[0].Name,
              Description: resp.data[0].Description,
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
      }, [cat.reload]);
    return (
        <div className='login-container'>
            <h1>Update Category medicines</h1>
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

<Form onSubmit={UpdateCat} className="text-center py-2">

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Category Name"
            value={cat.Name}
            onChange={(e) => setCat({ ...cat, Name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={cat.Description}
            onChange={(e) => setCat({ ...cat, Description: e.target.value })

            }
            rows={5}></textarea>
        </Form.Group>

                <Button variant="btn btn-dark w-100" type="submit">
                    Update Category medicines
                </Button>
            </Form>
            
        </div>
    );
};

export default UpdateCategory;