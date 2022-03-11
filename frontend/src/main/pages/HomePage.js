import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useState } from "react";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import { useBackendMutation } from "main/utils/useBackend";

export default function HomePage() {

  const [courseJSON, setCourseJSON] = useState([])

  const objectToAxiosParams = (query) => ({
    url: "/api/public/basicsearch",
    method: "GET",
    params: {
      qtr: query.quarter,
      dept: query.subject,
      level: query.level
    },
  });
  
  const onSuccess = (courses) => {
    return courses
  };
  
  const mutation = useBackendMutation(
    objectToAxiosParams,
    {onSuccess},
    // Stryker disable next-line all : hard to set up test for caching
    []
  );
  
  
  // Stryker disable next-line all : temporary placeholder function. This function fetches the course data given quarter, level, subject
  async function fetchBasicCourseJSON(event, query){
    mutation.mutate(query);
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Courses Search App!</h5>
        <BasicCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseJSON} />
      </div>
    </BasicLayout>
  )
}