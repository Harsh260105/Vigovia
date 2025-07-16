import { TripOverview, DayItinerary, Flight, Hotel } from "@/types/itinerary";

export const demoTripOverview: TripOverview = {
  destination: "Singapore",
  departureCity: "Kolkata",
  departureDate: "2025-06-09",
  returnDate: "2025-06-11",
  travelers: 2,
  nights: 2,
  customerName: "Rahul Sharma",
};

export const demoDailyItinerary: DayItinerary[] = [
  {
    day: 1,
    date: "2025-06-09",
    activities: [
      {
        id: "1",
        name: "Marina Bay Sands Exploration",
        description:
          "Check-in and explore the iconic Marina Bay Sands, visit the observation deck for stunning city views",
        time: "14:00",
        location: "Marina Bay Sands, Singapore",
        price: 5000,
        activityId: "ACT001",
      },
      {
        id: "2",
        name: "Gardens by the Bay Night Show",
        description:
          "Experience the magical Garden Rhapsody light and sound show at Supertree Grove",
        time: "19:30",
        location: "Gardens by the Bay",
        price: 3500,
        activityId: "ACT002",
      },
    ],
    transfers: [
      {
        id: "t1",
        type: "Airport Transfer",
        time: "12:00",
        price: 2500,
        peopleAllowed: 2,
        fromLocation: "Changi Airport",
        toLocation: "Marina Bay Sands",
      },
    ],
  },
  {
    day: 2,
    date: "2025-06-10",
    activities: [
      {
        id: "3",
        name: "Universal Studios Singapore",
        description:
          "Full day at Universal Studios Singapore with express pass, including lunch",
        time: "09:00",
        location: "Sentosa Island",
        price: 8500,
        activityId: "ACT003",
      },
      {
        id: "4",
        name: "Singapore Cable Car & Wings of Time",
        description:
          "Evening cable car ride followed by Wings of Time show at Sentosa",
        time: "18:00",
        location: "Mount Faber and Sentosa Island",
        price: 4000,
        activityId: "ACT004",
      },
    ],
    transfers: [
      {
        id: "t2",
        type: "Hotel Transfer",
        time: "08:30",
        price: 1500,
        peopleAllowed: 2,
        fromLocation: "Marina Bay Sands",
        toLocation: "Universal Studios Singapore",
      },
    ],
  },
  {
    day: 3,
    date: "2025-06-11",
    activities: [
      {
        id: "5",
        name: "Singapore Zoo Morning Tour",
        description:
          "Visit Singapore Zoo including the famous Jungle Breakfast with Wildlife experience",
        time: "08:00",
        location: "Singapore Zoo",
        price: 6500,
        activityId: "ACT005",
      },
      {
        id: "6",
        name: "Chinatown & Little India Cultural Tour",
        description:
          "Explore Singapore's vibrant cultural districts, includes traditional lunch",
        time: "14:00",
        location: "Chinatown and Little India",
        price: 3500,
        activityId: "ACT006",
      },
      {
        id: "7",
        name: "Departure Transfer",
        description: "Transfer to Changi Airport for departure",
        time: "17:00",
        location: "Changi Airport",
        price: 2500,
        activityId: "ACT007",
      }
    ],
    transfers: [
      {
        id: "t3",
        type: "Airport Transfer",
        time: "19:00",
        price: 2500,
        peopleAllowed: 2,
        fromLocation: "City Center",
        toLocation: "Changi Airport",
      },
    ],
  },
];

export const demoFlights: Flight[] = [
  {
    id: "f1",
    from: "Kolkata (CCU)",
    to: "Singapore (SIN)",
    date: "2025-06-09",
    time: "08:30",
    price: 35000,
    airline: "Singapore Airlines",
    flightNumber: "SQ 516",
  },
  {
    id: "f2",
    from: "Singapore (SIN)",
    to: "Kolkata (CCU)",
    date: "2025-06-11",
    time: "22:45",
    price: 35000,
    airline: "Singapore Airlines",
    flightNumber: "SQ 517",
  },
];

export const demoHotels: Hotel[] = [
  {
    id: "h1",
    name: "Marina Bay Sands",
    checkIn: "2025-06-09",
    checkOut: "2025-06-11",
    nights: 2,
    roomType: "Deluxe Room with City View",
    price: 45000,
  },
];
