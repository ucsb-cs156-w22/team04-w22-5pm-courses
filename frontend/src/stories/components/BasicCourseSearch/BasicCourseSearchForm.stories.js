import React from 'react';

import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm"
import { threeSubjects, allTheSubjects } from 'fixtures/subjectFixtures';

export default {
    title: 'components/BasicCourseSearch/BasicCourseSearchForm',
    component: BasicCourseSearchForm
};


const Template = (args) => {
    return (
        <BasicCourseSearchForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};


export const ThreeSubjectsLoaded = Template.bind({});

ThreeSubjectsLoaded.args = {
    subjects : threeSubjects,
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};


export const AllSubjectsLoaded = Template.bind({});

AllSubjectsLoaded.args = {
    subjects : allTheSubjects,
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};
