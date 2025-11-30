/**
 * Routines
 */
import "../assets/scss/routines.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { ourFetch, fetchCallback } from "../functions";
import Accordions from "./accordian";
import { useEffect, useId, useState, useMemo } from "react";

export const Routines = () => {
  const [ courses, setCourses ] = useState([]),
    [ subjects, setSubjects ] = useState([]),
    [ activeCourseIndex, setActiveCourseIndex ] = useState( 0 ),
    activeCourse = useMemo(() => {
      return courses.reduce(( _thisVal, course, index ) => {
        if( index === activeCourseIndex ) _thisVal = course
        return _thisVal
      }, {})
    }, [ courses, activeCourseIndex ]),
    filteredSubjects = useMemo(() => {

      return subjects.reduce(( _thisVal, subject ) => {
        let { semester } = subject

        if ( ! _thisVal[ semester ] ) _thisVal[ semester ] = [];
        _thisVal[ semester ].push( subject );

        return _thisVal;
      }, {})
    }, [ subjects, activeCourseIndex ])

  useEffect(() => {
    ourFetch({
      api: '/courses',
      callback: fetchCallback,
      setter: setCourses
    })
  }, [])

  useEffect(() => {
    let { id } = activeCourse
    ourFetch({
      api: '/subject-via-course-id',
      callback: fetchCallback,
      setter: setSubjects,
      body: JSON.stringify({ id })
    })
  }, [ activeCourse ])

  return (
    <main className="cmg-main" id="cmg-main">
      <div className="cmg-routines-wrapper">
        <h1 className="cmg-title">Programs</h1>
        <div className="cmg-routine-wrap">
          <div className="cmg-routine-sidebar">
            <h2 className="cmg-sidebar-title">Courses</h2>
            <ul className="cmg-sidebar-list">
              {
                courses.map(( course, index ) => {
                  let { abbreviation } = course,
                    liClass = 'cmg-sidebar-item'

                  if( index === activeCourseIndex ) liClass += ' active'
                  return <li key={ index } className={ liClass } onClick={() => setActiveCourseIndex( index )}>{ abbreviation }</li>
                })
              }
            </ul>
          </div>

          <div className="cmg-routine-content">
            <h2 className="cmg-content-title">Routines</h2>
            <Accordions semesters={ filteredSubjects } />
          </div>
        </div>
      </div>
    </main>
  );
};
