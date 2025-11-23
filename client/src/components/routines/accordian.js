import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef } from "react";

const Accordion = forwardRef(({ program }, accordionRef) => {
  const { semester, courses } = program;

  const handleClick = () => {
    const content = accordionRef.current.querySelector(".content");
    const icon = accordionRef.current.querySelector(".arrow-icon");

    content.classList.toggle("show");
    icon.classList.toggle("rotate");
  };

  return (
    <div className="accordion" ref={accordionRef}>
      <div className="title" onClick={handleClick}>
        <p>{`Semester ${semester}`}</p>
        <span className="icon">
          <FontAwesomeIcon className="arrow-icon" icon={faAngleDown} />
        </span>
      </div>

      <div className="content">
        <table className="course-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Course Name</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.sno}>
                <td>{course.sno}</td>
                <td>{course.name}</td>
                <td>{course.start}</td>
                <td>{course.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Accordion;
