import { Document, connect, model, Schema } from 'mongoose';

connect('mongodb://127.0.0.1:27017/magic-app').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface CardDocumentInterface extends Document {
    id: number,
    name: string,
    text: string,
    color: 'blue' | 'green' | 'red' | 'black',
    type: 'land' | 'spell' | 'instant' | 'artifact',
    rarity: 'common' | 'uncommon' | 'rare' | 'mythic',
    price: number,
    cost: number
}

const CardSchema = new Schema<CardDocumentInterface>({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        enum: ['blue', 'green', 'red', 'black'],
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['land', 'spell', 'instant', 'artifact'],
        trim: true,
    },
    rarity: {
        type: String,
        required: true,
        enum: ['common', 'uncommon', 'rare', 'mythic'],
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        validate: (value: number) => {
            if(value < 0) {
                throw new Error('Price must be a positive number.')
            }
        },
    },
    cost: {
        type: Number,
        required: true,
        validate: (value: number) => {
            if(value < 0) {
                throw new Error('Cost must be a positive number.')
            }
        },
    },
});

export const Card = model<CardDocumentInterface>('Card', CardSchema);
