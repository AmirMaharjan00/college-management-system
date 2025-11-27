import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef, createRef, useRef } from "react";

/*
  Full Accordian
*/
const Accordions = ({ selectedProgram }) => {
  const accordionRefs = useRef({});
  return (
    <>
      <div className="accordionContainer">
        {selectedProgram.map((program) => {
          return (
            <Accordion
              key={program.id}
              program={program}
              ref={
                accordionRefs.current[program.id]
                  ? accordionRefs.current[program.id]
                  : (accordionRefs.current[program.id] = createRef())
              }
            />
          );
        })}
      </div>
    </>
  );
};

/*
  Accordian Toggles
*/
const Accordion = forwardRef(({ program }, accordionRef) => {
  const { semester, courses } = program;

  const handleClick = () => {
    const content = accordionRef.current.querySelector(".content"),
      icon = accordionRef.current.querySelector(".arrow-icon");

    content.classList.toggle("show");
    icon.classList.toggle("rotate");
  };

  return (
    <div className="accordion" ref={accordionRef}>
      <div className="title" onClick={handleClick}>
        <p>{`${semester}`}</p>
        <span className="icon">
          <FontAwesomeIcon className="arrow-icon" icon={faAngleDown} />
        </span>
      </div>

      <div className="content">
        <table className="modern-table">
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
                <td className="course-name">{course.name}</td>
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

export default Accordions;
