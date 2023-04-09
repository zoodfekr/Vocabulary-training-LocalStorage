import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import App from './App';
import { Spiner } from './components/Preloader';
import { ErrorBoundary } from "react-error-boundary";
import { Button } from '@mui/material';


const ErrorFallback = ({ error, resetErrorBoundary }) => {

  const navigate = useNavigate();
  return (
    <div >
      <div className="border container p-5 d-flex flex-column align-items-center mt-3 bg-light" style={{ borderRadius: "25px" }}>
        <h1 className="">مشکلی پیش آمده 💣 </h1>
        <pre>{error.message}</pre>
        <button className='btn btn-warning' onClick={resetErrorBoundary}>سعی مجدد</button>
        <Button onClick={() => navigate('/')} variant="contained" sx={{ py: 0, m: 1 }}>صفحه اصلی </ Button >
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode >
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback} fallback={ErrorFallback}
        onReset={() => {
      
        }}>


        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);




