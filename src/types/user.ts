export type UserDTO = {
    address:Address;
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    phone: string;
    __v:number
  };

  type Address ={
    geolocation:Geolocation;
    city:string;
    street:string;
    number:number;
    zipcode:string
  }

  type Geolocation ={
    lat:number;
    long:number;
  }

  type Name ={
    firstname:string
    lastname:string
  }
  