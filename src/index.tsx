import React from 'react';
import ReactDOM from 'react-dom/user';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryUSERProvider, QueryUSER, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryUSER = new QueryUSER({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error: any) => new Error(`Something went wrong: ${error.message}`),
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <QueryUSERProvider user={queryUSER}>
            <Router>
                <App />
            </Router>
            <ReactQueryDevtools position='bottom-right' />
        </QueryUSERProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
