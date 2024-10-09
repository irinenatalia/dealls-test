import { Outlet, Link } from "react-router-dom";
import React, {useState, useEffect} from 'react'

const Layout = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [menuVisible, setMenuVisible] = useState(true)

    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if(currentScrollPos > prevScrollPos){
            setMenuVisible(false)
        }else{
            setMenuVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }
    useEffect( () => {
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll)
    })

  return (
    <>
        <header className={`header-home bg-[#6B22C9] ${menuVisible ? '' : 'hidden'}`}> 
            <div className="flex header-logo">
                Navigation
            </div>
            <nav>
                <ul>
                <li>
                    <Link to="/">Beranda</Link>
                </li>
                <li>
                    <Link to="/">Semua Artikel</Link>
                </li>
                </ul>
            </nav>
        </header>
      
        <div class="page-content mt-[100px] pt-[80px] lg:container mx-auto">
            <Outlet />
        </div>
      
    </>
  )
};

export default Layout;