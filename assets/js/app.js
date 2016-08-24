'use strict';
requirejs.config({
  baseUrl: '/js/modules'
});

requirejs(['sails.io', 'autoforms'],

  function (sails, autoforms) {
    var forms = document.getElementsByClassName("sch-b_form");

    for (let form of forms) {
      autoforms.init(form);
    }
  });
