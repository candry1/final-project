import * as React from "react";
import { useState, useEffect} from 'react'
import { Search } from "./Search";
import { SearchDestination } from "./SearchDestination";
import numeral from "numeral";
import dayjs from "dayjs";
import "./Submission.css";
import {useNavigate} from 'react-router-dom';

function SubmissionForm({submissionInfo, setSubmissionInfo}) {
    const navigate = useNavigate()
    const [cityCode, setCityCode] = useState(null);
    const [destinationCode, setDestinationCode] = useState(null);
    // const [submissionInfo, setSubmissionInfo] = useState({
    //     origin: "",
    //     destination: "",
    //     budget: 0,
    //     checkInDate: "",
    //     checkOutDate: "",
    //     numOfTravelers: 0
    // });
     // Callback function to update submissionInfo.origin
     const updateOrigin = (newOrigin) => {
        setSubmissionInfo({
            ...submissionInfo,
            origin: newOrigin,
        });
    };
    const updateDestination = (newDestination) => {
        console.log(submissionInfo);
        setSubmissionInfo({
            ...submissionInfo,
            destination: newDestination,
        });
        
    };

    const handleInput = (event) => {
       
        const  value = event.target.value;

        setSubmissionInfo({
            ...submissionInfo,
            [event.target.name]: value
        });
        console.log(submissionInfo);
    }

    const submitForm = (event) => {
        event.preventDefault();
        navigate("/vacation-planner");
    };

    return (
        <div className="SubmissionForm">
            <h1>Submission Form</h1>
            <form >
                <Search setCityCode={setCityCode} updateOrigin={updateOrigin} />
                <SearchDestination setDestinationCode={setDestinationCode} updateDestination={updateDestination} />
                <br/>
                <br/>
                <label>
                    Trip Budget:
                    <input
                        name="budget"
                        type="number"
                        value={submissionInfo.budget}
                        onChange={handleInput}
                    />
                </label>
                <br/>
                <label>
                    Check In Date
                    <input  name="checkInDate" type="date" value={submissionInfo.checkInDate} placeholder="MM-DD-YYYY" onChange={handleInput}/>
                </label>
                <label>
                    Check Out Date
                    <input  name="checkOutDate" type="date" value={submissionInfo.checkOutDate} placeholder="MM-DD-YYYY" onChange={handleInput}/>
                </label>
                <br/>
                <label>
                    Number of travelers: 
                    <input  name="numOfTravelers" type="number" value={submissionInfo.numOfTravelers} onChange={handleInput}/>
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
