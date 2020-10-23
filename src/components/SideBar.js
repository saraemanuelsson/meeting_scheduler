import React, { useState } from "react"
import { Link } from "react-router-dom"
import HomeSelected from "../assets/HomeOrange.png"
import HomeUnselected from "../assets/HomeBlue.png"
import ScheduleSelected from "../assets/ScheduleSelected.png"
import ScheduleUnselected from "../assets/ScheduleBlue.png"

const SideBar = () => {

    const [ homeSelected, setHomeSelected ] = useState(true)

    const homeButton = homeSelected ? HomeSelected : HomeUnselected
    const scheduleButton = homeSelected ? ScheduleUnselected : ScheduleSelected

    return (
        <div className="sidenav">
            <nav className="sidenav-buttons">
                <ul>
                    <li onClick={() => {setHomeSelected(true)}}>
                        <Link to="/">
                            <img className="nav-image" src={homeButton} alt="Home"/>
                        </Link>
                    </li>
                    <li onClick={() => {setHomeSelected(false)}}>
                        <Link to="/schedule">
                            <img className="nav-image" src={scheduleButton} alt="Schedule"/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default SideBar