// backend/index.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let articles = [
    { id: 1, title: 'Sample Article 1', content: 'This is the content of Sample Article 1' },
    { id: 2, title: 'Sample Article 2', content: 'This is the content of Sample Article 2' },
];
app.get('/', (req, res) => {
    res.send('This is the Backend!');
});
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

app.get('/api/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article not found');
    res.json(article);
});

app.post('/api/articles', (req, res) => {
    const article = {
        id: articles.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    articles.push(article);
    res.status(201).json(article);
});

app.put('/api/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article not found');
    article.title = req.body.title;
    article.content = req.body.content;
    res.json(article);
});

app.delete('/api/articles/:id', (req, res) => {
    const articleIndex = articles.findIndex(a => a.id === parseInt(req.params.id));
    if (articleIndex === -1) return res.status(404).send('Article not found');
    articles.splice(articleIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});
