const express = require('express')
const app = express.app()

const server= require('../group/server')

app.get('/', (req, res) => {}
)

app.get('/', incident.homeRoutes);

app.get('/add-incident', views.add-incident)

app.get('/update-incident', views.update-incident)

app.post('/incident', controller.create);
app.get('/incident', controller.find);
app.put('/incident/:id', controller.update);
app.delete('/incident/:id', controller.delete);
router.get(‘/’,(req,res,next)=>{
	incident.find((err
	if{
		return console.error(err);
}
else
{
		res.render(‘incident’{
			title:’Incident Report’
			incident: incident
		})
	}
     });
});
router.get(‘/add’, (req,res,next)=>{
	res.render(‘incident/add’, {title:’Add Incident’})
});
router.post(‘/add’, (req,res,next)=>{
	let newIncident = Incident({
		“name”:req.body.name,
		“email”:req.body.email,
		“incidentnumber”:req.body.incidentnumber,
		“employeeID”: req.body.employeeID,
		“location”:req.body.location
		“description”: req.body.description,
		“status”:req.body.status

});
	incident.create(newincident, (err, incident) => {
	 if(err){
		console.log(err);
		res.end(err);
	}else{
		res.redirect(’/incident’);
	}
	});
  router.get(‘/edit/:id’, (req,res,next)=>{
	let id = req.params.id;

	incidentdb.findById(id, (err, incidentToEdit))
	if(err){
		console.log(err);
		res.end(err);
	}
	else{
		res.render(‘incident/edit’, {title:’Edit Incident’, :IncidentToEdit});
	}
    router.post(‘/edit/:id’, (req,res,next)=>{
	let id=req.params.id
	let updateIncident = incident({
		“_id”:id,
		“name”:req.body.name,
		“email”:req.body.email,
		“incidentnumber”:req.body.incidentnumber,
		“employeeID”: req.body.employeeID,
		“location”:req.body.location
		“description”: req.body.description,
		“status”:req.body.status
	});
	incident.updateOne({_id:id},updateIncident,(err) =>{
		if(err){
		console.log(err);
		res.end(err);
		}
		else{
			res.redirect(‘/incident’);
		}
	});
});
router.get(‘/delete/:id’, (req,res,next)=>{
	let id = req.params.id;
	incident.deleteOne({_id:id},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
		}
		else{
			res.redirect(‘/incident’);
		}
	});
});




module.exports = app
