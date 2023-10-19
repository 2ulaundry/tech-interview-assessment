import express from 'express';
import invoiceRoutes from './routes/invoiceRoute';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/invoice', invoiceRoutes);

app.get('/ping', (_req, res) => {
  console.log("Ping request");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})
