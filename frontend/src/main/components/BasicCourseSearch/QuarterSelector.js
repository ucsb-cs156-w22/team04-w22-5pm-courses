import React, {useState} from "react";
import {Form} from "react-bootstrap";

const QuarterSelector = ({quarters, _quarter, setQuarter, controlId, label}) => {
    const localQuarterSelector = localStorage.getItem(controlId);
    const [quarter, setQuarterState] = useState(localQuarterSelector || "20221");

    const handleQuartertoChange = (event) => {
        const quarterValue = event.target.value;
        localStorage.setItem(controlId, quarterValue);
        setQuarterState(quarterValue);
        setQuarter(quarterValue);
    };

    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" value={quarter} onChange={handleQuartertoChange}>
                {quarters.map(function (object, i) {
                    return <option key={controlId + '-' + i} value={object.yyyq}>{object.qyy}</option>;
                })}
            </Form.Control>
        </Form.Group>
    );
}

export default QuarterSelector;