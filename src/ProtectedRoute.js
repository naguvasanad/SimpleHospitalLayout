import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
  return (
    <div>
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      return isLoggedIn ? children : <Navigate to="/LoginPage" replace />;
    </div>
  )
}

export default ProtectedRoute;
