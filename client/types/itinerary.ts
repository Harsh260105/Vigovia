export interface TripOverview {
  destination: string;
  departureCity: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  nights: number;
  customerName: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  location: string;
  price: number;
  activityId: string;
}

export interface Transfer {
  id: string;
  type: string;
  time: string;
  price: number;
  peopleAllowed: number;
  fromLocation: string;
  toLocation: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
  transfers: Transfer[];
}

export interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  airline: string;
  flightNumber: string;
}

export interface Hotel {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  price: number;
}
