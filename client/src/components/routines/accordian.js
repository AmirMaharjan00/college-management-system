import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState, forwardRef, createRef, useRef } from "react";
import { getScript } from "../functions";

/*
  Full Accordian
*/
const Accordions = ({ semesters }) => {
  const [ open, setOpen ] = useState( 1 )
  return <div className="accordionContainer">
    {
      Object.entries( semesters ).map(([ semester, subjects ]) => {
        return <Accordion
            key = { semester }
            semester = { semester }
            open = { open }
            setOpen = { setOpen }
            subjects = { subjects }
          />
      })
    }
  </div>
};

/*
  Accordian Toggles
*/
const Accordion = ( props ) => {
  const { semester, open, setOpen, subjects } = props

  let contentClass = 'content',
    arrowClass = 'arrow-icon'
  if( open == semester ) contentClass += ' show'
  if( open == semester ) arrowClass += ' toggle'

  // Handle According click
  const handleClick = () => {
    setOpen( semester )
  };

  return (
    <div className="accordion">
      <div className="title" onClick={ handleClick }>
        <p>{`${ getScript( semester ) } Semester`}</p>
        <span className="icon">
          <FontAwesomeIcon className={ arrowClass } icon={ faAngleDown } />
        </span>
      </div>

      <div className={ contentClass }>
        <table className="modern-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Subject Name</th>
              <th>Teacher</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>

          <tbody>
            { Object.entries( subjects ).map(( [ key, value ], index ) => {
              let { id, name, teacherId } = value
              return <tr key={ index}>
                <td>{ index + 1 }</td>
                <td className="course-name">{ `${ name }${ id ? `( ${ id } )` : '' }` }</td>
                <td>{ teacherId }</td>
                <td>{ 'Starting Time.' }</td>
                <td>{ 'Starting Time.' }</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accordions;
