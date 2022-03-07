import BasicLayout from "main/layouts/BasicLayout/BasicLayout";


import { useState } from "react";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
import { fetchBasicCourseJSON } from "main/services/courseSearches";

export default function HomePage() {

  const initialCourseJSON = {
      "pageNumber": 1,
      "pageSize": 1,
      "total": 0,
      "classes": []
  };

  // courseId, title, sectionNumber, instructor, enroll code, units, total enrolled students, max enrolled
  const [courseJSON, setCourseJSON] = useState(initialCourseJSON);

  //Check for closed, cancelled, full status
  // const [cancelled, setCancelledChecked] = useState(false);
  // const [closed, setClosedChecked] = useState(false);
  // const [full, setFullChecked] = useState(false);

  // const handleCancelledOnChange = () => {
  //     setCancelledChecked(!cancelled);
  // };
  // const handleClosedOnChange = () => {
  //     setClosedChecked(!closed);
  // };
  // const handleFullOnChange = () => {
  //     setFullChecked(!full);
  // };

  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Courses Search App!</h5>
        <BasicCourseSearchForm setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseJSON} />
      </div>
    </BasicLayout>
  )
}