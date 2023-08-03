export interface Column {
    id: 'account' | 'projectName' | 'team' | 'division' | 'divisionLeader' | 'divisionHeadOfPM' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify';
}

export interface IProject {
    id: number,
    accountName: string,
    accountTier: string,
    projectName: string,
    projectLogo: string,
    projectTeam: number,
    divisionName: string,
    divisionLead: string,
    divisionHeadOfPM: string
}