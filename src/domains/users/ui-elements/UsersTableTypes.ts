import { IUsersData, IPaginationData } from '../UsersScreen';

interface IUSERAccount {
    [key: string]: string;
}

interface IDivisionName {
    name: string;
}

export interface IUSER {
    id: number;
    companyName: string;
    location: string;
    companySize: string;
    website: string;
    division: IDivisionName;
    accounts: IUSERAccount[];
}

export interface Column {
    id: 'USERCompany' | 'companySize' | 'website' | 'USERRepresentatives' | 'accounts' | 'division' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

export interface UsersTableProps {
    usersData: IUsersData;
    paginationData: IPaginationData;
}
