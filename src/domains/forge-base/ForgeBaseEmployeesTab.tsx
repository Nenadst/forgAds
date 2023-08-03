import { IEmployeesData, IPaginationData } from './ForgBaseScreen';
import ForgBaseEmployeesTable from './ui-elements/ForgBaseEmployeesTable';

interface ForgBaseEmployeesTabProps {
    employeesData: IEmployeesData;
    paginationData: IPaginationData;
}

const ForgBaseEmployeesTab = ({ employeesData, paginationData }: ForgBaseEmployeesTabProps) => (
    <ForgBaseEmployeesTable employeesData={employeesData} paginationData={paginationData} />
);

ForgBaseEmployeesTab.displayName = 'ForgBaseEmployeesTab';

export default ForgBaseEmployeesTab;
