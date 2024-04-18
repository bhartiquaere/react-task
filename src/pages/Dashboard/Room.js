import React, { useState } from 'react'
import { Head } from '../../component/Head';
import { Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
const Room = () => {
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
  const handleTowerChange = (e) => {
    setValue("tower", e || "");
    trigger("tower");
  }
  const handleFloorChange = (e) => {
    setValue("floor", e || "");
    trigger("floor");
  };
;

const onFormSubmit =(e)=>{
  console.log(e,"data")
}
  return (
    <>
       <Head title="Master | Room " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Room</h2>
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
            <Form onSubmit={handleSubmit(onFormSubmit)} >
              <Row className='row'>
                <Col md={2}>
                  <Label for="tower">
                   Tower
                  </Label>
                  <CreatableSelect
                    placeholder="Enter Tower "
                    type="text"
                    id="tower"
                    options={[
                      { value: 1, label: "tower1" },
                      { value: 2, label: "tower2" },
                    ]}
                    onChange={handleTowerChange}
                    {...register("tower")}
                    value={watch(`tower`)}
                  />
                  {errors.tower &&
                    <span className="invalid"
                    
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.tower?.message}
                    </span>
                  }
                </Col>
                <Col md={2}>
                  <Label for="floor">
                  Floor
                  </Label>
                  <CreatableSelect
                    placeholder="Enter HOD "
                    type="text"
                    id="floor"
                    options={[
                      { value: 1, label: "4" },
                      { value: 2, label: "7" },
                    ]}
                    onChange={handleFloorChange}
                    {...register("floor")}
                    value={watch(`floor`)}
                  />
                  {errors.floor &&
                    <span className="invalid-error"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.floor?.message}
                    </span>
                  }
                </Col>
                <Col md={2}>
                  <Label for="room">
                  Room Number
                  </Label>
                  <input
                    placeholder="Enter Room No. "
                    type="text"
                    id="room"
                    {...register("room")}
                    className="form-control"
                    value={watch(`room`)}
                  />
                  {errors.room &&
                    <span className="invalid"
                    
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                    >{errors.room?.message}
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
                          {errors.status?.message}
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

export default Room;