import * as React from "react";
import { useState } from 'react'
import "./Submission.css";

function SubmissionForm() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [budget, setBudget] = useState(0);
    const [travelDates, setTravelDates] = useState("");   //how do we wanna store them
    const [groupSize, setGroupSize] = useState(0);

    const submitForm = () => {
        console.log("submitted");
    };

    return (
        <div className="SubmissionForm">
            <h1>Submission Form</h1>
            <form>
                <label>
                    Origin City:
                    <input type="text" name="name" />
                </label>
                <label>
                    Destination City:
                    <input type="text" name="name" />
                </label>
                <label>
                    Trip Budget:
                    <input type="text" name="name" />
                </label>
                {/* <div></div> */}
                <label>
                    Dates Traveling:
                    <input type="text" name="name" />
                </label>
                <label>
                    Number of travelers:
                    <input type="text" name="name" />
                </label>
                {/* whenever we submit, the page reloads... */}
                <button className="submit" onClick={submitForm}>
                    Submit
                </button> 
                
            </form>
        </div>
    );
}

export default SubmissionForm;
