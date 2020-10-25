import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import NavButton from "./NavButton"

const SideBar = () => {

    const currentPath = useLocation().pathname

    const [ homeSelected, setHomeSelected ] = useState((currentPath === "/"))

    return (
        <div className="sidenav-container">
            <nav className="sidenav">
                <ul>
                    <li onClick={() => setHomeSelected(true)}>
                        <Link to="/">
                            <NavButton text="Home" icon="home" selected={homeSelected} />
                        </Link>
                    </li>
                    <li className="side-nav-button" onClick={() => setHomeSelected(false)}>
                        <Link to="/schedule">
                            <NavButton text="Calendar" icon="calendar" selected={!homeSelected} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default SideBar