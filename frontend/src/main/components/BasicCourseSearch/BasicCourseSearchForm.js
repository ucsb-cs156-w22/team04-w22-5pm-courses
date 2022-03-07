import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { toast } from "react-toastify";

import { allTheSubjects } from "fixtures/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";
import { quarterRange } from "main/utils/quarterUtilities";

import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";
import SingleSubjectDropdown from "../Subjects/SingleSubjectDropdown"
import SingleLevelDropdown from "../Levels/SingleLevelDropdown"

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
	const quarters = quarterRange("20084", "20222");
	const levels = [["L","Undergrad-Lower"], 
					["S","Undergrad-Upper Division"], 
					["U","Undergrad-All"], 
					["G","Graduate"]];

    const localSubject = localStorage.getItem("BasicSearch.Subject");
    const localQuarter = localStorage.getItem("BasicSearch.Quarter");
	const localLevel = localStorage.getItem("BasicSearch.CourseLevel");
	
	const firstDepartment = allTheSubjects[0].subjectCode;
	const [quarter, setQuarter] = useState(localQuarter || quarters[0].yyyyq);
	const [subject, setSubject] = useState(localSubject || firstDepartment);
	const [level, setLevel] = useState(localLevel || "U");
	const [errorNotified, setErrorNotified] = useState(false);

	const { data: subjects, error: errorGettingSubjects } = useSWR(
		"/api/public/subjects",
		fetchSubjectAreas,
		{
			initialData: allTheSubjects,
			revalidateOnMount: true,
		}
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchJSON(event, { quarter, subject, level }).then((courseJSON) => {
			if (courseJSON.total === 0) {
				toast("There are no courses that match the requested criteria.", {
					appearance: "error",
				});
			}
			setCourseJSON(courseJSON);
		});
		toast("If search were implemented, we would have made a call to the back end to get courses for x subject, x quarter, x level",{
			appearance: "error",
		});
	};

	const handleLevelOnChange = (level) => {
        localStorage.setItem("BasicSearch.CourseLevel", level);
		setLevel(level);
	};

    const handleQuarterOnChange = (quarter) => {
        localStorage.setItem("BasicSearch.Quarter", quarter);
        setQuarter(quarter);
    }

    const handleSubjectOnChange = (subject) => {
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
					/></Col>
                    <Col md = "auto"><SingleLevelDropdown
                        levels={levels}
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
