function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatComment (comment) {
  return {
    id: comment.M.Ui,
    author: comment.M.N,
    phone: comment.M.Ta,
    floor: comment.M.SF || `${comment.F}楼`,
    content: comment.M.C.replace(/<img/g, '<img width="100%"')
  }
}
