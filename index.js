// Your code here
function createEmployeeRecord(arry) {
  const person = {
  firstName: arry[0], 
  familyName: arry[1], 
  title: arry[2],
  payPerHour: arry[3],
  timeInEvents: [], 
  timeOutEvents: []

  }
  return person;
}

function createEmployeeRecords(arrys) {
  let employees = []
  for (let i = 0; i < arrys.length; i++){
    employees.push(createEmployeeRecord(arrys[i]));
  }
  return employees;
}

function createTimeInEvent(employee, timeIn) {
  const t = timeIn.split(' ')
  employee.timeInEvents.push({
    type: 'TimeIn', 
    hour: parseInt(t[1]), 
    date: t[0]
  });
return employee;
}

function createTimeOutEvent(employee, timeOut) {
  const t = timeOut.split(' ')
  employee.timeOutEvents.push({
    type: 'TimeOut', 
    hour: parseInt(t[1]), 
    date: t[0]
  });
return employee;
}









let hoursWorkedOnDate = function(employee, soughtDate){
  let inEvent = employee.timeInEvents.find(function(e){
      return e.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
  let rawWage = hoursWorkedOnDate(employee, dateSought)
      * employee.payPerHour
  return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
return srcArray.find(function(rec){
  return rec.firstName === firstName
})
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}