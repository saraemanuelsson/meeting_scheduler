import React, { useState } from "react";
import { useForm } from "react-hook-form"

export const Form = (props) => {

    
    const addedGuests = props.guests.map(guest => {
        return (
            <li key={guest.id}>{guest.name}</li>
        )
    })

    const guestOptions = props.users.map(user => {
        return (
            <option value={user.id} key={user.id}>{user.name}</option>
        )
    })

    const { register, handleSubmit, watch, errors } = useForm()
    return (
        <div className={"form"}>
        <h1 className="heading primary">Schedule Meeting</h1>
            <div className="content-container">
                <form className="flex-content" onSubmit={handleSubmit(props.onScheduleMeeting)}>
                    <div className="form-details large-flex-item">
                        <label htmlFor="title" className="heading secondary input-label">Title</label>
                        <input className="input-field" type="text" name="title" placeholder="Weekly Meeting" ref={register({required: true})} />
                        <label htmlFor="description" className="heading secondary input-label">Description</label>
                        <input className="input-field" type="text" name="description" placeholder="Weekly Stand Up and Project" ref={register({required: true})} />
                        <label htmlFor="duration" className="heading secondary input-label">Duration</label>
                        <select className="input-field dropdown" name="duration" ref={register} defaultValue="default">
                            <option disabled value="default">...</option>
                            <option value={1}>1h</option>
                            <option value={2}>2h</option>
                            <option value={3}>3h</option>
                        </select>
                        <input className="orange-button" type="submit" value="Schedule Meeting"/>
                    </div>
                    <div className="form-details small-flex-item">
                        <label htmlFor="guests" className="heading secondary input-label">Add Guests</label>
                        <select className="input-field" name="guests" ref={register({required: true})} defaultValue="default" onChange={props.addGuest} selectedindex="0" id="drop">
                            <option value="default">Select Contacts</option>
                            { guestOptions }
                        </select>
                        <ul>
                            { addedGuests }
                        </ul>

                    </div>
                </form>
            </div>
        </div>
    )
}