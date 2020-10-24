import React from "react"
import { useForm } from "react-hook-form"
import LookingGlass from "../assets/LookingGlass.png"

const NavBar = ({ handleSearch }) => {

    const { register, handleSubmit, watch, errors } = useForm()
    
    const onSearch = () => {
        //redirect to home if you're on schedule?
        console.log(watch("search"));
    }

    const handleSearchInput = () => {
        handleSearch(watch("search").toLowerCase())
    }

    return (
        <div className="topnav">
            <div className="search">
                <form onSubmit={handleSubmit(onSearch)}>
                    <input onChange={handleSearchInput} className="search-input" type="text" name="search" placeholder="Search" ref={register} />
                    <img className="looking-glass" src={LookingGlass} alt="Search"/>
                </form>
            </div>
            <div className="nav-links">
                <nav>
                    <ul className="topnav-list">
                        <li className="topnav-link"><a href="#">Profile</a></li>
                        <li className="topnav-link"><a href="#">Admin</a></li>
                        <li className="topnav-link" id="logout-button"><a href="#">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default NavBar