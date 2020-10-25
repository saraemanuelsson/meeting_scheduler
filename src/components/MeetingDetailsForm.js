import React from "react"
import { useForm } from "react-hook-form"
import FormLabel from "./FormLabel"
import DownArrow from "../assets/Arrow.png"

const MeetingDetailsForm = ({ message, setMessage, saveMeeting, guests, displayDropdown, setDisplayDropdown }) => {
    
    const { register, handleSubmit, watch } = useForm()

    const onScheduleMeeting = (data, event) => {
        if (guests.length !== 0) {
            saveMeeting(data)
            setDisplayDropdown(false)
            event.target.reset()
        } else {
            setMessage("Please add guests")
        }
    }

    const durationOptions = [1,2,3].map(number => {
        return (
            <div key={number}>
                <input type="radio" className="dropdown-content" id={number} name="duration" ref={register} value={number}></input>
                <label className="dropdown-label" htmlFor={number}>{number}h</label>
            </div>
        )
    })
    
    return (
        <div className="form-details large-flex-item">
            <form onSubmit={handleSubmit(onScheduleMeeting)}>
                <FormLabel htmlFor="title" label="Title" />
                <input className="input-field" type="text" name="title" placeholder="Weekly Meeting" required ref={register} />
                <FormLabel htmlFor="description" label="Description" />
                <input className="input-field" type="text" name="description" placeholder="Weekly Stand Up and Project" required ref={register} />
                <FormLabel htmlFor="duration" label="Duration" />
                <div className="dropdown-button-container">
                    <button type="button" onClick={() => setDisplayDropdown(!displayDropdown)} className="input-field dropdown dropdown-button">. . .</button>
                    <img className="down-arrow" src={DownArrow} alt="dropdown"/>
                </div>
                <div className={displayDropdown ? "duration-dropdown" : "duration-dropdown hidden"}>
                    {durationOptions}
                </div>
                <input className="orange-button" type="submit" value="Schedule Meeting"/>
                <p id="confirmation">{message}</p>
            </form>
        </div>
    )
}

export default MeetingDetailsForm