import express from 'express';
import { Application } from 'express';
import { errorMiddleware } from './middlewares';

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
    this.app = express();
    this.port = appInit.port;

    this.applyMiddlewares(appInit.middleWares);
    this.registerRoutes(appInit.controllers);
    this.initializeErrorHandling();
  }

  private applyMiddlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
  }

  private registerRoutes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/api/', controller.router);
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;