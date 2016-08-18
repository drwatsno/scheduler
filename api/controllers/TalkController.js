/**
 * TalkController
 *
 * @description :: Server-side logic for managing talks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * list all User talks
   * @param req
   * @param res
   */
  index: function (req, res) {
    return res.json({
      message: 'Talk.index not implemented'
    });
  },

  /**
   * show one talk
   * @param req
   * @param res
   * @returns {*}
   */
  view: function (req, res) {
    var talkId = req.param('id');

    return res.json({
      message: `(show talk with id ${talkId}) Talk.view not implemented`
    });
  },

  /**
   * show create talk form
   * redirect to login if not authenticated
   * @param req
   * @param res
   */
  create: function (req, res) {
    if (req.isAuthenticated()) {
      res.view('talk/create');
    } else {
      res.redirect('/login');
    }
  }
};

