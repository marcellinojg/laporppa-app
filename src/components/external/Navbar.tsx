import { Link } from "react-router-dom"
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { ROUTES } from "../../consts/routes";

function Navbar() {
  const [isMobileNavbarActive, setIsMobileNavbarActive] = useState(false)
  const location = useLocation()
  const [hideNavbar, setHideNavbar] = useState<boolean>(true)

  useEffect(() => {
    if (location.pathname.includes('internal')) {
      setHideNavbar(true)
    }
    else {
      setHideNavbar(false)
    }
  }, [location])

  if (hideNavbar) return <></>

  return (
    <nav id="nav" className="fixed bg-primary z-20 w-screen flex flex-col text-white">
      {/* LG Screen Navbar */}
      <div className="flex justify-between items-center px-[6vw] py-5">
        {/* Left Side */}
        <Link to={ROUTES.EXTERNAL.LANDING} className="flex items-center gap-4 font-bold font-poppins text-xl">
          <img src='images/logo-without-text.png' className="bg-white rounded-full p-2" alt="" width={64} />
          <span className="text-white">SIAP PPAK</span>
        </Link>

        {/* Right Side */}
        <div className="items-center justify-center gap-[3vw] lg:flex hidden">
          <NavbarLink route={ROUTES.EXTERNAL.LANDING}>Home</NavbarLink>
          <NavbarLink route={ROUTES.EXTERNAL.PELAPORAN}>Pelaporan</NavbarLink>
          <NavbarLink route={ROUTES.EXTERNAL.TRACK_PELAPORAN}>Track Pelaporan</NavbarLink>
          <NavbarLink route={ROUTES.EXTERNAL.LOGIN}>Masuk</NavbarLink>
        </div>

        {/* SM Screen Navbar Button */}
        <button
          className="lg:hidden block text-2xl text-white border-2 px-4 py-1 rounded-md border-white"
          onClick={() => setIsMobileNavbarActive(prev => !prev)}
        >
          {!isMobileNavbarActive ? <HiBars3 /> : <HiXMark />}
        </button>
      </div>

      {/* SM Screen Navbar */}
      {isMobileNavbarActive &&
        <div className="flex flex-col lg:hidden px-4 bg-primary pb-4">
          <MobileNavbarLink route={ROUTES.EXTERNAL.LANDING}>Home</MobileNavbarLink>
          <MobileNavbarLink route={ROUTES.EXTERNAL.PELAPORAN}>Pelaporan</MobileNavbarLink>
          <MobileNavbarLink route={ROUTES.EXTERNAL.TRACK_PELAPORAN}>Track Pelaporan</MobileNavbarLink>
          <MobileNavbarLink route={ROUTES.EXTERNAL.LOGIN}>Masuk</MobileNavbarLink>
        </div>
      }

    </nav>
  )
}

function NavbarLink({ route, children }: { route: string, children: ReactNode }) {
  const location = useLocation()
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (location.pathname == route) {
      setActive(true)
    }
    else {
      setActive(false)
    }
  }, [location.pathname])



  return <Link
    to={route}
    className={`${isActive && "shadow-[0px_7px_0px_-5px_rgba(255,255,255,1)]"} 
    font-bold  hover:shadow-[0px_7px_0px_-5px_rgba(255,255,255,1)] transition duration-300`
    }
  >
    {children}
  </Link>
}

function MobileNavbarLink({ route, children }: { route: string, children: ReactNode }) {
  const location = useLocation()
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (location.pathname == route) {
      setActive(true)
    }
    else {
      setActive(false)
    }
  }, [location.pathname])

  return <Link to={route}
    className={`${isActive && "bg-[#FFFFFF] text-primary"} font-bold py-2 px-4 rounded-lg`
    }
  >
    {children}
  </Link>
}

export default Navbar
