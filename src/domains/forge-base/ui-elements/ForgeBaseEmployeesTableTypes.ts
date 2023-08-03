import { IEmployeeData, IPaginationData } from "../ForgBaseScreen";

interface IProject {
    [key: string]: string;
}

export interface IPosition {
    id: number,
    name: string;
    shortName: string;
    isPMPosition: boolean;
}

export interface IEmployee {
    id: number;
    fullName: string;
    email: string;
    positions: IPosition[];
    divisionName: string;
    divisionId: number;
    ads: IProject[];
}

export interface Column {
    id: 'name' | 'positions' | 'division' | 'email' | 'ads' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify';
}

export interface ForgBaseEmployeesTableProps {
    employeesData: IEmployeeData;
    paginationData: IPaginationData;
}