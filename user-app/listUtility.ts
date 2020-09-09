import express from 'express';
// import Post from './post.interface';

class ListUtility {
  public path = '/birds';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    // define the home page route
    this.router.get('/', (req, res) => {
      res.send('Birds home page')
    })
    // define the about route
    this.router.get('/about', (req, res) => {
      res.send('About birds')
    })
  }
}
export default ListUtility;