'use strict';
requirejs.config({
  baseUrl: '/js/modules'
});

requirejs(['sails.io', 'autoforms'],

  function (sails, autoforms) {
    
    sails.connect();
    
    var forms = document.getElementsByClassName("es-b_form");

    [].slice.call(forms).forEach(function (form) {
      autoforms.init(form);
    });
  });
