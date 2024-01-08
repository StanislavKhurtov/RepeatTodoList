import React from 'react'

import { ArrowBack, ArrowForward } from '@/assets'

import './Calendar.scss'

import { checkDateIsEqual, checkIsToday } from '../../utils/helpers/date'
import { useCalendar } from './hooks/useCalendar'

type CalendarProps = {
  firstWeekDayNumber?: number
  locale?: string
  selectDate: (date: Date) => void
  selectedDate: Date
}

export const Calendar: React.FC<CalendarProps> = ({
  firstWeekDayNumber = 2,
  locale = 'default',
  selectDate,
  selectedDate: date,
}) => {
  const { functions, state } = useCalendar({
    firstWeekDayNumber,
    locale,
    selectedDate: date,
  })

  return (
    <div className={'calendar'}>
      <div className={'calendar__header'}>
        <div
          className={'calendar__header__arrow__left'}
          onClick={() => functions.onClickArrow('left')}
        >
          <ArrowBack />
        </div>
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('monthes')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'monthes' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} -{' '}
            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div
          className={'calendar__header__arrow__right'}
          onClick={() => functions.onClickArrow('right')}
        >
          <ArrowForward />
        </div>
      </div>
      <div className={'calendar__body'}>
        {state.mode === 'days' && (
          <>
            <div className={'calendar__week__names'}>
              {state.weekDaysNames.map(weekDaysName => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={'calendar__days'}>
              {state.calendarDays.map(day => {
                const isToday = checkIsToday(day.date)
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date)
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex

                return (
                  <div
                    aria-hidden
                    className={[
                      'calendar__day',
                      isToday ? 'calendar__today__item' : '',
                      isSelectedDay ? 'calendar__selected__item' : '',
                      isAdditionalDay ? 'calendar__additional__day' : '',
                    ].join(' ')}
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDay(day)
                      selectDate(day.date)
                    }}
                  >
                    {day.dayNumber}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {state.mode === 'monthes' && (
          <div className={'calendar__pick__items__container'}>
            {state.monthesNames.map(monthesName => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                state.selectedYear === new Date().getFullYear()
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex

              return (
                <div
                  aria-hidden
                  className={[
                    'calendar__pick__item',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                    isCurrentMonth ? 'calendar__today__item' : '',
                  ].join(' ')}
                  key={monthesName.month}
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex)
                    functions.setMode('days')
                  }}
                >
                  {monthesName.monthShort}
                </div>
              )
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className={'calendar__pick__items__container'}>
            <div className={'calendar__unchoosable__year'}>
              {state.selectedYearsInterval[0] - 1}
            </div>
            {state.selectedYearsInterval.map(year => {
              const isCurrentYear = new Date().getFullYear() === year
              const isSelectedYear = year === state.selectedYear

              return (
                <div
                  aria-hidden
                  className={[
                    'calendar__pick__item',
                    isCurrentYear ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : '',
                  ].join(' ')}
                  key={year}
                  onClick={() => {
                    functions.setSelectedYear(year)
                    functions.setMode('monthes')
                  }}
                >
                  {year}
                </div>
              )
            })}
            <div className={'calendar__unchoosable__year'}>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
