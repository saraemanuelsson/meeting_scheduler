import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import Home from "../components/Home"
import Schedule from "../components/Schedule"

const MeetingSchedulerContainer = (props) => {

    const [ users, setUsers ] = useState([])
    const [ meetings, setMeetings ] = useState([])
    const [ filteredMeetings, setFilteredMeetings ] = useState([])

    useEffect(() => {
        const addFullNamesToUsers = (userData) => {
            const usersWithFullNames = userData.map(user => {
                return {
                    id: user.id,
                    name: `${capitalizeFirstLetter(user.first_name)} ${capitalizeFirstLetter(user.last_name)}`,
                    email: user.email
                }
            })
            return usersWithFullNames
        }

        const getData = () => {
            const url = "https://coding-test.ajenta.io/"
            const endPoints = ["users", "meetings"]
    
            endPoints.forEach(endPoint => {
                return fetch(url + endPoint)
                .then(res => res.json())
                .then(data => {
                    if (endPoint === "users") {
                        setUsers(addFullNamesToUsers(data))
                    } else if (endPoint === "meetings") {
                        setMeetings(data)
                        setFilteredMeetings(data)
                    }
                })
                .catch(error => console.error)
            })

        }
        getData()
    }, [])

    const capitalizeFirstLetter = (string) => {
        const prettyString = string.charAt(0).toUpperCase() + string.slice(1)
        return prettyString
    }

    const getDisplayDetailsForMeeting = (meeting) => {
        const meetingOwner = users.find(user => user.id === meeting.owner)
        const prettyMeeting = {
            ...meeting,
            name: capitalizeFirstLetter(meeting.name),
            start_time: new Date(meeting.start_time),
            owner: meetingOwner.name
        }
        return prettyMeeting
    }

    const filterMeetings = (searchCriteria) => {
        
        searchCriteria.toLowerCase()

        const matchingUserIds = getOwnerIdsFromSearch(searchCriteria)
        
        const matchingMeetings = []

        if (meetings.length !== 0 && users.length !== 0) {

            for (const meeting of meetings) {
                if (meeting.name.includes(searchCriteria) || matchingUserIds.includes(meeting.owner)) {
                    matchingMeetings.push(meeting)
                }
            }
        }

        setFilteredMeetings(matchingMeetings)
    }

    const getOwnerIdsFromSearch = (searchCriteria) => {

        const matchingIds = []

        for (const user of users) {
            if (user.name.toLowerCase().includes(searchCriteria)) {
                matchingIds.push(user.id)
            }
        }

        return matchingIds
    }

    const postMeeting = (payload) => {;
        const url = "https://coding-test.ajenta.io/meetings"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(payload)
        })
        .then(res => saveNewMeeting(payload))
        .catch(error => console.error)
    }

    const saveNewMeeting = (meetingDetails) => {
        console.log(meetingDetails);
        const newMeetingCallId = meetings[meetings.length -1].callid + 1
        const newMeeting = {
            callid: newMeetingCallId,
            name: meetingDetails.name,
            start_time: meetingDetails.start_time,
            end_time: meetingDetails.end_time,
            owner: meetingDetails.owner
        }
        setFilteredMeetings(meetings => [...meetings, newMeeting])
        setMeetings(meetings => [...meetings, newMeeting])
    }

    return (
        <Router>
            <div className="main">
                <SideBar />
                <NavBar handleSearch={filterMeetings}/>
                <Switch>
                    <Route exact path="/" render={(props) => (<Home meetings={filteredMeetings} users={users} capitalizeFirstLetter={capitalizeFirstLetter}/>)} />
                    <Route path="/schedule" render={(props) => (<Schedule users={users} handleNewMeeting={postMeeting} searchContacts={getOwnerIdsFromSearch}/>)} />
                </Switch>
            </div>
        </Router>
    )
}

export default MeetingSchedulerContainer