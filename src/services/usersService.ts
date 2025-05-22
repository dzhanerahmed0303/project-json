import { Owner } from 'models/user';
import owners from '../data/owners.json';


const usersData: Owner[] = owners;

const usersService = {
    getAllUsers: async (): Promise<Owner[]> => {
        return usersData;
    },

    getUserById: async (id: number): Promise<Owner | undefined> => {
        return usersData.find(user => user.id === id);
    }
};

export default usersService;
