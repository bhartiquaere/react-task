import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import DataTable from 'react-data-table-component';
import { getDepartmentListAPI } from '../../api';
import { Badge, Button, Col, Form, Label, Row } from 'reactstrap';
import { FaTrash, FaRegEdit, FaPlus, FaMinus } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import CreatableSelect from "react-select/creatable";
const Department = () => {
    const [open, setOpen] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        getDepartmentList();
    }, [])
    const getDepartmentList = () => {
        getDepartmentListAPI()
            .then((res) => {
                if (res.data.status === "Success") {
                    setDepartmentList(res?.data?.data)
                    console.log(res.data.data)
                } else {
                    console.log("Else response", res.data);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const columns = [
        {
            name: "Department",
            selector: (row) => row.department_name,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
                    {row.status === true ? "Active" : "InActive"}
                </Badge>
            ),
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div>
                    <Button outline color={`warning`} className={`me-2`}>
                        <FaRegEdit />
                    </Button>
                    <Button outline color={`danger`}  >
                        <FaTrash />
                    </Button>
                </div>
            ),
            sortable: true,
        },
    ];
    const handleStatusChange = (e) => {
        setValue("status", e || "");
        trigger("status");
    };

    const onFormSubmit = (e) => {
        const data = {
            name: e.department_name,
            status: e.status.value,
        };
        console.log(data, "create Department");
    };

    return (
        <>
            <Head title="Department Dashboard" />
            <div className={`page-header mb-3`}>
                <div className={`row align-items-center`}>
                    <div className="col-md-4">
                        <h2 className="page-title">Department</h2>
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
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Row>
                            <Col md={5}>

                                <Label for="department">
                                    Deparment
                                </Label>
                                <input
                                    placeholder="Enter Department"
                                    type="text"
                                    id="department_name"
                                    {...register("department_name", { required: true })}
                                    className="form-control"
                                    value={watch(`department_name`)}
                                />
                                <span className="invalid"
                                    style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                >
                                    {errors.department_name?.type === "required" && "Department is Required."}
                                </span>

                            </Col>
                            <Col md={`5`}>
                                <div className="form-group">
                                    <Label className="from-label" htmlFor="status">
                                        Status
                                    </Label>
                                    <div className="form-control-wrap">
                                        <CreatableSelect
                                            className=""
                                            id="status"
                                            options={[
                                                { value: true, label: "Active" },
                                                { value: false, label: "InActive" },
                                            ]}
                                            {...register("status", { required: true })}
                                            onChange={handleStatusChange}
                                            value={watch(`status`)}
                                        />
                                        <span className="invalid"
                                            style={{ color: "#e85347", fontSize: "11px", fontStyle: "italic" }}
                                        >
                                            {errors.status?.type === "required" && "Status is Required."}
                                        </span>
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
                    columns={columns}
                    data={departmentList}
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

export default Department;