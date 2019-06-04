import * as express from 'express';
import { careRecipients } from './controllers/careRecipients';
import { pingController } from './controllers/ping';

const app = express();

app.use(pingController);
app.use(careRecipients);

export default app;
