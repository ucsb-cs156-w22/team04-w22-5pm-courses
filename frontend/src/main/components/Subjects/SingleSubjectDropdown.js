import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import {compareValues} from "main/utils/sortHelper";

function SingleSubjectDropdown({subjects, subject, setSubject, controlId, onChange = null, label = "Subject"}){
    
    const localSearchSubject = localStorage.getItem(controlId);

    const [subjectState, setSubjectState] = useState(localSearchSubject);

    
    const handleSubjectOnChange = (event) => {
        const selectedSubject = event.target.value;
        localStorage.setItem(controlId, selectedSubject);
        setSubjectState(selectedSubject);
        setSubject(selectedSubject);
        if(onChange != null){
            onChange(event);
        }
    };

    return(
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="select"
                value={subjectState}
                onChange={handleSubjectOnChange}
            >
                {subjects.map(function (object, i) {
                    const key = `${controlId}-option-${i}`;
                    return(
                        <option
                            key = {key}
                            data-testid={key}
                            value={object[0]}
                        >
                            {object[1]}
                        </option>
                    );
                })}
            </Form.Control>
        </Form.Group>
    );
}