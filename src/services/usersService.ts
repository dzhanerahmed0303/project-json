import { Db } from 'mongodb';
import { User } from '../models/user';

let db: Db;


export function setDb(database: Db) {
  db = database;
}

const usersService = {
  
  getAllUsers: async (): Promise<User[]> => {
    return await db.collection<User>('owners').find().toArray();
  },

  
  getUserById: async (id: number): Promise<User | null> => {
    return await db.collection<User>('owners').findOne({ id });
  },

  
  updateUser: async (id: number, update: Partial<User>): Promise<void> => {
    await db.collection<User>('owners').updateOne({ id }, { $set: update });
  }
};

export default usersService;
