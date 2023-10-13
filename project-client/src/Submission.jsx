import * as React from "react";
import "./Submission.css";

function SubmissionForm() {
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
            <label>
                Dates Traveling:
                <input type="text" name="name" />
            </label>
            <label>
                Number of travelers:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    </div>
  );
}

export default SubmissionForm;
