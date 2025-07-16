import React from "react";
import { Plane, Hotel, Car, CreditCard, Users } from "lucide-react";

interface TripOverview {
  destination: string;
  departureCity: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
  nights: number;
  customerName: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  location: string;
  price: number;
  activityId: string;
}

interface Transfer {
  id: string;
  type: string;
  time: string;
  price: number;
  peopleAllowed: number;
  fromLocation: string;
  toLocation: string;
}

interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
  transfers: Transfer[];
}

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  airline: string;
  flightNumber: string;
}

interface Hotel {
  id: string;
  name: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  price: number;
}

interface ItineraryPDFTemplateProps {
  tripOverview: TripOverview;
  dailyItinerary: DayItinerary[];
  flights: Flight[];
  hotels: Hotel[];
}

export default function ItineraryPDFTemplate({
  tripOverview,
  dailyItinerary,
  flights,
  hotels,
}: ItineraryPDFTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateVerbose = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });
  };

  const calculateTotalDays = () => {
    if (!tripOverview.departureDate || !tripOverview.returnDate) return 0;
    const start = new Date(tripOverview.departureDate);
    const end = new Date(tripOverview.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalDays = calculateTotalDays();
  const totalNights = totalDays > 0 ? totalDays - 1 : 0;

  const destinationImages = [
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80", // Marina Bay Sands
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", // Gardens by the Bay
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80", // Singapore Flyer
    "https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800&q=80", // Singapore Zoo
    "https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800&q=80", // Sentosa
    "https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?w=800&q=80", // Singapore Night Safari
    "https://images.unsplash.com/photo-1464885828046-f2579980cf81?w=800&q=80", // Universal Studios
  ];

  const groupActivitiesByTimeOfDay = (activities: Activity[]) => {
    const timeGroups = {
      morning: [] as Activity[],
      afternoon: [] as Activity[],
      evening: [] as Activity[],
    };

    activities.forEach((activity) => {
      const hour = parseInt(activity.time.split(":")[0]);
      if (hour >= 5 && hour < 12) {
        timeGroups.morning.push(activity);
      } else if (hour >= 12 && hour < 17) {
        timeGroups.afternoon.push(activity);
      } else {
        timeGroups.evening.push(activity);
      }
    });

    return timeGroups;
  };

  return (
    <div
      id="pdf-content"
      className="bg-white font-roboto text-black print:shadow-none"
      style={{
        width: "320mm" /* A4 width */,
        margin: "0 auto",
        padding: "0",
      }}
    >
      {/* Page 1: Cover Page */}
      <div className="page relative min-h-[297mm] flex flex-col overflow-hidden break-after-page">
        {/* Header Section with vigovia logo */}
        <img
          src="../vigovia-logo.svg"
          alt="Vigovia Logo"
          className="w-44 h-28 scale-x-150 mx-auto mb-8 mt-8"
        />

        {/* Blue to Purple Gradient Header Section */}
        <div className="bg-gradient-to-r from-travel-blue-light to-travel-accent rounded-3xl mx-4 p-8 mb-6 relative overflow-hidden">
          {/* Greeting and Trip Title */}
          <div className="text-center text-white mb-8">
            <h2 className="text-5xl font-poppins font-medium mb-4">
              Hi, {tripOverview.customerName || "Traveler"}!
            </h2>
            <h1 className="text-6xl font-bold font-poppins mb-4">
              {tripOverview.destination || "Destination"} Itinerary
            </h1>
            <p className="text-3xl font-medium font-poppins mt-8">
              {totalDays} Days {totalNights} Nights
            </p>
          </div>

          {/* Service Icons */}
          <div className="flex justify-center space-x-12 mt-12">
            <div className="flex flex-col items-center text-white">
              <Plane className="w-12 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center text-white">
              <Hotel className="w-12 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center text-white">
              <Car className="w-12 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center text-white">
              <Users className="w-12 h-12 mb-2" />
            </div>
            <div className="flex flex-col items-center text-white">
              <CreditCard className="w-12 h-12 mb-2" />
            </div>
          </div>
        </div>

        {/* Trip Overview Table */}
        <div className="mx-4 mb-6">
          <div className="bg-white border-4 border-travel-primary rounded-3xl p-8">
            <div className="grid grid-cols-5 gap-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Departure From
                </h3>
                <p className="text-xl text-black">
                  {tripOverview.departureCity}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Departure
                </h3>
                <p className="text-xl text-black">
                  {formatDate(tripOverview.departureDate)}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">Arrival</h3>
                <p className="text-xl text-black">
                  {formatDate(tripOverview.returnDate)}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Destination
                </h3>
                <p className="text-xl text-black">{tripOverview.destination}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  No. Of Travellers
                </h3>
                <p className="text-xl text-black">{tripOverview.travelers}</p>
              </div>
            </div>
          </div>
        </div>

        {dailyItinerary.length > 0 && (
          <div className="page relative min-h-[297mm] flex flex-col pt-8 ml-8 overflow-hidden break-after-page">
            <div className="space-y-8">
              {dailyItinerary.map((day, index) => (
                <div key={index} className="flex relative overflow-hidden">
                  {/* Vertical Day Label */}
                  <div className="bg-travel-dark text-white w-16 flex rounded-full items-center align-middle justify-center">
                    <div className="transform -rotate-90 whitespace-nowrap mr-6">
                      <span className="text-xl font-bold">DAY {day.day}</span>
                    </div>
                  </div>

                  {/* Day Content */}
                  <div className="flex gap-8 p-6 ml-10">
                    {/* Day Circle with Image */}
                    <div className="flex-shrink-0 w-48">
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                          <div className="w-full h-full relative">
                            <img
                              src={
                                destinationImages[
                                  index % destinationImages.length
                                ]
                              }
                              alt={`Day ${day.day}`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-bold text-black">
                            {formatDateVerbose(day.date)}
                          </h3>
                          <p className="text-lg text-black mt-1">
                            Arrival in {tripOverview.destination} & City
                            Exploration
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex-1">
                      <div className="relative space-y-6">
                        {/* Morning Activities */}
                        {groupActivitiesByTimeOfDay(day.activities).morning
                          .length > 0 && (
                          <div className="relative">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8">
                                <div className="w-6 h-6 rounded-full border-4 ml-1 border-travel-dark bg-white"></div>
                                <div
                                  className="w-0.5 bg-travel-blue mx-auto mt-2"
                                  style={{
                                    height:
                                      groupActivitiesByTimeOfDay(day.activities)
                                        .morning.length *
                                        80 +
                                      "px",
                                  }}
                                ></div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-travel-dark mb-4">
                                  Morning
                                </h4>
                                {groupActivitiesByTimeOfDay(
                                  day.activities,
                                ).morning.map((activity) => (
                                  <div key={activity.id} className="mb-4">
                                    <time className="text-base font-medium text-travel-dark">
                                      {activity.time}
                                    </time>
                                    <p className="text-base">
                                      {activity.description || activity.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Afternoon Activities */}
                        {groupActivitiesByTimeOfDay(day.activities).afternoon
                          .length > 0 && (
                          <div className="relative">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8">
                                <div className="w-6 h-6 rounded-full border-4 ml-1 border-travel-dark bg-white"></div>
                                <div
                                  className="w-0.5 bg-travel-blue mx-auto mt-2"
                                  style={{
                                    height:
                                      groupActivitiesByTimeOfDay(day.activities)
                                        .afternoon.length *
                                        80 +
                                      "px",
                                  }}
                                ></div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-travel-dark mb-4">
                                  Afternoon
                                </h4>
                                {groupActivitiesByTimeOfDay(
                                  day.activities,
                                ).afternoon.map((activity) => (
                                  <div key={activity.id} className="mb-4">
                                    <time className="text-base font-medium text-travel-dark">
                                      {activity.time}
                                    </time>
                                    <p className="text-base">
                                      {activity.description || activity.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Evening Activities */}
                        {groupActivitiesByTimeOfDay(day.activities).evening
                          .length > 0 && (
                          <div className="relative">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8">
                                <div className="w-6 h-6 rounded-full border-4 ml-1 border-travel-dark bg-white"></div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-travel-dark mb-4">
                                  Evening
                                </h4>
                                {groupActivitiesByTimeOfDay(
                                  day.activities,
                                ).evening.map((activity) => (
                                  <div key={activity.id} className="mb-4">
                                    <time className="text-base font-medium text-travel-dark">
                                      {activity.time}
                                    </time>
                                    <p className="text-base">
                                      {activity.description || activity.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Footer */}
        <div className="mt-20 border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p className="font-bold">Vigovia Tech Pvt. Ltd</p>
              <p>Registered Office: Hd-109 Cinnabar Hills,</p>
              <p>Links Business Park, Karnataka, India.</p>
            </div>
            <div className="text-sm text-gray-600 text-left">
              <p>
                <b>Phone:</b> +91-99X9999999
              </p>
              <p>
                <b>Email ID:</b> Contact@Vigovia.Com
              </p>
            </div>
            <div>
              <img
                src="../vigovia-logo.svg"
                alt="Vigovia Logo"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Page 2: Flight and Hotel Details */}
      <div className="page relative min-h-[297mm] flex flex-col pt-8">
        {/* Flight Summary Section */}
        {flights.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
              Flight <span className="text-travel-secondary">Summary</span>
            </h2>
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <div key={flight.id} className="flex items-center mb-6">
                  {/* Connected Date and Details Box */}
                  <div className="flex items-stretch w-full h-24">
                    {/* Date Capsule */}
                    <div className="bg-travel-light border-4 border-travel-primary text-black font-bold text-xl min-w-[180px] text-center rounded-l-2xl border-r-0 flex items-center justify-center">
                      {formatDate(flight.date)}
                    </div>
                    {/* Flight Details - Connected */}
                    <div className="flex-1 bg-white border-4 border-travel-primary rounded-r-2xl border-l-0 flex items-center px-8">
                      <p className="text-2xl text-black">
                        <span className="font-bold">
                          {flight.airline} {flight.flightNumber}
                        </span>{" "}
                        From {flight.from} To {flight.to} at {flight.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg text-black mt-6">
              Note: All Flights Include Meals, Seat Choice (Excluding XL), And
              20kg/25Kg Checked Baggage.
            </p>
          </div>
        )}

        {/* Hotel Bookings Section */}
        {hotels.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
              Hotel <span className="text-travel-secondary">Bookings</span>
            </h2>

            {/* Table */}
            <div className="w-full">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-0 mb-0">
                <div className="bg-travel-dark text-white text-center py-6 rounded-tl-3xl">
                  <h3 className="text-2xl font-medium">City</h3>
                </div>
                <div className="bg-travel-dark text-white text-center py-6">
                  <h3 className="text-2xl font-medium">Check In</h3>
                </div>
                <div className="bg-travel-dark text-white text-center py-6">
                  <h3 className="text-2xl font-medium">Check Out</h3>
                </div>
                <div className="bg-travel-dark text-white text-center py-6">
                  <h3 className="text-2xl font-medium">Nights</h3>
                </div>
                <div className="bg-travel-dark text-white text-center py-6 rounded-tr-3xl">
                  <h3 className="text-2xl font-medium">Hotel Name</h3>
                </div>
              </div>

              {/* Table Rows */}
              <div className="bg-travel-light rounded-b-3xl">
                {hotels.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    className="grid grid-cols-5 gap-0 border-b border-travel-primary last:border-b-0"
                  >
                    <div className="text-center py-6 px-4 flex items-center justify-center">
                      <p className="text-xl text-black">
                        {tripOverview.destination}
                      </p>
                    </div>
                    <div className="text-center py-6 px-4 flex items-center justify-center">
                      <p className="text-xl text-black">
                        {formatDate(hotel.checkIn)}
                      </p>
                    </div>
                    <div className="text-center py-6 px-4 flex items-center justify-center">
                      <p className="text-xl text-black">
                        {formatDate(hotel.checkOut)}
                      </p>
                    </div>
                    <div className="text-center py-6 px-4 flex items-center justify-center">
                      <p className="text-xl text-black">{hotel.nights}</p>
                    </div>
                    <div className="text-center py-6 px-4 flex items-center justify-center">
                      <p className="text-xl text-black leading-tight">
                        {hotel.name}
                        {hotel.roomType && (
                          <>
                            <br />
                            <span className="text-lg">{hotel.roomType}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Notes */}
            <div className="mt-6 space-y-2 text-lg text-black">
              <p>
                1. All Hotels Are Tentative And Can Be Replaced With Similar.
              </p>
              <p>2. Breakfast Included For All Hotel Stays.</p>
              <p>3. All Hotels Will Be 4* And Above Category</p>
              <p>
                4. A maximum occupancy of 2 people/room is allowed in most
                hotels.
              </p>
            </div>
          </div>
        )}

        {/* Page Footer */}
        <div className="mt-auto border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p className="font-bold">Vigovia Tech Pvt. Ltd</p>
              <p>Registered Office: Hd-109 Cinnabar Hills,</p>
              <p>Links Business Park, Karnataka, India.</p>
            </div>
            <div className="text-sm text-gray-600 text-left">
              <p>
                <b>Phone:</b> +91-99X9999999
              </p>
              <p>
                <b>Email ID:</b> Contact@Vigovia.Com
              </p>
            </div>
            <div>
              <img
                src="../vigovia-logo.svg"
                alt="Vigovia Logo"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Page 4: Important Notes and Services */}
      <div className="page relative min-h-[297mm] flex flex-col pt-8">
        {/* Important Notes Section */}
        <div className="mx-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
            Important <span className="text-travel-secondary">Notes</span>
          </h2>

          <div className="w-full">
            {/* Header */}
            <div className="grid grid-cols-2 mb-0">
              <div className="bg-travel-dark text-white text-center py-6 rounded-tl-3xl">
                <h3 className="text-3xl font-medium">Point</h3>
              </div>
              <div className="bg-travel-dark text-white text-center py-6 rounded-tr-3xl">
                <h3 className="text-3xl font-medium">Details</h3>
              </div>
            </div>

            {/* Content */}
            <div className="bg-travel-light rounded-b-3xl">
              {/* Airlines Standard Policy */}
              <div className="grid grid-cols-2 gap-8 border-b border-travel-primary">
                <div className="text-center py-6 px-4">
                  <p className="text-2xl text-black">
                    Airlines Standard Policy
                  </p>
                </div>
                <div className="text-center py-6 px-4">
                  <p className="text-xl text-black leading-relaxed">
                    Airlines may change flight timings, combine flights or
                    change aircraft type. All such changes will be informed in
                    advance.
                  </p>
                </div>
              </div>

              {/* Flight/Hotel Cancellation */}
              <div className="grid grid-cols-2 gap-8 border-b border-travel-primary">
                <div className="text-center py-6 px-4">
                  <p className="text-2xl text-black">
                    Flight/Hotel Cancellation
                  </p>
                </div>
                <div className="text-center py-6 px-4">
                  <p className="text-xl text-black leading-relaxed">
                    Cancellation charges as per airline/hotel policy will be
                    applicable. No refund on non-refundable components.
                  </p>
                </div>
              </div>

              {/* Trip Insurance */}
              <div className="grid grid-cols-2 gap-8 border-b border-travel-primary">
                <div className="text-center py-6 px-4">
                  <p className="text-2xl text-black">Trip Insurance</p>
                </div>
                <div className="text-center py-6 px-4">
                  <p className="text-xl text-black leading-relaxed">
                    Travel insurance is recommended for all travelers. Coverage
                    includes trip cancellation, medical emergencies, and baggage
                    loss.
                  </p>
                </div>
              </div>

              {/* Hotel Check-In & Check Out */}
              <div className="grid grid-cols-2 gap-8 border-b border-travel-primary">
                <div className="text-center py-6 px-4">
                  <p className="text-2xl text-black">
                    Hotel Check-In & Check Out
                  </p>
                </div>
                <div className="text-center py-6 px-4">
                  <p className="text-xl text-black leading-relaxed">
                    Standard check-in time is 3 PM and check-out time is 11 AM.
                    Early check-in/late check-out subject to availability.
                  </p>
                </div>
              </div>

              {/* Visa Rejection */}
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center py-6 px-4">
                  <p className="text-2xl text-black">Visa Rejection</p>
                </div>
                <div className="text-center py-6 px-4">
                  <p className="text-xl text-black leading-relaxed">
                    In case of visa rejection, visa fees or any other
                    non-cancellable component cannot be reimbursed at any cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scope Of Service Section */}
        <div className="mx-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
            Scope Of <span className="text-travel-secondary">Service</span>
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {/* Service Column */}
            <div className="space-y-0">
              <div className="bg-travel-dark text-white text-center py-6 rounded-t-3xl">
                <h3 className="text-3xl font-medium">Service</h3>
              </div>
              <div className="bg-travel-light space-y-6 py-6 px-4 rounded-b-3xl">
                <div className="text-center py-4">
                  <p className="text-2xl text-black">
                    Flight Tickets And Hotel Vouchers
                  </p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">Web Check-In</p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">Support</p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">Cancellation Support</p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">Trip Support</p>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="space-y-0">
              <div className="bg-travel-dark text-white text-center py-6 rounded-t-3xl">
                <h3 className="text-3xl font-medium">Details</h3>
              </div>
              <div className="bg-travel-light space-y-6 py-6 px-4 rounded-b-3xl">
                <div className="text-center py-4">
                  <p className="text-2xl text-black">
                    Delivered 3 Days Post Full Payment
                  </p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">
                    Boarding Pass Delivery Via Email/WhatsApp
                  </p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">
                    Chat Support – Response Time: 4 Hours
                  </p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">Provided</p>
                </div>
                <div className="text-center py-4">
                  <p className="text-2xl text-black">
                    Response Time: 5 Minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inclusion Summary Section */}
        <div className="mx-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
            Inclusion <span className="text-travel-secondary">Summary</span>
          </h2>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 mb-4">
            <div className="bg-travel-dark text-white text-center py-4 rounded-tl-3xl">
              <h3 className="text-2xl font-medium">Category</h3>
            </div>
            <div className="bg-travel-dark text-white text-center py-4">
              <h3 className="text-2xl font-medium">Count</h3>
            </div>
            <div className="bg-travel-dark text-white text-center py-4">
              <h3 className="text-2xl font-medium">Details</h3>
            </div>
            <div className="bg-travel-dark text-white text-center py-4 rounded-tr-3xl">
              <h3 className="text-2xl font-medium">Status / Comments</h3>
            </div>
          </div>

          {/* Table Rows */}
          <div className="bg-travel-light rounded-b-3xl">
            {/* Flight row */}
            <div className="grid grid-cols-4 gap-0 py-6 px-4 border-b border-travel-primary">
              <div className="text-center">
                <p className="text-2xl text-black">Flight</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-black">{flights.length}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-black">
                  {flights
                    .map((f) => `${f.airline} ${f.flightNumber}`)
                    .join(", ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-black">Confirmed</p>
              </div>
            </div>

            {/* Hotel row */}
            <div className="grid grid-cols-4 gap-0 py-6 px-4">
              <div className="text-center">
                <p className="text-2xl text-black">Hotel</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-black">{hotels.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xl text-black leading-tight">
                  {hotels.map((h) => h.name).join(", ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-black">Included</p>
              </div>
            </div>
          </div>

          {/* Transfer Policy */}
          <div className="mt-8">
            <h3 className="text-2xl font-medium text-black mb-4">
              Transfer Policy(Refundable Upon Claim)
            </h3>
            <p className="text-xl text-black leading-relaxed">
              If any transfer is delayed beyond 15 minutes, customers may book
              an app-based or radio taxi and claim a refund for that specific
              leg.
            </p>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="mx-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-6 font-roboto">
            Terms and <span className="text-travel-secondary">Conditions</span>
          </h2>

          <div className="mb-8">
            <a
              href="#"
              className="text-3xl font-medium text-blue-500 underline font-roboto"
            >
              View all terms and conditions
            </a>
          </div>
        </div>

        {/* Page Footer */}
        <div className="mt-auto border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p className="font-bold">Vigovia Tech Pvt. Ltd</p>
              <p>Registered Office: Hd-109 Cinnabar Hills,</p>
              <p>Links Business Park, Karnataka, India.</p>
            </div>
            <div className="text-sm text-gray-600 text-left">
              <p>
                <b>Phone:</b> +91-99X9999999
              </p>
              <p>
                <b>Email ID:</b> Contact@Vigovia.Com
              </p>
            </div>
            <div>
              <img
                src="../vigovia-logo.svg"
                alt="Vigovia Logo"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Page 5: Activity Table */}
      <div className="page relative min-h-[297mm] flex flex-col pt-8">
        {/* Activity Table Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
            Activity <span className="text-travel-secondary">Table</span>
          </h2>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 mb-0">
            <div className="bg-travel-dark text-white text-center py-4 px-6 rounded-tl-3xl">
              <h3 className="text-2xl font-medium">City</h3>
            </div>
            <div className="bg-travel-dark text-white text-center py-4 px-6">
              <h3 className="text-2xl font-medium">Activity</h3>
            </div>
            <div className="bg-travel-dark text-white text-center py-4 px-6">
              <h3 className="text-2xl font-medium">Type</h3>
            </div>
            <div className="bg-travel-dark text-white text-center py-4 px-6 rounded-tr-3xl">
              <h3 className="text-2xl font-medium">Time Required</h3>
            </div>
          </div>

          {/* Table Rows */}
          <div className="bg-travel-light rounded-b-3xl">
            {dailyItinerary.map((day) =>
              day.activities.map((activity, activityIndex) => (
                <div
                  key={`${day.day}-${activityIndex}`}
                  className="grid grid-cols-4 gap-0 border-b border-travel-primary last:border-b-0"
                >
                  <div className="text-center py-6 px-4">
                    <p className="text-xl text-black">
                      {activity.location || tripOverview.destination}
                    </p>
                  </div>
                  <div className="text-center py-6 px-4">
                    <p className="text-xl text-black">{activity.name}</p>
                  </div>
                  <div className="text-center py-6 px-4">
                    <p className="text-xl text-black">Arrival Standard</p>
                  </div>
                  <div className="text-center py-6 px-4">
                    <p className="text-xl text-black">2-3 Hours</p>
                  </div>
                </div>
              )),
            )}
          </div>
        </div>

        {/* Page Footer */}
        <div className="mt-auto border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p className="font-bold">Vigovia Tech Pvt. Ltd</p>
              <p>Registered Office: Hd-109 Cinnabar Hills,</p>
              <p>Links Business Park, Karnataka, India.</p>
            </div>
            <div className="text-sm text-gray-600 text-left">
              <p>
                <b>Phone:</b> +91-99X9999999
              </p>
              <p>
                <b>Email ID:</b> Contact@Vigovia.Com
              </p>
            </div>
            <div>
              <img
                src="../vigovia-logo.svg"
                alt="Vigovia Logo"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Page 6: Payment and Terms */}
      <div className="page relative min-h-[297mm] flex flex-col pt-8 pb-8">
        {/* Payment Plan Section */}
        <div className="mx-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
            Payment <span className="text-travel-secondary">Plan</span>
          </h2>

          {/* Total Amount Box */}
          <div className="bg-white border-4 border-travel-primary rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">Total Amount</h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">₹</span>
                <span className="text-2xl">
                  {(
                    flights.reduce((sum, f) => sum + f.price, 0) +
                    hotels.reduce((sum, h) => sum + h.price, 0)
                  ).toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-gray-600">
                  (Per Person Inclusive Of GST)
                </span>
              </div>
            </div>
          </div>

          {/* TCS Box */}
          <div className="bg-white border-4 border-travel-primary rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black">TCS</h3>
              <p className="text-2xl">Not Collected</p>
            </div>
          </div>

          {/* Installments */}
          <div className="bg-white border-4 border-travel-primary rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 bg-travel-dark text-white">
              <div className="text-center py-6">
                <h3 className="text-2xl font-medium">Installment</h3>
              </div>
              <div className="text-center py-6 border-x border-gray-600">
                <h3 className="text-2xl font-medium">Amount</h3>
              </div>
              <div className="text-center py-6">
                <h3 className="text-2xl font-medium">Due Date</h3>
              </div>
            </div>
            {(() => {
              const totalAmount =
                flights.reduce((sum, f) => sum + f.price, 0) +
                hotels.reduce((sum, h) => sum + h.price, 0);
              const installments = [
                { amount: totalAmount * 0.4, dueDate: "Initial Payment" },
                { amount: totalAmount * 0.4, dueDate: "Post Visa Approval" },
                {
                  amount: totalAmount * 0.2,
                  dueDate: "20 Days Before Departure",
                },
              ];

              return installments.map((inst, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 border-t border-travel-primary"
                >
                  <div className="text-center py-6">
                    <p className="text-xl">Installment {index + 1}</p>
                  </div>
                  <div className="text-center py-6 border-x border-travel-primary">
                    <p className="text-xl">
                      ₹{Math.round(inst.amount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-center py-6">
                    <p className="text-xl">{inst.dueDate}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Visa Details Section */}
        <div className="mx-8 mb-12">
          <h2 className="text-4xl font-bold text-black mb-8 font-roboto">
            Visa <span className="text-travel-secondary">Details</span>
          </h2>

          <div className="bg-white border-4 border-travel-primary rounded-3xl p-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Visa Type :
                </h3>
                <p className="text-2xl text-black">Tourist</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Validity:
                </h3>
                <p className="text-2xl text-black">30 Days</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Processing Date :
                </h3>
                <p className="text-2xl text-black">14/06/2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-20 mx-8 mb-20 text-center">
          <div className="mb-8">
            <h2 className="text-6xl font-medium text-travel-dark mb-8 font-red-hat tracking-wider">
              PLAN.PACK.GO!
            </h2>
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-travel-primary text-white text-3xl font-bold pb-7 px-16 rounded-full hover:bg-travel-secondary transition-colors cursor-pointer">
              <a href="#">Book Now</a>
            </button>
          </div>
        </div>

        {/* Page Footer */}
        <div className="mt-auto border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p className="font-bold">Vigovia Tech Pvt. Ltd</p>
              <p>Registered Office: Hd-109 Cinnabar Hills,</p>
              <p>Links Business Park, Karnataka, India.</p>
            </div>
            <div className="text-sm text-gray-600 text-left">
              <p>
                <b>Phone:</b> +91-99X9999999
              </p>
              <p>
                <b>Email ID:</b> Contact@Vigovia.Com
              </p>
            </div>
            <div>
              <img
                src="../vigovia-logo.svg"
                alt="Vigovia Logo"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
