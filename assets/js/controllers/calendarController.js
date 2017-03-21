const appScheduler = require("../app");

appScheduler.controller("CalendarController", ["$state", "$log", "eventService", function ($state, $log, eventService) {
  const vm = this;

  const calendarViews = {
    VIEW_YEAR: "year",
    VIEW_MONTH: "month",
    VIEW_WEEK: "week",
    VIEW_DAY: "day"
  };

  vm.title = "Events";
  vm.view = calendarViews.VIEW_YEAR;
  vm.date = new Date();
  /* demo data */
  vm.events = [

  ];

  eventService.getEvents().then(function (res) {
    vm.events = res.map(event => ({
      title: event.name,
      startsAt: new Date(event.startDate),
      endsAt: new Date(event.endDate),
      id: event.id,
      owner: event.owner,
      color: {
        primary: '#e3bc08',
        secondary: '#fdf1ba'
      },
      actions: [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        cssClass: 'edit-action',
        onClick: function (args) {
          // to be implemented
        }
      }],
      draggable: true,
      resizable: true,
      incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
      recursOn: 'year',
      cssClass: 'a-css-class-name',
      allDay: false
    }));
  }).catch(err => $log.error(err));

  vm.eventClicked = function (calendarEvent) {
    // to be implemented
  };


}]);
