import React from "react"
import { Link } from "react-router-dom"

const SideBar = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/schedule">Schedule</Link>
            </li>
        </ul>
    )
}

export default SideBar