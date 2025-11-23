/**
 * Routines
 */
import "../assets/scss/routines.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Accordions from "./accordians";
import { useId, useState } from "react";

export const Routines = () => {
  const [collegePrograms, setCollegePrograms] = useState({
    BCA: [
      {
        semester: "I",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Computer Fundamentals & Applications",
            start: "09:00",
            end: "10:30",
          },
          {
            sno: 2,
            name: "Society and Technology",
            start: "10:45",
            end: "12:15",
          },
          { sno: 3, name: "English I", start: "13:00", end: "14:30" },
          { sno: 4, name: "Mathematics I", start: "14:45", end: "16:15" },
          { sno: 5, name: "Digital Logic", start: "16:30", end: "18:00" },
        ],
      },
      {
        semester: "II",
        id: useId(),
        courses: [
          { sno: 1, name: "C Programming", start: "09:00", end: "10:30" },
          {
            sno: 2,
            name: "Financial Accounting",
            start: "10:45",
            end: "12:15",
          },
          { sno: 3, name: "English II", start: "13:00", end: "14:30" },
          { sno: 4, name: "Mathematics II", start: "14:45", end: "16:15" },
          {
            sno: 5,
            name: "Microprocessor and Computer Architecture",
            start: "16:30",
            end: "18:00",
          },
        ],
      },
      {
        semester: "III",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Data Structures and Algorithms",
            start: "09:00",
            end: "10:30",
          },
          {
            sno: 2,
            name: "Probability and Statistics",
            start: "10:45",
            end: "12:15",
          },
          {
            sno: 3,
            name: "System Analysis and Design",
            start: "13:00",
            end: "14:30",
          },
          { sno: 4, name: "OOP in Java", start: "14:45", end: "16:15" },
          { sno: 5, name: "Web Technology", start: "16:30", end: "18:00" },
        ],
      },
      {
        semester: "IV",
        id: useId(),
        courses: [
          { sno: 1, name: "Operating System", start: "09:00", end: "10:30" },
          { sno: 2, name: "Numerical Methods", start: "10:45", end: "12:15" },
          {
            sno: 3,
            name: "Software Engineering",
            start: "13:00",
            end: "14:30",
          },
          { sno: 4, name: "Scripting Language", start: "14:45", end: "16:15" },
          {
            sno: 5,
            name: "Database Management System",
            start: "16:30",
            end: "18:00",
          },
          { sno: 6, name: "Project I", start: "18:15", end: "19:45" },
        ],
      },
      {
        semester: "V",
        id: useId(),
        courses: [
          { sno: 1, name: "MIS and E-Business", start: "09:00", end: "10:30" },
          { sno: 2, name: "DotNet Technology", start: "10:45", end: "12:15" },
          { sno: 3, name: "Computer Networking", start: "13:00", end: "14:30" },
          {
            sno: 4,
            name: "Introduction to Management",
            start: "14:45",
            end: "16:15",
          },
          {
            sno: 5,
            name: "Computer Graphics and Animation",
            start: "16:30",
            end: "18:00",
          },
        ],
      },
      {
        semester: "VI",
        id: useId(),
        courses: [
          { sno: 1, name: "Mobile Programming", start: "09:00", end: "10:30" },
          { sno: 2, name: "Distributed System", start: "10:45", end: "12:15" },
          { sno: 3, name: "Applied Economics", start: "13:00", end: "14:30" },
          {
            sno: 4,
            name: "Advanced Java Programming",
            start: "14:45",
            end: "16:15",
          },
          { sno: 5, name: "Network Programming", start: "16:30", end: "18:00" },
          { sno: 6, name: "Project II", start: "18:15", end: "19:45" },
        ],
      },
      {
        semester: "VII",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Cyber Law and Professional Ethics",
            start: "09:00",
            end: "10:30",
          },
          { sno: 2, name: "Cloud Computing", start: "10:45", end: "12:15" },
          { sno: 3, name: "Internship", start: "13:00", end: "16:00" },
          { sno: 4, name: "Elective I", start: "16:15", end: "17:45" },
          { sno: 5, name: "Elective II", start: "18:00", end: "19:30" },
        ],
      },
      {
        semester: "VIII",
        id: useId(),
        courses: [
          { sno: 1, name: "Operations Research", start: "09:00", end: "10:30" },
          { sno: 2, name: "Project III", start: "10:45", end: "13:45" },
          { sno: 3, name: "Elective III", start: "14:00", end: "15:30" },
          { sno: 4, name: "Elective IV", start: "15:45", end: "17:15" },
        ],
      },
    ],

    BBS: [
      {
        semester: "I",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Business English (MGT 201)",
            start: "09:00",
            end: "10:30",
          },
          {
            sno: 2,
            name: "Business Statistics (MGT 202)",
            start: "10:45",
            end: "12:15",
          },
          {
            sno: 3,
            name: "Microeconomics (MGT 203)",
            start: "13:00",
            end: "14:30",
          },
          {
            sno: 4,
            name: "Accounting for Financial Analysis (MGT 211)",
            start: "14:45",
            end: "16:15",
          },
          {
            sno: 5,
            name: "Principles of Management (MGT 213)",
            start: "16:30",
            end: "18:00",
          },
        ],
      },
      {
        semester: "II",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Business Communication (MGT 205)",
            start: "09:00",
            end: "10:30",
          },
          {
            sno: 2,
            name: "Macroeconomics (MGT 206)",
            start: "10:45",
            end: "12:15",
          },
          {
            sno: 3,
            name: "Cost and Management Accounting (MGT 212)",
            start: "13:00",
            end: "14:30",
          },
          {
            sno: 4,
            name: "Fundamentals of Marketing (MGT 214)",
            start: "14:45",
            end: "16:15",
          },
          {
            sno: 5,
            name: "Foundations of HR Management (MGT 216)",
            start: "16:30",
            end: "18:00",
          },
        ],
      },
      {
        semester: "III",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Business Law (MGT 204)",
            start: "09:00",
            end: "10:30",
          },
          {
            sno: 2,
            name: "Fundamentals of Financial Management (MGT 215)",
            start: "10:45",
            end: "12:15",
          },
          {
            sno: 3,
            name: "Business Environment and Strategy (MGT 217)",
            start: "13:00",
            end: "14:30",
          },
          {
            sno: 4,
            name: "Taxation and Auditing (MGT 218)",
            start: "14:45",
            end: "16:15",
          },
          {
            sno: 5,
            name: "Organizational Behavior (MGT 219)",
            start: "16:30",
            end: "18:00",
          },
        ],
      },
      {
        semester: "IV",
        id: useId(),
        courses: [
          {
            sno: 1,
            name: "Entrepreneurship and Enterprise Development (MGT 220)",
            start: "09:00",
            end: "10:30",
          },
          {
            sno: 2,
            name: "Business Research Methods (MGT 221)",
            start: "10:45",
            end: "12:15",
          },
          {
            sno: 3,
            name: "Final Project (MGT 401)",
            start: "13:00",
            end: "15:00",
          },
        ],
      },
    ],
  });

  const [selectedProgram, setSelectedProgram] = useState([]);

  return (
    <main className="cmg-main" id="cmg-main">
      <div>
        <h1>Programs at Sahid Smarak College</h1>

        {/* Table with programs and button */}
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Program</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BCA</td>
              <td>
                <button onClick={() => setSelectedProgram(collegePrograms.BCA)}>
                  Select BCA
                </button>
              </td>
            </tr>
            <tr>
              <td>BBS</td>
              <td>
                <button onClick={() => setSelectedProgram(collegePrograms.BBS)}>
                  Select BBS
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Accordions selectedProgram={selectedProgram} />
    </main>
  );
};
