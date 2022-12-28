import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Checklogin() {
  const user = useSelector((state) => state.user.value);
  return (
    user.name?<Outlet/>:<Navigate to='/login'/>
  )
}

export default Checklogin;
