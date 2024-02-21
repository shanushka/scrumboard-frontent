import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  format,
  subMonths,
  parseISO,
  differenceInCalendarDays,
  getYear,
  getMonth,
} from "date-fns";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import "../../assests/css/timeline.css";
import Cell from "./cell";

/**
 * Timeline Component Page.
 * 
 * @param {*} param0 
 * @returns 
 */
const Timeline = ({ tasks }) => {
  const [currentDate, setcurrentDate] = useState(new Date());
  
  const firstMonthStart = startOfMonth(currentDate);
  const thirdMonthEnd = endOfMonth(addMonths(currentDate, 0));

  const days = eachDayOfInterval({
    start: firstMonthStart,
    end: thirdMonthEnd,
  });
  const totalColumns = days.length;

  const nextThreeMonths = () => setcurrentDate(addMonths(currentDate, 1));
  const prevThreeMonths = () => setcurrentDate(subMonths(currentDate, 1));

  /**
   * Renders task of a project in the timeline.
   * 
   * @param {Date} date 
   * @returns 
   */
  const renderTasks = (date) => {
    return tasks.map((task, index) => {
      const parsedStartDate = parseISO(task.startDate);
      const parsedEndDate = parseISO(task.endDate);
      
      const taskStartMonth = getMonth(parsedStartDate);
      const taskStartYear = getYear(parsedStartDate);
      const taskEndMonth = getMonth(parsedEndDate);
      const taskEndYear = getYear(parsedEndDate);
      const currentMonth = getMonth(date);
      const currentYear = getYear(date);

      let columnStart, columnEnd;
  
      // Check if the task starts or ends in the current month and year
      if ((taskStartMonth === currentMonth && taskStartYear === currentYear) || (taskEndMonth === currentMonth && taskEndYear === currentYear)) {
        columnStart = taskStartMonth === currentMonth && taskStartYear === currentYear ? differenceInCalendarDays(parsedStartDate, firstMonthStart) + 1 : 1;
        columnEnd = taskEndMonth === currentMonth && taskEndYear === currentYear ? differenceInCalendarDays(parsedEndDate, firstMonthStart) + 1 : totalColumns;
      } else if (taskStartMonth < currentMonth || taskStartYear < currentYear) {
        // If the task starts before the current view and ends during or after it
        if (taskEndMonth >= currentMonth && taskEndYear >= currentYear) {
          columnStart = 1;
          columnEnd = taskEndMonth === currentMonth && taskEndYear === currentYear ? differenceInCalendarDays(parsedEndDate, firstMonthStart) + 1 : totalColumns;
        } else {
          // Task does not fall within the current month and year
          return null;
        }
      } else {
        // Task does not fall within the current month and year
        return null;
      }
  
      return (
        < Cell index= {index} columnStart ={columnStart} columnEnd= {columnEnd} title={task.title}/>
      );
    }).filter(task => task !== null); // Filter out tasks that don't fall within the current view
  };

  return (
    <div className="timeline__main-wrapper">
      <div className ="timeline__header">
            <div className ="timeline__header-title">{format(firstMonthStart, 'MMMM yyyy')}</div>
           <div className="navigation">
              <ArrowBackIosNewIcon className='timeline__icon' onClick = {prevThreeMonths}/>
              <ArrowForwardIosIcon className='timeline__icon' onClick={nextThreeMonths}/>
            </div>
            </div>
            <div className="timeline__body">
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${totalColumns}, 40px)` }}>
          {days.map((day) => {
            const isNewMonth = day.getDate() === 1;
            const dayKey = format(day, 'yyyy-MM-dd');
            return (
              <div key={dayKey} className={`timeline__day-cell ${isNewMonth ? 'new-month' : ''}`} style={{
                padding: '10px',
                gridRow:1,
                borderLeft: isNewMonth ? '2px solid #000' : '1px solid #ddd',
                textAlign: 'center',
                zIndex: 1
              }}>
                {format(day, 'dd')}
              </div>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${totalColumns},40px)`, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          {renderTasks(currentDate)}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
