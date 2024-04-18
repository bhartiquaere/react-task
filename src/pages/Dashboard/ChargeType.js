import React, { useState } from 'react'
import { Head } from '../../component/Head';
import { Button, Col, Form, Label, Row } from 'reactstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import CreatableSelect from "react-select/creatable";
import { useForm } from 'react-hook-form';
const ChargeType = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const handleChargeType = (e) => {
    setValue("charge_type", e || "");
    trigger("charge_type");
  };
  const handleType = (e) => {
    setValue("type", e || "");
    trigger("type");
  };
  return (
    <>
      <Head title="Master | ChargeType " />
      <div className={`page-header mb-3`}>
        <div className={`row align-items-center`}>
          <div className="col-md-4">
            <h2 className="page-title">Charge Type</h2>
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
        <div className='row'>
          <Form>
            <Row>
              <Col md="2">
                <Label>
                  Charge Type
                </Label>
                <CreatableSelect
                  id="charge_type"
                  options={[
                    { value: 1, label: "Unit Charge" },
                    { value: 2, label: "Regulatory Charge" },
                    { value: 3, label: "Govt. Charge" },
                    { value: 4, label: "Fixed Charge" },
                  ]}
                  {...register("charge_type", { required: true })}
                  onChange={handleChargeType}
                  value={watch(`charge_type`)}
                />
                {errors.charge_type && (
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.charge_type?.message}
                  </span>
                )}
              </Col>
              <Col md={2}>
                  <Label for="chargeAmount">
                  Charge Amount
                  </Label>
                  <input
                    placeholder="Enter Charge Amount "
                    type="text"
                    id="chargeAmount"
                    {...register("chargeAmount")}
                    className="form-control"
                    value={watch(`chargeAmount`)}
                  />
                  {errors.chargeAmount &&
                    <span className="invalid">{errors.chargeAmount?.message}
                    </span>
                  }
                </Col>
              <Col md="2">
                <Label>
                  Type
                </Label>
                <CreatableSelect
                  id="type"
                  options={[
                    { value: 1, label: "Amount" },
                    { value: 2, label: "Percent" },
                  ]}
                  {...register("type", { required: true })}
                  onChange={handleType}
                  value={watch(`type`)}
                />
                {errors.type && (
                  <span
                    className="invalid"
                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                  >
                    {errors.type?.message}
                  </span>
                )}
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
      <DataTable

        subHeader={false}
        persistTableHead
        onColumnOrderChange
        striped={true}
        responsive={true}
        pagination
      />
    </>
  )
}

export default ChargeType;