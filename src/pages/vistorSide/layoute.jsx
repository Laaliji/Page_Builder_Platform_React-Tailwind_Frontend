import { Outlet } from "react-router-dom";

export default function Layout(){
    return <>
        <h1>Nav</h1>
            <Outlet/>
        <h1>Footer</h1>
    </>
}