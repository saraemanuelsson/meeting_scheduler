import React from "react"
import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <div className="sidenav">
            <nav>
                <ul>
                    <li className="heading sidenav"><Link to="/">Home</Link></li>
                    <li className="heading sidenav"><Link to="/schedule">Schedule</Link></li>
                </ul>
            </nav>
        </div>

    )
}

export default SideBar