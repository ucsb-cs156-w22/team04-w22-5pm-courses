import { render } from "@testing-library/react";
import HomePage from "main/pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("HomePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);
  axiosMock
    .onGet("/api/currentUser")
    .reply(200, apiCurrentUserFixtures.userOnly);
  axiosMock
    .onGet("/api/systemInfo")
    .reply(200, systemInfoFixtures.showingNeither);

  const queryClient = new QueryClient();
  test("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("calls UCSB Curriculum api correctly", () => {
    const oneCourse = [
      {
        quarter: "20211",
        courseId: "CMPSC 8",
        title: "INTRO TO COMP SCI",
        description:
          "Introduction to computer program development for students with little to no programming experience. Basic programming concepts, variables and expressions, data and control structures, algorithms, debugging, program design, and documentation.",
        objLevelCode: "U",
        subjectArea: "CMPSC ",
        unitsFixed: 4,
      },
    ];

    axiosMock.onGet("/api/public/basicsearch").reply(200, oneCourse);
    const { getByText, getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const submitButton = getByText("Submit");
    const selectQuarter = getByLabelText("Quarter");
    userEvent.selectOptions(selectQuarter, "20211");
    const selectSubject = getByLabelText("Subject Area");
    userEvent.selectOptions(selectSubject, "ANTH");
    const selectLevel = getByLabelText("Course Level");
    userEvent.selectOptions(selectLevel, "G");
    userEvent.click(submitButton);

    expect(HomePage.fetchBasicCourseJSON).toHaveBeenCalledWith(
      sampleReturnValue
    );
    expect(HomePage.setCourseJSON).toHaveBeenCalledWith(
      expect.any(Object),
      expectedFields
    );
  });
});
