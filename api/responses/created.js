/**
 * 201 (CREATED) Response
 *
 * Usage:
 * return res.created();
 * return res.created(data);
 * return res.created(data, "auth/login");
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */
"use strict";

module.exports = function created (data, options) {

  // Get access to `req`, `res`, & `sails`
  let req = this.req;
  let res = this.res;
  let sails = req._sails;

  sails.log.silly(`res.created() :: Sending 201 ("CREATED") response`);

  // Set status code
  res.status(201);

  // If appropriate, serve data as JSON(P)
  // If views are disabled, revert to json
  if (req.wantsJSON || sails.config.hooks.views === false) {
    return res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === "string") ? { view: options } : options || {};

  // Attempt to prettify data for views, if it"s a non-error object
  let viewData = data;
  if (!(viewData instanceof Error) && typeof viewData === "object") {
    try {
      viewData = require("util").inspect(data, {depth: null});
    }
    catch(e) {
      viewData = undefined;
    }
  }

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn"t
  // work, just send JSON.
  if (options.view) {
    return res.view(options.view, { data: viewData, title: "Created" });
  } else {
    return res.view("message", {
      message: {
        type: "success",
        name: `Successfully created ${options.modelName}`,
        content: `Successfully created ${options.modelName} ${data.name}`,
        links: [
          {
            url: `/${options.modelName}/${data.id}`,
            name: `Show ${options.modelName}`
          },
          {
            url: `/`,
            name: `Return to main`
          },
          {
            url: `/user`,
            name: `My profile`
          }
        ]
      }
    });
  }

};
