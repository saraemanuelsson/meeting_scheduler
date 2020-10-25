import React, { useState } from "react"
import { useForm } from "react-hook-form"
import FormLabel from "./FormLabel"

const MeetingDetailsForm = ({ message, saveMeeting }) => {
    
    const { register, handleSubmit } = useForm()

    const onScheduleMeeting = (data, event) => {
        saveMeeting(data)
        event.target.reset()
    }
    
    return (
        <div className="form-details large-flex-item">
            <form onSubmit={handleSubmit(onScheduleMeeting)}>
                <FormLabel htmlFor="title" label="Title" />
                <input className="input-field" type="text" name="title" placeholder="Weekly Meeting" required ref={register} />
                <FormLabel htmlFor="description" label="Description" />
                <input className="input-field" type="text" name="description" placeholder="Weekly Stand Up and Project" required ref={register} />
                <FormLabel htmlFor="duration" label="Duration" />
                <select className="input-field dropdown" name="duration" ref={register} defaultValue="default">
                    <option disabled value="default">...</option>
                    <option value={1}>1h</option>
                    <option value={2}>2h</option>
                    <option value={3}>3h</option>
                </select>
                <input className="orange-button" type="submit" value="Schedule Meeting"/>
                <p id="confirmation">{message}</p>
            </form>
        </div>
    )
}

export default MeetingDetailsForm