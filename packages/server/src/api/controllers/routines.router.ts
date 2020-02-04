import express from 'express';
import controller from './routines.controller'
export default express.Router()
    .get('/', controller.all)
    // .get('/:id', controller.byId);