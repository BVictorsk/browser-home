import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import moment, { Moment } from 'moment';
import './Calendar.scss';

function Calendar() {
  const [date, setDate] = useState<Moment>(moment());

  const weekdays = moment.weekdaysShort();

  const daysInMonth = date.daysInMonth();
  const firstDayOfMonth = moment(date).startOf('month').day();

  const blanks: React.ReactNode[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(<td key={`blank-${i}`}></td>);
  }

  const days: React.ReactNode[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const currentDay = moment().date();
    const isActive = d === currentDay && date.isSame(moment(), 'month');
    days.push(
      <td key={`day-${d}`} className={isActive ? 'active' : ''}>
        {d}
      </td>
    );
  }

  const totalSlots: React.ReactNode[] = [...blanks, ...days];
  const rows: React.ReactNode[][] = [];
  let cells: React.ReactNode[] = [];

  totalSlots.forEach((slot, i) => {
    if (i % 7 !== 0) {
      cells.push(slot);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(slot);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  const renderRows = (): React.ReactNode[] => {
    return rows.map((row, i) => {
      return <tr key={`row-${i}`}>{row}</tr>;
    });
  };

  const prevMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };

  const nextMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-btn">
        <button onClick={prevMonth}>
          <AiOutlineArrowLeft />
        </button>
        <h1>{date.format('MMM YYYY')}</h1>
        <button onClick={nextMonth}>
          <AiOutlineArrowRight />
        </button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {weekdays.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>

    </div>
  );
}

export default Calendar;
