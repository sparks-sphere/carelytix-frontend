'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardCalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const bookedDates = [4, 10, 16, 23, 27]; // Example booked dates
  const selectedDates = [7]; // Example selected dates

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const getNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0,
    );
    const prevMonthDays = prevMonth.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${prevMonthDays - i}`}
          className="h-10 flex items-center justify-center text-gray-400 text-sm"
          disabled
        >
          {prevMonthDays - i}
        </button>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      const isSelected = selectedDates.includes(day);
      const isBooked = bookedDates.includes(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 flex items-center justify-center text-sm rounded-md transition-colors ${
            isSelected
              ? 'bg-purple-200 text-purple-800'
              : isBooked
                ? 'bg-purple-500 text-white'
                : isToday
                  ? 'bg-gray-900 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
        </button>,
      );
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= nextMonthDays; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="h-10 flex items-center justify-center text-gray-400 text-sm"
          disabled
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <Card className="h-full bg-gray-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Booking Calendar</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-200 rounded"></div>
                <span className="text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-gray-600">Booked</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
      </CardContent>
    </Card>
  );
}
