import { User } from 'models/user';
import owners from '../data/owners.json';
import { Card } from 'models/card';
import dogs from '../data/characters.json'


const usersData: User[] = owners;

const usersService = {
    getAllUsers: async (): Promise<User[]> => {
        return usersData;
    },

    getUserById: async (id: number): Promise<User | undefined> => {
        return usersData.find(user => user.id === id);
    }
};

export default usersService;
