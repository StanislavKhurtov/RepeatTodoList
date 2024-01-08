import { createDate } from './createDate'

export const getMonthesNames = (locale: string = 'defalut') => {
  const monthesNames: {
    date: ReturnType<typeof createDate>['date']
    month: ReturnType<typeof createDate>['month']
    monthIndex: ReturnType<typeof createDate>['monthIndex']
    monthShort: ReturnType<typeof createDate>['monthShort']
  }[] = Array.from({ length: 12 })

  const d = new Date()

  monthesNames.forEach((_, i) => {
    const { date, month, monthIndex, monthShort } = createDate({
      date: new Date(d.getFullYear(), d.getMonth() + i, 1),
      locale,
    })

    monthesNames[monthIndex] = { date, month, monthIndex, monthShort }
  })

  return monthesNames
}
