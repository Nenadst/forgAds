import { IPaginationData, IAdsData } from './AdsScreen';
import AdsAllAdsTable from './ui-elements/AdsAllAdsTable';

interface AdsAllAdsTabProps {
    adsData: IAdsData;
    paginationData: IPaginationData;
}

const AdsAllAdsTab = ({ adsData, paginationData }: AdsAllAdsTabProps) => (
    <AdsAllAdsTable adsData={adsData} paginationData={paginationData} />
);

AdsAllAdsTab.displayName = 'AdsAllAdsTab';

export default AdsAllAdsTab;
