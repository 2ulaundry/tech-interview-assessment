import express from 'express';
import invoiceRoutes from './routes/invoiceRoute';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = 3000;

app.use('/api/invoice', invoiceRoutes);

app.get('/ping', (_req, res) => {
  console.log("Ping request");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
