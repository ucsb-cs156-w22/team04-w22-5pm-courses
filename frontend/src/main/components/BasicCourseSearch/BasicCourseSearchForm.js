import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import { allTheSubjects } from "fixtures/subjectFixtures";
import { allTheLevels } from "fixtures/levelsFixtures";
import { quarterRange } from "main/utils/quarterUtilities";

import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";
import SingleSubjectDropdown from "../Subjects/SingleSubjectDropdown"
import SingleLevelDropdown from "../Levels/SingleLevelDropdown"

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
	const quarters = quarterRange("20084", "20222");


    // Stryker disable next-line all : not sure how to test/mock local storage
    const localSubject = localStorage.getItem("BasicSearch.Subject");
    // Stryker disable next-line all : not sure how to test/mock local storage
    const localQuarter = localStorage.getItem("BasicSearch.Quarter");
    // Stryker disable next-line all : not sure how to test/mock local storage
	const localLevel = localStorage.getItem("BasicSearch.CourseLevel");
	
	const firstDepartment = allTheSubjects[0].subjectCode;
    // Stryker disable next-line all : not sure how to test/mock local storage
	const [quarter, setQuarter] = useState(localQuarter || quarters[0].yyyyq);
    // Stryker disable next-line all : not sure how to test/mock local storage
	const [subject, setSubject] = useState(localSubject || firstDepartment);
    // Stryker disable next-line all : not sure how to test/mock local storage
	const [level, setLevel] = useState(localLevel || "U");
    // Stryker disable next-line all : not sure how to test/mock local storage
	const [errorNotified, setErrorNotified] = useState(false);


	const handleSubmit = (event) => {
		event.preventDefault();
		fetchJSON(event, { quarter, subject, level }).then((courseJSON) => {
			// if (courseJSON.total === 0) {
			// 	toast("There are no courses that match the requested criteria.", {
			// 		appearance: "error",
			// 	});
			// }
			setCourseJSON(courseJSON);
		});
		toast("If search were implemented, we would have made a call to the back end to get courses for x subject, x quarter, x level",{
			appearance: "error",
		});
	};

	const handleLevelOnChange = (level) => {
		// Stryker disable next-line all : not sure how to test/mock local storage
        localStorage.setItem("BasicSearch.CourseLevel", level);
		setLevel(level);
	};

    const handleQuarterOnChange = (quarter) => {
		// Stryker disable next-line all : not sure how to test/mock local storage
        localStorage.setItem("BasicSearch.Quarter", quarter);
        setQuarter(quarter);
    }

    const handleSubjectOnChange = (subject) => {
		// Stryker disable next-line all : not sure how to test/mock local storage
        localStorage.setItem("BasicSearch.Subject", subject);
        setSubject(subject);
    }

	return (
		<Form onSubmit={handleSubmit}>
			<Container>
				<Row>
					<Col md = "auto"><SingleQuarterDropdown
						quarters={quarters}
						quarter={quarter}
						setQuarter={handleQuarterOnChange}
						controlId={"BasicSearch.Quarter"}
					/></Col>
					<Col md = "auto"><SingleSubjectDropdown
						subjects={allTheSubjects}
						subject={subject}
						setSubject={handleSubjectOnChange}
						controlId={"BasicSearch.Subject"}
					/></Col>
                    <Col md = "auto"><SingleLevelDropdown
                        levels={allTheLevels}
                        level={level}
                        setLevel={handleLevelOnChange}
                        controlId={"BasicSearch.Level"}
                    /></Col>
				</Row>
			</Container>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default BasicCourseSearchForm;
