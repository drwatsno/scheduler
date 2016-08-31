'use strict';
requirejs.config({
  baseUrl: '/js/modules'
});

requirejs(['sails.io', 'autoforms', 'pikaday'],

  function (sails, autoforms, Pikaday) {
    var APP = {
      widgetsInit: function () {
        // AUTOFORMS form validator
        var forms = document.getElementsByClassName("es-b_form");

        [].slice.call(forms).forEach(function (form) {
          autoforms.init(form);
        });

        // Pikaday datepicker
        var datetimeInputs = document.getElementsByClassName("sch-e_date-input");

        [].slice.call(datetimeInputs).forEach(function (node) {
          node._pikaday = new Pikaday(
            {
              field: node,
              firstDay: 1,
              minDate: new Date(),
              maxDate: new Date((new Date(Date.now())).getFullYear()+10, 12, 31),
              yearRange: [(new Date(Date.now())).getFullYear(),(new Date(Date.now())).getFullYear()+10]
            });
        });
      },
      connectSails: function (options) {
        sails.connect();
      },
      init : function (options) {
        APP.connectSails();
        APP.widgetsInit();
      }
    };

  APP.init();

  });
