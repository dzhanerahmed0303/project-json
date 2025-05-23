import { Db } from 'mongodb';
import { Card } from '../models/card';

let db: Db;

export function setDb(database: Db) {
  db = database;
}


export async function getAllCards(): Promise<Card[]> {
  return await db.collection<Card>('cards').find().toArray();
}


export async function getCardById(id: number): Promise<Card | null> {
  return await db.collection<Card>('cards').findOne({ id });
}


export async function getCardsByOwner(ownerId: number): Promise<Card[]> {
  return await db.collection<Card>('cards').find({ ownerId }).toArray();
}


export async function updateCard(id: number, update: Partial<Card>): Promise<void> {
  await db.collection<Card>('cards').updateOne({ id }, { $set: update });
}
