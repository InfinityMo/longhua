// Tip:所有结束时间均为当前时间前一天
import { dateFormat } from './funcStore'
// 昨天
export function getYesterday () {
  var yesterday = dateFormat('YYYY-mm-dd', new Date(new Date().getTime() - 24 * 60 * 60 * 1000))
  return yesterday
}
// 最近30天
export function getLastThirtyDay () {
  var nowDate = new Date()
  var prevOneDate = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate() - 1}`
  var DateIn = new Date((new Date().getTime() - 1000 * 60 * 60 * 24 * 30))
  var Year = 0
  var Month = 0
  var Day = 0
  var prevDate = ''
  // 初始化时间
  Year = DateIn.getYear()
  Month = DateIn.getMonth() + 1
  Day = DateIn.getDate()
  Year = (Year < 1900 ? (1900 + Year) : Year)
  prevDate = Year + '-'
  if (Month >= 10) {
    prevDate = prevDate + Month + '-'
  } else {
    prevDate = prevDate + '0' + Month + '-'
  }
  if (Day >= 10) {
    prevDate = prevDate + Day
  } else {
    prevDate = prevDate + '0' + Day
  }
  return [prevDate, prevOneDate]
}
// 最近7天
export function getLastSevenDay () {
  var curDate = new Date()
  var now = new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var day = now.getDate()
  var dateObj = {}
  dateObj.now = year + '-' + month + '-' + day
  if (day - 7 <= 0) { // 如果在当月7日之前
    var lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate() // 1周前所在月的总天数
    if (month - 1 <= 0) { // 如果在当年的1月份
      dateObj.last = (year - 1) + '-' + 12 + '-' + (31 - (6 - day))
    } else {
      dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (6 - day))
    }
  } else {
    dateObj.last = year + '-' + month + '-' + (day - 6)
  }
  var dateLast = new Date(dateObj.last)
  var dateNow = new Date(dateObj.now)
  return [dateFormat('YYYY-mm-dd', dateLast), dateFormat('YYYY-mm-dd', dateNow)]
}
// 最近一年
export function recentYear () {
  var tempYear = new Date()
  var recentSetYear = new Date(tempYear.setFullYear(tempYear.getFullYear() - 1))
  var recentYear = `${recentSetYear.getFullYear()}-${recentSetYear.getMonth() + 1}-${recentSetYear.getDate() - 1}`
  var nowDate = new Date()
  var prevOneDate = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate() - 1}`
  return [recentYear, prevOneDate]
}
// 上周
export function prevWeek () {
  var now = new Date()
  var weekDate = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
  var weekDate2 = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
  var day = weekDate.getDay()
  var time = weekDate.getDate() - day + (day === 0 ? -6 : 1)
  var startDate = new Date(weekDate.setDate(time))
  var endDate = new Date(weekDate2.setDate(time + 6))
  return [dateFormat('YYYY-mm-dd', startDate), dateFormat('YYYY-mm-dd', endDate)]
}
// 去年
export function prevYear () {
  var now = new Date()
  var lastYear = now.getFullYear() - 1
  return [`${lastYear}-01-01`, `${lastYear}-12-31`]
}

// 根据当前月份拼接完成日期
export function monthSpliceDay (monthYear) {
  // 当前月份
  var currentDate = new Date()
  var currentDay = currentDate.getDate()
  var nowYear = new Date().getFullYear()
  var nowMonth = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`
  // 当前日期的前一天
  var prevOneDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getDate()
  if (prevOneDate < 10) {
    prevOneDate = `0${prevOneDate}`
  }
  // 指定日期
  var pointDate = new Date(monthYear)
  var pointYear = pointDate.getFullYear()
  var pointMonth = pointDate.getMonth() + 1 >= 10 ? pointDate.getMonth() + 1 : `0${pointDate.getMonth() + 1}`
  // 指定月份的最后一天
  var pointMonthLastDay = new Date(pointYear, pointMonth, 0).getDate()
  if (nowMonth === pointMonth && nowYear === pointYear) {
    if (currentDay === 1) {
      return [`${pointYear}-${pointMonth}-01`, `${pointYear}-${pointMonth}-01`]
    } else {
      return [`${pointYear}-${pointMonth}-01`, `${pointYear}-${pointMonth}-${prevOneDate}`]
    }
  } else {
    return [`${pointYear}-${pointMonth}-01`, `${pointYear}-${pointMonth}-${pointMonthLastDay}`]
  }
}
export function prevThreeMonth () {
  var date = new Date()
  var nowYear = date.getFullYear()
  var nowMonth = date.getMonth() + 1
  var nowDay = date.getDate()
  var lastYear = nowYear
  var lastMonth = nowMonth
  lastMonth -= 2
  if (nowMonth <= 0) {
    lastYear -= 1
    lastMonth += 10
  }
  var lastDay = new Date(lastYear, lastMonth, 0).getDate()
  return [lastYear + '-' + lastMonth + '-' + lastDay, nowYear + '-' + nowMonth + '-' + nowDay]
}
