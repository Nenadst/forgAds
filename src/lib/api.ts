import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://forgbe.azurewebsites.net/api' || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

const endpoints = {
    employees: '/employees',
    positions: '/positions',
    users: '/users',
    USERrepresentatives: '/USERrepresentatives',
    divisions: '/divisions',
    ads: '/ads',
};

/*
 *Employees
 */
export const getEmployees = (startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.employees}?startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const createEmployee = (employeeData: any) =>
    axiosInstance
        .post(endpoints.employees, employeeData)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const getEmployee = (employeeId: number) =>
    axiosInstance
        .get(`${endpoints.employees}/${employeeId}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const updateEmployee = (employeeId: number, employeeData: any) =>
    axiosInstance
        .put(`${endpoints.employees}/${employeeId}`, employeeData)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const removeEmployee = (employeeId: number) =>
    axiosInstance
        .delete(`${endpoints.employees}/${employeeId}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Positions
 */
export const getPositions = () =>
    axiosInstance
        .get(endpoints.positions)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Users
 */
export const getUsers = (startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.users}?startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const createUSER = (USERData: any) =>
    axiosInstance
        .post(endpoints.users, USERData)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *USERrepresentatives
 */
export const getUSERRepresentatives = (USERId: number, startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.USERrepresentatives}?companyId=${USERId}&startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Divisions
 */
export const getDivisions = (startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.divisions}?startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Ads
 */
export const getAds = (accountId: string = '', startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.ads}?accountId=${accountId}&startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));
