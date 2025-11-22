import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'finance-tracker-api',
    version: process.env.npm_package_version || '0.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  const port = Number(process.env.PORT || 4000);
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}
