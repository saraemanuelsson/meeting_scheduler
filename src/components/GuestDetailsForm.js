import React from "react"
import FormLabel from "./FormLabel"
import { useForm } from "react-hook-form"
import LookingGlass from "../assets/LookingGlass.png"

const GuestDetailsForm = ({guests, users, displayDropdown, setDisplayDropdown, addGuests, handleSearchInput }) => {

    const { register, watch } = useForm()

    const addedGuests = guests.map(guestId => {
        const guest = users.find(user => user.id === guestId)
        return (
            <li className="heading secondary" key={guest.email}>{guest.name}</li>
        )
    })

    const handleGuestsSelected = () => {
        addGuests(watch("guests"))
    }

    let guestOptions = []

    if (displayDropdown) {
        guestOptions = users.map(user => {
            return (
                <div key={user.id}>
                    <input onChange={handleGuestsSelected} checked={guests.includes(user.id) ? true : false} type="checkbox" className="dropdown-content" id={user.name} name="guests" ref={register} value={user.id}/>
                    <label className="heading secondary dropdown-label" htmlFor={user.name}>{user.name}</label>
                </div>
            )
        })
    }

    const onSearchInput = () => {
        // handleSearchInput(watch("search-contacts"))
    }
    
    return (
        <div className="form-details small-flex-item">
            <form>
                <FormLabel htmlFor="guests" label="Add Guests" />
                <div className="search">
                    <input onChange={onSearchInput} onClick={() => setDisplayDropdown(!displayDropdown)} className="input-field" type="text" name="search-contacts" placeholder="Search" ref={register} />
                    <img className="looking-glass" id="search-icon-form" src={LookingGlass} alt="Search"/>
                </div>
                <div className="guest-dropdown" >
                    {guestOptions}
                </div>
                <div>
                    <ul className={displayDropdown ? "guest-list hidden" : "guest-list"}>
                        {addedGuests}
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default GuestDetailsForm