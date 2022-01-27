import { Outlet } from "react-router";

export default function Navbar(){
  return <>
    <p>Soy navbar</p>
    <Outlet/>
    </>
}