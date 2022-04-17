import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  let navigate = useNavigate();
  
  useEffect(() => {
    window.alert("You don't have access for that dashboard");
    navigate('/');
  }, []);

  return (
    <div>Loading...</div>
  )
}

export default NoAccess;