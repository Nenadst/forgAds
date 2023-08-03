import { IDivisionsData, IPaginationData } from './ForgBaseScreen';
import ForgBaseDivisionsTable from './ui-elements/ForgBaseDivisionsTable';

interface ForgBaseDivisionsTabProps {
    divisionsData: IDivisionsData;
    paginationData: IPaginationData;
}

const ForgBaseDivisionsTab = ({ divisionsData, paginationData }: ForgBaseDivisionsTabProps) => (
    <ForgBaseDivisionsTable divisionsData={divisionsData} paginationData={paginationData} />
);

ForgBaseDivisionsTab.displayName = 'ForgBaseDivisionsTab';

export default ForgBaseDivisionsTab;
