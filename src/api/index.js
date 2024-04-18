import axios from "axios";

const LOCAL_BASE_URL = "http://pg.demoquaeretech.in/api/"; 
// const LOCAL_BASE_URL = "http://192.168.23.6:9000/api/"; 
const userToken = localStorage.getItem("accessToken");
const token = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + `${userToken}`,
  },
};
export const getLoginAPI = async(data)=>{
    return await axios.post(`${LOCAL_BASE_URL}login`,data);
  }



  export const getDashboardAPI = async(data,token)=>{
    return await axios.post(`${LOCAL_BASE_URL}dashboard`,data,token)
  }


  export const getUserListAPI = async(data,token)=>{
    return await axios.post(`${LOCAL_BASE_URL}users-list`,data,token)
  }

  export const getDepartmentListAPI=async(data,token)=>{
    return await axios.post(`${LOCAL_BASE_URL}department-list`,data,token)
  }

export const getDesignationListAPI =async(data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}designation-list`,data,token)
}
export const getHODListAPI=async(data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}headDepartment-list`,data,token)
}

  export const getDesignationListByDepartmentAPI = async (data, token) => {
    return await axios.post(`${LOCAL_BASE_URL}get-departmentByDesignation`, data, token);
  };

  export const getHODListByDesignationAPI = async (data, token) => {
    return await axios.post(`${LOCAL_BASE_URL}get-hodByDesignation`, data, token);
  };

  