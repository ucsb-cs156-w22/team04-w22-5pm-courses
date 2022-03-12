import { fireEvent, queryByTestId, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import PersonalSchedulesEditPage from "main/pages/PersonalSchedules/PersonalSchedulesEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("PersonalSchedulesEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/personalschedules", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {
            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <PersonalSchedulesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit PersonalSchedule")).toBeInTheDocument());
            expect(queryByTestId("PersonalSchedule-name")).not.toBeInTheDocument();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/personalschedules", { params: { id: 17 } }).reply(200, {
                id: 17,
                name: "Pi Day",
                description: "desc",
                quarter: "20082"
            });
            axiosMock.onPut('/api/personalschedules').reply(200, {
                id: "17",
                name: "ChristmasMorning",
                description: "desc",
                quarter: "20083"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <PersonalSchedulesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <PersonalSchedulesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("PersonalScheduleForm-name")).toBeInTheDocument());

            const nameField = getByTestId("PersonalScheduleForm-name");
            const descriptionField = getByTestId("PersonalScheduleForm-description");
            const quarterField = document.querySelector("#PersonalScheduleForm-quarter");
            const submitButton = getByTestId("PersonalScheduleForm-submit");

            expect(nameField).toHaveValue("Pi Day");
            expect(quarterField).toHaveValue("20221");
            expect(descriptionField).toHaveValue("Pi Day");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <PersonalSchedulesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("PersonalScheduleForm-name")).toBeInTheDocument());

            const nameField = getByTestId("PersonalScheduleForm-name");
            const descriptionField = getByTestId("PersonalScheduleForm-description");
            const quarterField = document.querySelector("#PersonalScheduleForm-quarter");
            const submitButton = getByTestId("PersonalScheduleForm-submit");

            //expect(idField).toHaveValue("17");
            expect(nameField).toHaveValue("Pi Day");
            expect(quarterField).toHaveValue("20081");
            expect(descriptionField).toHaveValue("Pi Day");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(quarterField, { target: { value: '20221' } })
            fireEvent.change(nameField, { target: { value: '17' } })
            fireEvent.change(descriptionField, { target: { value: "Pi Day" } })

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("PersonalSchedule Updated - id: 17 name: 17");
            expect(mockNavigate).toBeCalledWith({ "to": "/personalschedules/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                name: '17',
                description: "Pi Day",
                quarter: "20221" //quarter stuff is not gonna work
            })); // posted object

        });

       
    });
});