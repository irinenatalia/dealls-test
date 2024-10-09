import { Outlet, Link } from "react-router-dom";
import React, {useState, useEffect} from 'react'

const Layout = () => {
  return (
    <>
        <header className={`header-home bg-[#6B22C9]`}> 
            <div className="flex header-logo">
                Navigation
            </div>
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/articles">All Articles</Link>
                </li>
                </ul>
            </nav>
        </header>
      
        <div class="page-content mt-[100px] px-[20px] lg:px-0 pt-[40px] lg:pt-[80px] lg:container mx-auto">
            <Outlet />
        </div>
      
    </>
  )
};

export default Layout;