import React, { createRef, useRef } from "react";
import Accordion from "./accordian";

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

export default Accordions;
