import { IDivisionsData, IPaginationData } from '../ForgBaseScreen';

interface IUSER {
    [key: string]: string;
}

interface IDivisionLead {
    fullName: string;
}

interface IHeadOfPM {
    fullName: string;
}

export interface IDivision {
    id: number;
    name: string;
    numberOfEmployees: number;
    divisionLead: IDivisionLead;
    headOfPM: IHeadOfPM;
    employees: IUSER[];
}

export interface Column {
    id: 'name' | 'employees' | 'USERCompanies' | 'divisionLeader' | 'divisionHeadOfPM' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify';
}

export interface Data {
    id: number;
    name: string;
    employees: number;
    USERCompanies: React.ReactElement;
    divisionLeader: React.ReactElement;
    divisionHeadOfPM: React.ReactElement;
    actions: React.ReactElement;
}

export interface ForgBaseDivisionsTableProps {
    divisionsData: IDivisionsData;
    paginationData: IPaginationData;
}
