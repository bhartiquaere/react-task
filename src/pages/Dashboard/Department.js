import React, { useEffect, useState } from 'react'
import { Head } from '../../component/Head';
import { CreateDepartmentAPI, DeleteDepartmentAPI, GetDepartmentListAPI, getDepartmentListAPI } from '../../api';
import { Badge, Button, Col, Form, Label, Row } from 'reactstrap';
import { FaTrash, FaRegEdit, FaPlus, FaMinus } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import CreatableSelect from "react-select/creatable";
import MyDataTable from '../../pageComponents/table/MyDataTable';
import { toast } from "react-toastify";
const Department = () => {
    const [open, setOpen] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [data, setData] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm();
    const columns = [
        {
            name: <h4>Department</h4>,
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: <h4>Status</h4>,
            selector: (row) => row.status,
            cell: (row) => (
                <Badge color={`outline-${row.status === true ? "success" : "danger"}`}>
                    {row.status === true ? "Active" : "InActive"}
                </Badge>
            ),
            sortable: true,
        },
        {
            name: <h4>Action</h4>,
            cell: (row) => (
                <div>
                    <Button outline color={`warning`} className={`me-2`} onClick={() => Edit(row)}>
                        <FaRegEdit />
                    </Button>
                    <Button outline color={`danger`} onClick={() => handleDel(row)} >
                        <FaTrash />
                    </Button>
                </div>
            ),
            sortable: true,
        },
    ];
    const handleDel = (element) => {
console.log(element,"---del")
        const data = {
        id:element.id,
        }
        console.log(element,"del")
        DeleteDepartmentAPI(data)
            .then((res) => {
                if (res.data.status === "Success") {
                    getDepartment();
                    toast.success(res.data.data.message)
                } else {
                    console.log("Failed To Delete.")
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    const Edit = (data) => {
        console.log(data, "edit----")
        setOpen(true);
        setValue("id", data.id);
        setValue("status", { value: data.status === true, label: data.status === true ? "Active" : "Inactive" });
        setValue("department_name", data.name);
    }
    useEffect(() => {
        // getDepartmentList()
        getDepartment();
    }, []);

    const getDepartmentList = () => {
        getDepartmentListAPI()
            .then((res) => {
                if (res.data.status === "Success") {
                    setDepartmentList(res?.data?.data)
                    console.log(res.data.data)
                    toast.success(res.data.message)
                } else {
                    console.log("Failed To Fetch .");
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getDepartment = () => {
        GetDepartmentListAPI()
            .then((res) => {
                if (res.data.status === "Success") {
                    console.log(res.data.data)
                    setData(res.data.data);
                    setOpen(false)
                } else {
                    console.log("errr");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleStatusChange = (e) => {
        setValue("status", e || "");
        trigger("status");
    };

    const onFormSubmit = (e) => {
        const data = {
            name: e.department_name,
            status: e.status.value,
        };
        console.log(data, "-----")
        CreateDepartmentAPI(data)
            .then((res) => {
                if (res.data.status === "Success") {
                    getDepartment();
                    toast.success("Successfull")
                } else {
                    console.log("error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                onClick={() => {
                                    setOpen(!open);
                                    reset()
                                }}
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
                                            {...register("status", { required: true })}
                                            options={[
                                                { value: false, label: "InActive" },
                                                { value: true, label: "Active" },
                                            ]}
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
                                <Button color='primary'>
                                    Save
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </div>

            ) : null}
            <hr></hr>
            <MyDataTable
                columns={columns}
                data={data}
            />
        </>
    )
}

export default Department;