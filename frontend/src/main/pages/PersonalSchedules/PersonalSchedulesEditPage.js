import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import PersonalScheduleForm from "main/components/PersonalSchedules/PersonalScheduleForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function PersonalSchedulesEditPage() {
  let { id } = useParams();

  const { data: personalSchedule, error: error, status: status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/personalschedules?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/personalschedules`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (personalSchedule) => ({
    url: "/api/personalschedules",
    method: "PUT",
    params: {
      id: personalSchedule.id,
    },
    data: {
      name: personalSchedule.name,
      description: personalSchedule.description,
      quarter: "20083" //personalSchedule.quarter isn't gonna work
    }
  });

  const onSuccess = (personalSchedule) => {
    toast(`PersonalSchedule Updated - id: ${personalSchedule.id} name: ${personalSchedule.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/personalschedules?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/personalschedules/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit PersonalSchedule</h1>
        {personalSchedule &&
          <PersonalScheduleForm initialPersonalSchedule={personalSchedule} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}