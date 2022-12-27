import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Checklogin() {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    user.name?<Navigate to='/' />:<Outlet/>
  )
}

export default Checklogin;
