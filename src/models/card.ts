export interface Card {
  id: number;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthDate: string;
  imageUrl: string;
  breedType: string;
  ownerId: number;
  gender: 'Male' | 'Female';
  vaccinated: boolean;
  hobbies?: string[];
  energyLevel?:number;
}