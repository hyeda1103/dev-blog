import express, { Application, Request, Response } from 'express';

const app = express();

app.get('/api/register', (req: Request, res: Response) => {
  res.json({
    data: 'You hit register endpoint~'
  })
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`API is running on port ${port}`))
