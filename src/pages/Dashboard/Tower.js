import React, { useState } from 'react'
import { Head } from '../../component/Head';
import { Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
const Tower = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const handleStatusChange = (e) => {
    setValue("status", e || "");
    trigger("status");
  };
  const onFormSubmit = (e) => {
    console.log(e, "------");
  };

  return (
  <>
    <Head title="Master | Tower " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Tower</h2>
          </div>
          <div className="col-md-8 float-end ms-auto">
            <div className="d-flex title-head">
              <Button color={`primary`}
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <FaMinus />
                ) : <FaPlus />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {open ? (
          <div className={`row`}>
            <Form  onSubmit={handleSubmit(onFormSubmit)}>
              <Row className='row'>
                <Col md={2}>
                  <Label for="tower">
                   Tower
                  </Label>
                  <input
                    placeholder="Enter Tower "
                    type="text"
                    id="tower"
                    {...register("tower",{required:true})}
                    className="form-control"
                    value={watch(`tower`)}
                  />
                  {errors.tower &&
                    <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.tower?.type==="required" && "Tower is Required." }
                    </span>
                  }
                </Col>
                <Col md={2}>
                  <Label for="location">
               Location
                  </Label>
                  <input
                    placeholder="Enter Location "
                    type="text"
                    id="location"
                    {...register("location",{required:true})}
                    className="form-control"
                    value={watch(`location`)}
                  />
              
                    <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.location?.type==="required" && "Location is Required."}
                    </span>
                  
                </Col>
                <Col md={2}>
                  <Label for="floor">
                  Floor
                  </Label>
                  <input
                    placeholder="Enter Floor "
                    type="text"
                    id="floor"
                    {...register("floor",{required:true})}
                    className="form-control"
                    value={watch(`floor`)}
                  />
                
                    <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.floor?.type==="required" && "Floor is Required."}
                    </span>
              
                </Col>
                <Col md={2}>
                  <Label for="kv">
                  KV
                  </Label>
                  <input
                    placeholder="Enter KV "
                    type="text"
                    id="kv"
                    {...register("kv",{required:true})}
                    className="form-control"
                    value={watch(`kv`)}
                  />
                  {errors.kv &&
                    <span className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.kv?.type==="required" && "Kv is Required."}
                    </span>
                  }
                </Col>
                <Col md={2}>
                  <div className="form-group">
                    <Label className="from-label" htmlFor="status">
                      Status
                    </Label>
                    <div className="form-control-wrap">
                      <CreatableSelect
                       
                        id="status"
                        options={[
                          { value: true, label: "Active" },
                          { value: false, label: "InActive" },
                        ]}
                        {...register("status", { required: true })}
                        onChange={handleStatusChange}
                        value={watch(`status`)}
                      />
                      {errors.status && (
                        <span
                          className="invalid"
                          style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                        >
                          {errors.status?.type==="required" && "Status is Required."}
                        </span>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md={2} className='mt-4'>
                  <Button color='primary' type='submit'>
                    Save
                  </Button>
                </Col>
              </Row>

            </Form>
          </div>
      ) : null}
      <hr></hr>
      <div className={`row`}>
        <DataTable
          
          subHeader={false}
          persistTableHead
          onColumnOrderChange
          striped={true}
          responsive={true}
          pagination
        />
      </div>
  </>
  )
}

export default Tower;