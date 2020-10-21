import React from "react"
import { useForm } from "react-hook-form"

const Schedule = ({ users, handleNewMeeting }) => {

    const { register, handleSubmit, watch, errors } = useForm()

    const onScheduleMeeting = (data) => {
        console.log(data);
    }

    let guestOptions = []

    if (users.length !== 0 ) {
        guestOptions = users.map(user => {
            return (
            <option value={user.id} key={user.id}>{`${user.first_name} ${user.last_name}`}</option>
            )
        })
    }

    return (
        <form onSubmit={handleSubmit(onScheduleMeeting)}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder="Meeting Title" ref={register({required: true})} />
                <label htmlFor="description">Description</label>
                <input type="text" name="description" placeholder="Meeting Description" ref={register({required: true})} />
                <label htmlFor="duration">Duration</label>
                <select name="duration" ref={register}>
                    <option value="1h">1h</option>
                    <option value="2h">2h</option>
                    <option value="3h">3h</option>
                </select>
                <input type="submit" value="Schedule Meeting"/>
            </div>
            <div>
                <label htmlFor="guests">Add Guests</label>
                <select name="guests" ref={register({required: true})}>
                    {guestOptions}
                </select>
            </div>
        </form>
    )
}

export default Schedule