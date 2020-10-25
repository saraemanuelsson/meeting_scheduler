import React from "react"
import { useForm } from "react-hook-form"
import LookingGlass from "../assets/LookingGlass.png"

const NavBar = ({ handleSearch }) => {

    const { register, watch } = useForm()

    const handleSearchInput = () => {
        handleSearch(watch("search").toLowerCase())
    }

    return (
        <div className="topnav">
            <div className="search">
                <form>
                    <input onChange={handleSearchInput} className="search-input" type="text" name="search" placeholder="Search" ref={register} />
                    <img className="looking-glass" src={LookingGlass} alt="Search"/>
                </form>
            </div>
            <nav className="nav-links">
                <ul className="topnav-list">
                    <li className="topnav-link"><a href="#">Profile</a></li>
                    <li className="topnav-link"><a href="#">Admin</a></li>
                    <li className="topnav-link" id="logout-button"><a href="#">Logout</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar