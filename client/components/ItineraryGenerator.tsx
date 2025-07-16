import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Minus,
  Plane,
  MapPin,
  Calendar,
  Users,
  Eye,
  Download,
} from "lucide-react";
import ItineraryPDFTemplate from "./ItineraryPDFTemplate";
import Footer from "./Footer";
import { generateItineraryPDF, previewItinerary } from "../utils/pdfGenerator";
import {
  demoTripOverview,
  demoDailyItinerary,
  demoFlights,
  demoHotels,
} from "../utils/demoData";
import type {
  TripOverview,
  DayItinerary,
  Flight,
  Hotel,
  Activity,
  Transfer,
} from "../types/itinerary";

export default function ItineraryGenerator() {
  const [tripOverview, setTripOverview] = useState<TripOverview>({
    destination: "",
    departureCity: "",
    departureDate: "",
    returnDate: "",
    travelers: 1,
    nights: 0,
    customerName: "",
  });

  const [dailyItinerary, setDailyItinerary] = useState<DayItinerary[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const addDay = () => {
    const newDay: DayItinerary = {
      day: dailyItinerary.length + 1,
      date: "",
      activities: [],
      transfers: [],
    };
    setDailyItinerary([...dailyItinerary, newDay]);
  };

  const addActivity = (dayIndex: number) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      time: "",
      location: "",
      price: 0,
      activityId: "",
    };

    const updatedDays = [...dailyItinerary];
    updatedDays[dayIndex].activities.push(newActivity);
    setDailyItinerary(updatedDays);
  };

  const addTransfer = (dayIndex: number) => {
    const newTransfer: Transfer = {
      id: Math.random().toString(36).substr(2, 9),
      type: "",
      time: "",
      price: 0,
      peopleAllowed: tripOverview.travelers,
      fromLocation: "",
      toLocation: "",
    };

    const updatedDays = [...dailyItinerary];
    updatedDays[dayIndex].transfers.push(newTransfer);
    setDailyItinerary(updatedDays);
  };

  const addFlight = () => {
    const newFlight: Flight = {
      id: Math.random().toString(36).substr(2, 9),
      from: "",
      to: "",
      date: "",
      time: "",
      price: 0,
      airline: "",
      flightNumber: "",
    };
    setFlights([...flights, newFlight]);
  };

  const addHotel = () => {
    const newHotel: Hotel = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      checkIn: "",
      checkOut: "",
      nights: 1,
      roomType: "",
      price: 0,
    };
    setHotels([...hotels, newHotel]);
  };

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateItineraryPDF({
        tripOverview,
        dailyItinerary,
        flights,
        hotels,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePreview = async () => {
    try {
      await previewItinerary({
        tripOverview,
        dailyItinerary,
        flights,
        hotels,
      });
    } catch (error) {
      console.error("Error generating preview:", error);
      alert("Error generating preview. Please try again.");
    }
  };

  const loadDemoData = () => {
    setTripOverview(demoTripOverview);
    setDailyItinerary(demoDailyItinerary);
    setFlights(demoFlights);
    setHotels(demoHotels);
    alert("Demo data loaded! You can now preview or generate the PDF.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-light to-white">
      {/* Header with Logo */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 shadow-lg border-b border-white/20 supports-[backdrop-filter]:bg-white/5">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img src="../vigovia-logo.svg" alt="Vigovia" className="w-32" />
              <div className="h-8 w-px bg-black"></div>
              <h1 className="text-2xl font-bold text-purple-900 font-poppins tracking-wide">
                Itinerary Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadDemoData}
                variant="outline"
                size="sm"
                className="my-2 bg-travel-primary/70 border-white/20 text-white hover:text-gray-100 hover:bg-travel-primary/90 hover:border-white/30 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Load Demo Data</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step
                    ? "bg-travel-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            {currentStep === 1 && "Trip Overview"}
            {currentStep === 2 && "Daily Activities"}
            {currentStep === 3 && "Flights & Hotels"}
            {currentStep === 4 && "Review & Generate"}
          </div>
        </div>

        {/* Step 1: Trip Overview */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-travel-primary" />
                <span>Trip Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={tripOverview.customerName}
                    onChange={(e) =>
                      setTripOverview({
                        ...tripOverview,
                        customerName: e.target.value,
                      })
                    }
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={tripOverview.destination}
                    onChange={(e) =>
                      setTripOverview({
                        ...tripOverview,
                        destination: e.target.value,
                      })
                    }
                    placeholder="e.g., Singapore"
                  />
                </div>
                <div>
                  <Label htmlFor="departureCity">Departure City</Label>
                  <Input
                    id="departureCity"
                    value={tripOverview.departureCity}
                    onChange={(e) =>
                      setTripOverview({
                        ...tripOverview,
                        departureCity: e.target.value,
                      })
                    }
                    placeholder="e.g., Kolkata"
                  />
                </div>
                <div>
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    value={tripOverview.travelers}
                    onChange={(e) =>
                      setTripOverview({
                        ...tripOverview,
                        travelers: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={tripOverview.departureDate}
                    onChange={(e) =>
                      setTripOverview({
                        ...tripOverview,
                        departureDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={tripOverview.returnDate}
                    onChange={(e) =>
                      setTripOverview({
                        ...tripOverview,
                        returnDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-travel-primary hover:bg-travel-secondary"
                disabled={
                  !tripOverview.destination || !tripOverview.departureDate
                }
              >
                Next: Plan Daily Activities
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Daily Activities */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-travel-primary" />
                    <span>Daily Itinerary</span>
                  </div>
                  <Button
                    onClick={addDay}
                    size="sm"
                    className="bg-travel-accent hover:bg-travel-primary"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Day
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>

            {dailyItinerary.map((day, dayIndex) => (
              <Card key={dayIndex}>
                <CardHeader>
                  <CardTitle>Day {day.day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`date-${dayIndex}`}>Date</Label>
                    <Input
                      id={`date-${dayIndex}`}
                      type="date"
                      value={day.date}
                      onChange={(e) => {
                        const updatedDays = [...dailyItinerary];
                        updatedDays[dayIndex].date = e.target.value;
                        setDailyItinerary(updatedDays);
                      }}
                    />
                  </div>

                  {/* Activities */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Activities</h4>
                      <Button
                        onClick={() => addActivity(dayIndex)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Activity
                      </Button>
                    </div>
                    {day.activities.map((activity, activityIndex) => (
                      <div
                        key={activity.id}
                        className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded mb-2"
                      >
                        <Input
                          placeholder="Activity name"
                          value={activity.name}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].activities[
                              activityIndex
                            ].name = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="Time"
                          value={activity.time}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].activities[
                              activityIndex
                            ].time = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="Location"
                          value={activity.location}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].activities[
                              activityIndex
                            ].location = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="Price"
                          type="number"
                          value={activity.price}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].activities[
                              activityIndex
                            ].price = parseFloat(e.target.value) || 0;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Textarea
                          placeholder="Activity description"
                          value={activity.description}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].activities[
                              activityIndex
                            ].description = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                          className="md:col-span-2"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Transfers */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Transfers</h4>
                      <Button
                        onClick={() => addTransfer(dayIndex)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Transfer
                      </Button>
                    </div>
                    {day.transfers.map((transfer, transferIndex) => (
                      <div
                        key={transfer.id}
                        className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border rounded mb-2"
                      >
                        <Input
                          placeholder="Transfer type"
                          value={transfer.type}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].transfers[
                              transferIndex
                            ].type = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="Time"
                          value={transfer.time}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].transfers[
                              transferIndex
                            ].time = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="Price"
                          type="number"
                          value={transfer.price}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].transfers[
                              transferIndex
                            ].price = parseFloat(e.target.value) || 0;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="From location"
                          value={transfer.fromLocation}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].transfers[
                              transferIndex
                            ].fromLocation = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="To location"
                          value={transfer.toLocation}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].transfers[
                              transferIndex
                            ].toLocation = e.target.value;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                        <Input
                          placeholder="People allowed"
                          type="number"
                          value={transfer.peopleAllowed}
                          onChange={(e) => {
                            const updatedDays = [...dailyItinerary];
                            updatedDays[dayIndex].transfers[
                              transferIndex
                            ].peopleAllowed = parseInt(e.target.value) || 1;
                            setDailyItinerary(updatedDays);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex space-x-4">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="flex-1 bg-travel-primary hover:bg-travel-secondary"
                disabled={dailyItinerary.length === 0}
              >
                Next: Flights & Hotels
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Flights & Hotels */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Flights Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-5 h-5 text-travel-primary" />
                    <span>Flight Details</span>
                  </div>
                  <Button
                    onClick={addFlight}
                    size="sm"
                    className="bg-travel-accent hover:bg-travel-primary"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Flight
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {flights.map((flight, index) => (
                  <div
                    key={flight.id}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border rounded mb-2"
                  >
                    <Input
                      placeholder="From"
                      value={flight.from}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].from = e.target.value;
                        setFlights(updatedFlights);
                      }}
                    />
                    <Input
                      placeholder="To"
                      value={flight.to}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].to = e.target.value;
                        setFlights(updatedFlights);
                      }}
                    />
                    <Input
                      placeholder="Airline"
                      value={flight.airline}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].airline = e.target.value;
                        setFlights(updatedFlights);
                      }}
                    />
                    <Input
                      placeholder="Flight Number"
                      value={flight.flightNumber}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].flightNumber = e.target.value;
                        setFlights(updatedFlights);
                      }}
                    />
                    <Input
                      type="date"
                      value={flight.date}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].date = e.target.value;
                        setFlights(updatedFlights);
                      }}
                    />
                    <Input
                      type="time"
                      value={flight.time}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].time = e.target.value;
                        setFlights(updatedFlights);
                      }}
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={flight.price}
                      onChange={(e) => {
                        const updatedFlights = [...flights];
                        updatedFlights[index].price =
                          parseFloat(e.target.value) || 0;
                        setFlights(updatedFlights);
                      }}
                      className="md:col-span-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Hotels Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-travel-primary" />
                    <span>Hotel Bookings</span>
                  </div>
                  <Button
                    onClick={addHotel}
                    size="sm"
                    className="bg-travel-accent hover:bg-travel-primary"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Hotel
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hotels.map((hotel, index) => (
                  <div
                    key={hotel.id}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border rounded mb-2"
                  >
                    <Input
                      placeholder="Hotel Name"
                      value={hotel.name}
                      onChange={(e) => {
                        const updatedHotels = [...hotels];
                        updatedHotels[index].name = e.target.value;
                        setHotels(updatedHotels);
                      }}
                    />
                    <Input
                      placeholder="Room Type"
                      value={hotel.roomType}
                      onChange={(e) => {
                        const updatedHotels = [...hotels];
                        updatedHotels[index].roomType = e.target.value;
                        setHotels(updatedHotels);
                      }}
                    />
                    <Input
                      placeholder="Number of Nights"
                      type="number"
                      value={hotel.nights}
                      onChange={(e) => {
                        const updatedHotels = [...hotels];
                        updatedHotels[index].nights =
                          parseInt(e.target.value) || 1;
                        setHotels(updatedHotels);
                      }}
                    />
                    <Input
                      placeholder="Check-in Date"
                      type="date"
                      value={hotel.checkIn}
                      onChange={(e) => {
                        const updatedHotels = [...hotels];
                        updatedHotels[index].checkIn = e.target.value;
                        setHotels(updatedHotels);
                      }}
                    />
                    <Input
                      placeholder="Check-out Date"
                      type="date"
                      value={hotel.checkOut}
                      onChange={(e) => {
                        const updatedHotels = [...hotels];
                        updatedHotels[index].checkOut = e.target.value;
                        setHotels(updatedHotels);
                      }}
                    />
                    <Input
                      placeholder="Price per night"
                      type="number"
                      value={hotel.price}
                      onChange={(e) => {
                        const updatedHotels = [...hotels];
                        updatedHotels[index].price =
                          parseFloat(e.target.value) || 0;
                        setHotels(updatedHotels);
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                className="flex-1 bg-travel-primary hover:bg-travel-secondary"
              >
                Review & Generate
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Generate */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-bold text-travel-primary">
                    Trip Overview
                  </h3>
                  <p>
                    {tripOverview.customerName} - {tripOverview.destination}
                  </p>
                  <p>
                    {tripOverview.departureDate} to {tripOverview.returnDate}
                  </p>
                  <p>{tripOverview.travelers} travelers</p>
                </div>

                <div>
                  <h3 className="font-bold text-travel-primary">
                    Daily Activities
                  </h3>
                  <p>{dailyItinerary.length} days planned</p>
                </div>

                <div>
                  <h3 className="font-bold text-travel-primary">Flights</h3>
                  <p>{flights.length} flights added</p>
                </div>

                <div>
                  <h3 className="font-bold text-travel-primary">Hotels</h3>
                  <p>{hotels.length} hotels added</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setCurrentStep(3)}
                  variant="outline"
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handlePreview}
                  variant="outline"
                  className="flex-1"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview Itinerary
                </Button>
                <Button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="flex-1 bg-travel-primary hover:bg-travel-secondary text-white font-bold py-3"
                >
                  {isGeneratingPDF ? (
                    <>
                      <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Hidden PDF Template for Generation */}
      <div className="fixed -top-[9999px] -left-[9999px] pointer-events-none">
        <ItineraryPDFTemplate
          tripOverview={tripOverview}
          dailyItinerary={dailyItinerary}
          flights={flights}
          hotels={hotels}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
