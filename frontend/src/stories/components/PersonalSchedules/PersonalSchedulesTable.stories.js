import React from 'react';

import PersonalSchedulesTable from 'main/components/PersonalSchedules/PersonalSchedulesTable';
import { personalScheduleFixtures } from 'fixtures/personalScheduleFixtures';

export default {
    title: 'components/PersonalSchedules/PersonalSchedulesTable',
    component: PersonalSchedulesTable
};

const Template = (args) => {
    return (
        <PersonalSchedulesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    personalSchedules: []
};

export const ThreeSubjects = Template.bind({});

ThreeSubjects.args = {
    personalSchedules: personalScheduleFixtures.threePersonalSchedules
};


