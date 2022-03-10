import React from 'react';

import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm"
// import { personalSchedulesFixtures } from 'fixtures/personalSchedulesFixtures';

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

// export const Show = Template.bind({});

// Show.args = {
//     personalSchedule: personalSchedulesFixtures.onePersonalSchedule,
//     submitText: "",
//     submitAction: () => { }
// };