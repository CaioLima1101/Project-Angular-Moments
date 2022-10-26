/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  //Route.resource('/moments/momentId/comments', 'CommentsController.store')

  Route.post('/moments', 'MomentsController.store') //Insert

  Route.get('/moments', 'MomentsController.index') //Get all moments

  Route.get('/moments/:id', 'MomentsController.handle') //Get a moment

  Route.delete('/moments/:id', 'MomentsController.destroy') //Delete a moment

  Route.put('/moments/:id', 'MomentsController.update') //Update a moment

  Route.post('/moments/:momentId/comments', 'CommentsController.store') //Insert comment
}).prefix('/api')
