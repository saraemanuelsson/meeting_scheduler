import React from "react"
import OrangeHouse from "../assets/HomeLogo/orange-house.png"
import BlueHouse from "../assets/HomeLogo/blue-house.png"
import OrangeDoor from "../assets/HomeLogo/orange-door.png"
import BlueDoor from "../assets/HomeLogo/blue-door.png"

const HomeIcon = ({selected}) => {

    const house = selected ? OrangeHouse : BlueHouse
    const door = selected ? OrangeDoor : BlueDoor
    
    return (
        <div className="icon-container">
            <img className="house centered-absolute" src={house} alt="Home"/>
            <img className="door centered-absolute" src={door} alt="Home"/>
        </div>
    )
}

export default HomeIcon;