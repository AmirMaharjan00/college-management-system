import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React, { forwardRef, createRef, useRef } from "react";

const ExamAccordions = ({ data }) => {
  const refs = useRef({});

  return (
    <div className="accordionContainer">
      {data.map((item) => (
        <ExamAccordion
          key={item.id}
          exam={item}
          ref={
            refs.current[item.id]
              ? refs.current[item.id]
              : (refs.current[item.id] = createRef())
          }
        />
      ))}
    </div>
  );
};

const ExamAccordion = forwardRef(({ exam }, accordionRef) => {
  const handleClick = () => {
    const content = accordionRef.current.querySelector(".content");
    const icon = accordionRef.current.querySelector(".arrow-icon");

    content.classList.toggle("show");
    icon.classList.toggle("rotate");
  };

  return (
    <div className="accordion" ref={accordionRef}>
      <div className="title" onClick={handleClick}>
        <p>Monthly Test ({exam.month})</p>
        <span className="icon">
          <FontAwesomeIcon className="arrow-icon" icon={faAngleDown} />
        </span>
      </div>

      <div className="content">
        {exam.subjects.length > 0 ? (
          <>
            <table className="course-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Max Marks</th>
                  <th>Min Marks</th>
                  <th>Marks Obtained</th>
                  <th>Result</th>
                </tr>
              </thead>

              <tbody>
                {exam.subjects.map((sub, i) => (
                  <tr key={i}>
                    <td>{sub.name}</td>
                    <td>{sub.max}</td>
                    <td>{sub.min}</td>
                    <td>{sub.obtained}</td>
                    <td>
                      <span
                        className={`result-badge ${
                          sub.result === "Pass" ? "result-pass" : "result-fail"
                        }`}
                      >
                        {sub.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="exam-footer">
              <p>Rank: {exam.rank}</p>
              <p>Total: {exam.totalMarks}</p>
              <p>Marks Obtained: {exam.marksObtained}</p>
              <p>Percentage: {exam.percentage}</p>
              <p className={exam.result === "Pass" ? "pass" : "fail"}>
                Result: {exam.result}
              </p>
            </div>
          </>
        ) : (
          <p className="no-data">No data available</p>
        )}
      </div>
    </div>
  );
});

export default ExamAccordions;
