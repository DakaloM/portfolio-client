import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import "./navbar.scss";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
      }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {passive: true});
        
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

  
  return (
    <div className={scrollPosition > 0 ? 'navbar scroll' : 'navbar'}>
        <div className="container">
           <span onClick={() => setMenuOpen(prev => !prev)} className={scrollPosition > 0 ? 'menu scroll' : 'menu'}>
             <MenuIcon  className='icon'/>
           </span>

            <div className={menuOpen ? 'navbarMenu active' : 'navbarMenu'}>
                <ul className={scrollPosition > 0 ? ' scroll' : ''}>
                    <li onClick={() => setMenuOpen(false)}><a href="/#projects">Projects</a></li>
                    <li onClick={() => setMenuOpen(false)}><a href="/#skills">Skills</a></li>
                    <li onClick={() => setMenuOpen(false)}><a href="/#contact">Contact me</a></li>
                   
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar