let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let incident= require('../model/model')
let incidentController = require('../controllers/incident');

//authentication check
function requireAuth(req,res,next){
	if(!req.isAuthenticated())
	{
		//redirect to login page
		return res.redirect('/login');
	}
	next();
}
//read
router.get('/',incidentController.displayIncidents);
//create
router.get('/add',requireAuth,incidentController.displayIncidentAdd);
router.post('add',requireAuth,incidentController.processIncidentAdd);
//update
router.get('/edit/:id',requireAuth,incidentController.displayIncidentEdit);
router.post('edit/:id',requireAuth,incidentController.processIncidentEdit);
//delete
router.get('/delete/:id',requireAuth,incidentController.incidentDelete);
module.exports = router;

