const express = require('express');

const routes = (Recipie) => {
  const recipieRouter = express.Router();
  recipieRouter.route('/')
  .post( (req, res) => {
    const recip = new Recipie(req.body)
    recip.save()
    console.log('your new recipie has been saved', recip)
    return res.status(201).json(recip) // status 201 means created
  })
  .get((req, res) => {
    const query = req.query;
    Recipie.find(query, (err, recipies) =>{
    return err ? res.status(500).send(err) : res.json(recipies)
    });
  })
//this is the middleware .use
  recipieRouter.use('/:recipieID', (req,res, next) =>{
    Recipie.findById(req.params.recipieID,(err, recipie) =>{
      if (err) {res.send(err)} 
      if(recipie){
        req.recipie = recipie
        return next()
        }
      return res.sendStatus(404)
      })
   
  })

  recipieRouter.route('/:recipieID')
  .get((req, res) => res.json(req.recipie))
  .put( (req, res) => { 
     console.log('put')
      req.recipie.title = req.body.title
      req.recipie.dishType = req.body.dishType
      req.recipie.genre = req.body.genre
      req.recipie.made = req.body.made
      req.recipie.save()
      console.log('your new recipie has been modified', req.recipie)
      return res.json(req.recipie)
  })    
  .patch((req,res) => {
    if(req.body._id)
      delete req.body._id
    for(let i in req.body){
      req.recipie[i] = req.body[i];
      console.log('patch', req.body[i])
    }
    req.recipie.save((err)=> {
      err ? res.status(500).send(err) : res.json(req.recipie)
    }) 
  })
  .delete((req, res) => {
    req.recipie.remove((err) =>{
      console.log('deleted form list', /*res.recipie.title, res.body.title*/ )
      err ? res.status(500).send(err) : res.status(204).send('removed')
    })
  })
  return  recipieRouter  
}
module.exports = routes;
/*  const {recipie} = req;
    if(req.body._id){
      delete req.body._id
    }
    Object.entries(req.body).forEach((element) => {
      const key = element[0]
      const value = element[1]
      recipie[key] = value
    });
  */ 