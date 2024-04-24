import express from 'express';
import 'mongoose';
import { Card } from './CardMongo.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/cards', (req, res) => {
    const card = new Card(req.body);

    card.save().then((card) => {
        res.send({
            message: "New card added to the collection!",
            card: card,
        });
    })
    .catch((err) => {
        res.send(err);
    });
});

app.get('/cards', (req, res) => {
    const filter = req.query.id? {id: req.query.id as number}:{};
    
    Card.find(filter).then((cards) => {
        if (cards.length !== 0) {
            res.send(cards);
        } else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send;
    });
})

app.patch('/cards', (req, res) => {
    if(!req.query.id) {
        res.status(400).send({
            error: 'An ID must be provided in the query string'
        });
    } else {
        const allowedUpdates = ['id', 'name', 'text', 'color', 'type', 'rarity', 'price', 'cost']
        const actualUpdates = Object.keys(req.body);
        const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            res.status(400).send({
                error: 'Update is not permitted',
            });
        } else {
            Card.findOneAndUpdate({id: req.query.id as number}, req.body, {
                new: true,
                runValidators: true,
            }).then((card) => {
                if(!card) {
                    res.status(404).send();
                } else {
                    res.send({
                        message: "Card updated in the collection!",
                        card: card,
                    });
                }
            }).catch((err) => {
                res.status(400).send(err);
            })
        }

    }
});

app.delete('/cards', (req, res) => {
    if(!req.query.id) {
        res.status(400).send({
            error: 'An ID must be providded'
        });
    } else {
        Card.findOneAndDelete({id: req.query.id as number})
        .then((card) => {
            if(!card) {
                res.status(404).send();
            } else {
                res.send({
                    message: "Card deleted from the collection!",
                    card: card,
                })
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        })
    }
});

app.listen(port, () => {
    console.log(`Waiting for clients to connect on port ${port}...`);
})