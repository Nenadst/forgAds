import React from 'react';
import Layout from 'ui-components/src/layout/Layout';

const withLayout = (PageComponent: React.ComponentType) =>
    function WithPage({ ...props }: any) {
        return (
            <Layout>
                <PageComponent {...props} />
            </Layout>
        );
    };

export default withLayout;
