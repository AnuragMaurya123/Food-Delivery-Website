/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import LoginSingup from '../component/model/LoginSingup';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRouter = ({ children }) => {
  const { token, openModal, modalRef } = useContext(AuthContext);

  useEffect(() => {
    if (!token && modalRef.current) {
      // Open the modal if the user is not authenticated
      openModal();
    }
  }, [token, openModal, modalRef]);

  if (token) {
    return children;
  } else {
    return (
      <div className="section-container">
        <h1 className="text-center lg:text-xl font-bold text-green">Please Login First!</h1>
        <LoginSingup model="login" setModel={() => {}} />
      </div>
    );
  }
};

export default ProtectedRouter;


