import { Outlet } from "@remix-run/react";

export default function AuthRoute() {
    return (
        <div>
            <Outlet />
        </div>
    )
}