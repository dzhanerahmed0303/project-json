import { Card  } from '../models/card';
import { Owner  } from '../models/user';
import owners from '../data/owners.json';

import cards from '../data/characters.json';



export const getFilteredAndSortedCards = (
  search?: string,
  sortField?: keyof Card,
  sortOrder?: 'asc' | 'desc'
): Card[] => {
  let result = [...cards as Card[]];
  
  // Filter
  if (search) {
    result = result.filter(card => 
      card.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sortField && sortOrder) {
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }

  return result;
};

export const getCardById = (id: number): Card | undefined => {
  return (cards as Card[]).find(card => card.id === id);
};

export const getOwnerById = (id: number): Owner | undefined => {
  return (owners as Owner[]).find(owner => owner.id === id);
};

export const getCardsByOwner = (ownerId: number): Card[] => {
  return (cards as Card[]).filter(card => card.ownerId === ownerId);
};