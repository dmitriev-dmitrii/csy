import {usersRouter} from "./users.js";
const API_VERSION_PREFIX = '/api'
export const  setupRoutes = (app)=> {

  app.get('/', async (req, res) => {
    res.send('salam friend!')
  })

  app.use(`${API_VERSION_PREFIX}/users`, usersRouter);

}

