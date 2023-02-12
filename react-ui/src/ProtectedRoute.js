import React from "react";
import { useAuth } from './auth-context/auth.context';
import { useHistory, Route } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert";

export const ProtectedRoute = ({ ...rest }) => {
  const history = useHistory();
  let { user } = useAuth();
    return (<>
      {(!user || !user.token || user.token === "") ? (
        <SweetAlert
          title="You must be signed in!"
          onCancel={() => history.push("/login-page")}
          onConfirm={() => history.push("/login-page")}
          confirmBtnCssClass={"px-5"}
        />
      ) : (
        <Route {...rest} />
      )}
  </>);
};
