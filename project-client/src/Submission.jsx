import * as React from "react";
import { useState, useEffect} from 'react'
import { Search } from "./Search";
import "./Submission.css";

function SubmissionForm() {
    const [submissionInfo, setSubmisisonInfo] = useState({
        origin: "",
        destination: "",
        budget: 0,
        travelDates: "",
        numOfTravelers: 0
    });

    const handleInput = (event) => {
       
        const  value = event.target.value;
        // console.log(value);

        setSubmisisonInfo({
            ...submissionInfo,
            [event.target.name]: value
        });
        console.log(submissionInfo);
    }

    const submitForm = (event) => {
        event.preventDefault();
    };

    return (
        <div className="SubmissionForm">
            <h1>Submission Form</h1>
            <form action="../../project-server/router.js/api/search" method="get">
                <label>
                    Origin City: 
                    <input name="origin" type="text" value={submissionInfo.origin} onChange={handleInput}/>
                </label>
                <br/>
                <label>
                    Destination City: 
                    <input name="destination" type="text" value={submissionInfo.destination} onChange={handleInput}/>
                </label>
                <br/>
                <label>
                    Trip Budget: 
                    <input name="budget" type="text" value={submissionInfo.budget} onChange={handleInput}/>
                </label>
                <br/>
                <label>
                    Dates Traveling: 
                    <input  name="travelDates" type="text" value={submissionInfo.travelDates} onChange={handleInput}/>
                </label>
                <br/>
                <label>
                    Number of travelers: 
                    <input  name="numOfTravelers" type="text" value={submissionInfo.numOfTravelers} onChange={handleInput}/>
                </label>
                <br/>
                <button className="submit" onClick={submitForm}>
                    Submit
                </button> 
            </form>
        </div>
    );
}

export default SubmissionForm;
