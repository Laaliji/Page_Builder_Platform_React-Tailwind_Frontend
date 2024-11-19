import { Outlet } from "react-router-dom";

export default function Layout(){
    return <>
        <div className="bg-background w-full">
            <Outlet/>
        </div>
    </>
}