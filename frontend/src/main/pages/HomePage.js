import BasicLayout from "main/layouts/BasicLayout/BasicLayout";


import { useState } from "react";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";

//temp placeholder
/* istanbul ignore next */ 
// Stryker disable next-line all : temporary placeholder function. This function fetches the course data given quater, level, subject
function fetchBasicCourseJSON(event, params){
  return null;
}

//temp placeholder
/* istanbul ignore next */ 
// Stryker disable next-line all : temporary placeholder function. This function updates json after course list is fetched
function setCourseJSON(json){
  return;
}


export default function HomePage() {

  // const initialCourseJSON = {
  //     "pageNumber": 1,
  //     "pageSize": 1,
  //     "total": 0,
  //     "classes": []
  // };

  // // courseId, title, sectionNumber, instructor, enroll code, units, total enrolled students, max enrolled
  // const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Courses Search App!</h5>
        <BasicCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseJSON} />
      </div>
    </BasicLayout>
  )
}