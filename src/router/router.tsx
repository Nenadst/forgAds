import { Navigate, Route, Routes } from 'react-router-dom';
import ForgBaseScreen from 'domains/forg-base/ForgBaseScreen';
import DashboardScreen from 'domains/dashboard/DashboardScreen';
import InnerContainer from 'containers/InnerContainer';
import UsersScreen from 'domains/users/UsersScreen';
import AdsScreen from 'domains/ads/AdsScreen';
import { routerPaths } from './routerPaths';

const MainRouter = () => (
    <Routes>
        <Route path={routerPaths.ROOT} element={<InnerContainer />}>
            <Route path={routerPaths.ROOT} element={<Navigate to={routerPaths.DASHBOARD} />} />
            <Route path={routerPaths.DASHBOARD} element={<DashboardScreen />} />
            <Route path={routerPaths.Forg_BASE} element={<Navigate to={routerPaths.Forg_BASE_EMPLOYEES} />} />
            <Route path={routerPaths.Forg_BASE} element={<ForgBaseScreen />}>
                <Route path=':tabName' element={<ForgBaseScreen />} />
            </Route>
            <Route path={routerPaths.Ads} element={<Navigate to={routerPaths.Ads_ALL_Ads} />} />
            <Route path={routerPaths.Ads} element={<AdsScreen />}>
                <Route path=':tabName' element={<AdsScreen />} />
            </Route>
            <Route path={routerPaths.Users} element={<UsersScreen />} />
        </Route>
    </Routes>
);

export default MainRouter;
