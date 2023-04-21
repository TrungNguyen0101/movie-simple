import React, { Fragment } from 'react';
import { NavLink, Outlet } from "react-router-dom"
const Header = () => {
    return (
        <Fragment>
            <HeaderMain></HeaderMain>
            <Outlet></Outlet>
        </Fragment>
    );
};

function HeaderMain() {
    return (


        <header className="header flex items-center justify-center py-8 text-white gap-x-10  cursor-pointer">
            <NavLink to="/" className={({ isActive }) => {
                return isActive ? "text-primary" : ""
            }}>
                Home
            </NavLink>
            <NavLink to="/movie" className={({ isActive }) => {
                return isActive ? "text-primary" : ""
            }}>
                Movies
            </NavLink>
        </header>


    )
}
export default Header;