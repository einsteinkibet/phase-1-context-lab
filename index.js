/* Your Code Here */
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  /* The allWagesFor function remains the same */
  
  /* Testing the code */
  const testEmployee = createEmployeeRecord(["John", "Doe", "Manager", 25]);
  console.log(testEmployee);
  // Output:
  // {
  //   firstName: 'John',
  //   familyName: 'Doe',
  //   title: 'Manager',
  //   payPerHour: 25,
  //   timeInEvents: [],
  //   timeOutEvents: []
  // }
  
  const testEmployees = createEmployeeRecords([
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Supervisor", 20],
  ]);
  console.log(testEmployees);
  // Output:
  // [
  //   {
  //     firstName: 'John',
  //     familyName: 'Doe',
  //     title: 'Manager',
  //     payPerHour: 25,
  //     timeInEvents: [],
  //     timeOutEvents: []
  //   },
  //   {
  //     firstName: 'Jane',
  //     familyName: 'Smith',
  //     title: 'Supervisor',
  //     payPerHour: 20,
  //     timeInEvents: [],
  //     timeOutEvents: []
  //   }
  // ]
  
  const testEmployeeWithTimeEvents = createEmployeeRecord(["John", "Doe", "Manager", 25]);
  createTimeInEvent.call(testEmployeeWithTimeEvents, "2023-06-30 09:00");
  createTimeOutEvent.call(testEmployeeWithTimeEvents, "2023-06-30 17:00");
  console.log(hoursWorkedOnDate.call(testEmployeeWithTimeEvents, "2023-06-30"));
  // Output: 8
  
  console.log(wagesEarnedOnDate.call(testEmployeeWithTimeEvents, "2023-06-30"));
  // Output: 200
  
  /*
   We're giving you this function. Take a look at it, you might see some usage
   that's new and different. That's because we're avoiding a well-known, but
   sneaky bug that we'll cover in the next few lessons!
  
   As a result, the lessons for this function will pass *and* it will be available
   for you to use if you need it!
   */
  
  const allWagesFor = function () {
      const eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })
  
      const payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
      return payable
  }