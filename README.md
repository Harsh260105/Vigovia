# Vigovia - Travel Itinerary Generator

<div align="center">
  <img src="public/vigovia-logo-1.png" alt="Vigovia Logo" width="200"/>
  <p><em>Create beautiful, professional travel itineraries in minutes</em></p>
</div>

## 🌟 Features

- **Smart Itinerary Generation**: Create detailed day-by-day travel plans
- **PDF Export**: Generate beautiful, print-ready PDF itineraries
- **Dynamic Timeline**: Visual representation of daily activities
- **Comprehensive Travel Details**: 
  - Flight bookings
  - Hotel reservations
  - Activities and excursions
  - Transfer arrangements
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Real-time Preview**: See your itinerary changes instantly

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harsh260105/vigovia.git
cd vigovia
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **PDF Generation**: react-pdf
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Icons**: Lucide Icons
- **Backend**: Node.js with Express (for PDF generation)

## 📁 Project Structure

```
vigovia/
├── client/               # Frontend code
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── server/              # Backend code
│   └── routes/          # API routes
├── public/              # Static assets
└── shared/              # Shared code between client and server
```

## 🎨 Features in Detail

### 1. Trip Overview
- Customer details
- Destination information
- Travel dates
- Number of travelers

### 2. Daily Itinerary
- Day-by-day activity planning
- Time-based activity organization
- Transfer arrangements
- Location details and descriptions

### 3. Travel Arrangements
- Flight details with timings
- Hotel bookings with check-in/out dates
- Room types and preferences

### 4. PDF Generation
- Professional layout
- Brand-consistent design
- Print-optimized format
- Includes all trip details
