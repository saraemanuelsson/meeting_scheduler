import React from "react"
import OrangeSquare from "../assets/CalendarLogo/orange-square.png"
import BlueSquare from "../assets/CalendarLogo/blue-square.png"
import OrangeHorizontalLine from "../assets/CalendarLogo/orange-horizontal-line.png"
import BlueHorizontalLine from "../assets/CalendarLogo/blue-horizontal-line.png"
import OrangeVerticalLine from "../assets/CalendarLogo/orange-vertical-line.png"
import BlueVerticalLine from "../assets/CalendarLogo/blue-vertical-line.png"

const CalendarIcon = ({selected}) => {
    
    const square = selected ? OrangeSquare : BlueSquare
    const horizontalLine = selected ? OrangeHorizontalLine : BlueHorizontalLine
    const verticalLine = selected ? OrangeVerticalLine : BlueVerticalLine
    
    return (
        <div className="icon-container">
            <img className="calendar-square centered-absolute" src={square} alt="Calendar"/>
            <img className="calendar-horizontal centered-absolute" src={horizontalLine} alt="Calendar"/>
            <img className="calendar-vertical centered-absolute" id="calendar-vertical-1" src={verticalLine} alt="Calendar"/>
            <img className="calendar-vertical centered-absolute" id="calendar-vertical-2" src={verticalLine} alt="Calendar"/>
        </div>
    )
}

export default CalendarIcon