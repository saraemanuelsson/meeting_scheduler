import React from "react"
import LeftArrowOrange from "../assets/LeftArrowOrange.png"
import LeftArrowBlue from "../assets/LeftArrowBlue.png"
import HomeIcon from "./HomeIcon"
import CalendarIcon from "./CalendarIcon"

const NavButton = ( {text, icon, selected} ) => {

    const arrow = selected ? LeftArrowOrange : LeftArrowBlue

    let iconComponent

    if (icon === "home") {
        iconComponent = (
            <HomeIcon selected={selected}/>
        )
    } else if (icon === "calendar") {
        iconComponent = (
            <CalendarIcon selected={selected}/>
        )
    }

    return (
        <>
            <div className={selected ? "sidenav-button-container selected-nav" : "sidenav-button-container"}>
                {iconComponent}
                <h1 className="heading primary page-nav-link">{text}</h1>
                <img className="left-arrow" src={arrow} alt="select-route"/>
            </div>

        </>
    )

}

export default NavButton