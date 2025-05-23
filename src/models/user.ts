export interface User {
  id: number;
  name: string;
  isExperienced: boolean;
  contact: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  bio: string;
  imageUrl:string;
}
export default User;