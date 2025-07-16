import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

export interface ItineraryData {
  tripOverview: TripOverview;
  dailyItinerary: DayItinerary[];
  flights: Flight[];
  hotels: Hotel[];
}

export const generateItineraryPDF = async (
  data: ItineraryData,
): Promise<void> => {
  try {
    // Get the PDF content element
    const element = document.getElementById("pdf-content");

    if (!element) {
      throw new Error("PDF content element not found");
    }

    // Create canvas from HTML element with optimized settings
    const canvas = await html2canvas(element, {
      scale: 1.5, // Balanced scale for quality vs file size
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      height: element.scrollHeight,
      width: element.scrollWidth,
      logging: false,
      removeContainer: true,
      imageTimeout: 0,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95); // Use JPEG with 95% quality for smaller file size

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate the ratio to fit content to PDF page
    const ratio = Math.min(
      pdfWidth / (canvasWidth * 0.264583),
      pdfHeight / (canvasHeight * 0.264583),
    );

    const imgWidth = canvasWidth * 0.264583 * ratio;
    const imgHeight = canvasHeight * 0.264583 * ratio;

    // Calculate position to center the content
    const x = (pdfWidth - imgWidth) / 2;
    const y = 0;

    // Add image to PDF
    pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

    // If content is taller than one page, split it
    if (imgHeight > pdfHeight) {
      const totalPages = Math.ceil(imgHeight / pdfHeight);

      for (let i = 1; i < totalPages; i++) {
        pdf.addPage();
        const yOffset = -(pdfHeight * i);
        pdf.addImage(imgData, "JPEG", x, yOffset, imgWidth, imgHeight);
      }
    }

    // Generate filename
    const destination = data.tripOverview.destination || "Destination";
    const customerName = data.tripOverview.customerName || "Customer";
    const filename = `${destination}_Itinerary_${customerName.replace(/\s+/g, "_")}.pdf`;

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
};

export const previewItinerary = async (data: ItineraryData): Promise<void> => {
  try {
    // Get the PDF content element
    const element = document.getElementById("pdf-content");

    if (!element) {
      throw new Error("PDF content element not found");
    }

    // Create a blob URL for the preview
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      height: element.scrollHeight,
      width: element.scrollWidth,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    // Create PDF for preview
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const ratio = Math.min(
      pdfWidth / (canvasWidth * 0.264583),
      pdfHeight / (canvasHeight * 0.264583),
    );

    const imgWidth = canvasWidth * 0.264583 * ratio;
    const imgHeight = canvasHeight * 0.264583 * ratio;
    const x = (pdfWidth - imgWidth) / 2;
    const y = 0;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    if (imgHeight > pdfHeight) {
      const totalPages = Math.ceil(imgHeight / pdfHeight);
      for (let i = 1; i < totalPages; i++) {
        pdf.addPage();
        const yOffset = -(pdfHeight * i);
        pdf.addImage(imgData, "PNG", x, yOffset, imgWidth, imgHeight);
      }
    }

    // Open PDF in new window for preview
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    const previewWindow = window.open(url, "_blank");

    if (!previewWindow) {
      alert("Please allow popups to preview the itinerary");
      return;
    }

    // Clean up the blob URL after a delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  } catch (error) {
    console.error("Error generating preview:", error);
    throw new Error("Failed to generate preview. Please try again.");
  }
};
