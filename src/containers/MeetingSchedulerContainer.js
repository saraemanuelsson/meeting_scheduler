import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import Home from "../components/Home"
import Schedule from "../components/Schedule"

const MeetingSchedulerContainer = (props) => {

    const [ users, setUsers ] = useState([])
    const [ meetings, setMeetings ] = useState([])

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
                fetch(url + endPoint)
                .then(res => res.json())
                .then(data => {
                    if (endPoint === "users") {
                        setUsers(addFullNamesToUsers(data))
                    } else if (endPoint === "meetings") {
                        setMeetings(data)
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

    //To do: What if there's no match for user.id and meeting.owner?
    const createDisplayMeetingList = () => {

        let meetingDetails = []
        
        if (meetings.length !== 0 && users.length !== 0) {
            meetingDetails = meetings.map(meeting => {
                const meetingOwner = users.find(user => user.id === meeting.owner)
                return {
                    ...meeting,
                    name: capitalizeFirstLetter(meeting.name),
                    start_time: new Date(meeting.start_time),
                    owner: meetingOwner.name
                }
            })
        }
        return meetingDetails
    }

    const filteredMeetings = (searchCriteria) => {
        
        searchCriteria.toLowerCase()

        const matchingUserIds = searchForOwnerName(searchCriteria)

        // console.log("matching users", matchingUserIds);
        
        const matchingMeetings = []

        if (meetings.length !== 0 && users.length !== 0) {
            // console.log("test", meetings[0].name.includes("s"));
            console.log("hits if");
            // matchingMeetings = meetings.filter(meeting => {
            //     meeting.name.includes(searchCriteria) //|| matchingUserIds.includes(meeting.owner)
            // })
            for (const meeting of meetings) {
                if (meeting.name.includes(searchCriteria) || matchingUserIds.includes(meeting.owner)) {
                    console.log("second if");
                    const meetingOwner = users.find(user => user.id === meeting.owner)
                    console.log("owner", meetingOwner);
                    const prettyMeeting = {
                        ...meeting,
                        name: capitalizeFirstLetter(meeting.name),
                        start_time: new Date(meeting.start_time),
                        owner: meetingOwner.name
                    }
                    matchingMeetings.push(prettyMeeting)
                }
            }
        }

        return matchingMeetings
    }

    //returns array of ownerIds that match
    const searchForOwnerName = (searchCriteria) => {

        const matchingIds = []

        for (const user of users) {
            if (user.name.toLowerCase().includes(searchCriteria)) {
                matchingIds.push(user.id)
            }
        }

        return matchingIds

        // const found_users = users.filter(user => {
        //     user.name.toLowerCase().includes(searchCriteria)
        // })

        // return found_users.map(user => user.id)
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
        const newMeetingCallId = meetings[meetings.length -1].callid + 1
        const newMeeting = {
            callid: newMeetingCallId,
            name: meetingDetails.name,
            start_time: meetingDetails.start_time,
            end_time: meetingDetails.end_time,
            owner: meetingDetails.owner
        }
        setMeetings(meetings => [...meetings, newMeeting]);
    }

    return (
        <Router>
            <div className="main">
                <SideBar />
                <NavBar />
                <Switch>
                    <Route exact path="/" render={(props) => (<Home meetings={filteredMeetings("ac")} />)} />
                    <Route path="/schedule" render={(props) => (<Schedule users={users} handleNewMeeting={postMeeting}/>)} />
                </Switch>
            </div>
        </Router>
    )
}

export default MeetingSchedulerContainer