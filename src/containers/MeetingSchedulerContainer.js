import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom" 
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import Home from "../components/Home"
import MeetingList from "../components/MeetingList"

import MeetingService from "../services/meetingService"

const MeetingSchedulerContainer = () => {


    return (
        <Router>
            <>
                <NavBar />
                <SideBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/meetings" component={MeetingList} />
                </Switch>
            </>
        </Router>
    )
}

export default MeetingSchedulerContainer