import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const allPackages = [
    "Bali Tour Packages",
    "Japan Tour Packages",
    "Vietnam Tour Packages",
    "Malaysia Tour Packages",
    "Thailand Tour Packages",
    "Europe Tour Packages",
    "Cultural Tour Packages",
    "Luxury Tour packages",
    "Dubai Tour Packages",
    "Turkey Tour Packages",
    "UAE Tour Packages",
    "Singapore Tour Packages",
    "Australia Tour Packages",
    "South Korea Tour Packages",
    "Honeymoon Tour packages",
    "Adventure Tour packages",
  ];

  const menuSections = [
    {
      title: "Our offerings",
      items: ["Holidays", "Visa", "Forex", "Hotels", "Flights"],
    },
    {
      title: "Popular destinations",
      items: ["Dubai", "Bali", "Singapore", "Malaysia"],
    },
    {
      title: "Vigovia Specials",
      items: [
        "Featured Experience",
        "Group Tours",
        "Backpackers Club",
        "Office Events",
      ],
    },
    {
      title: "Company",
      items: [
        "About Us",
        "Careers",
        "Vigovia Blog",
        "Partner Portal",
        "Accreditations",
      ],
    },
    {
      title: "More",
      items: ["Investor Relations", "Press", "FAQs", "Domestic Holidays"],
    },
  ];

  return (
    <footer>
      {/* Main Footer Content */}
      <div className="bg-white border-t border-gray-200">
        {/* Tour Packages - Top Section */}
        <div className="max-w-7xl mx-auto px-4 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 justify-center text-[10px] sm:text-[12px]">
            {allPackages.map((pkg, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors whitespace-nowrap"
              >
                {pkg}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 relative">
          {/* Menu Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 lg:pr-64">
            {menuSections.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-gray-900 mb-3 text-xs sm:text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-1 sm:space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href="#"
                        className="text-[10px] sm:text-xs text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Logo and Payments Row */}
          <div className="border-t border-gray-200 mt-14"></div>

          {/* Logo and Payment Methods */}
          <div className="flex flex-col sm:flex-row items-center border-gray-200 pt-6 gap-4">
              <div className="flex-shrink-0 sm:pl-8">
                <img src="../vigovia-logo.svg" alt="Vigovia" className="w-24 sm:w-32" />
              </div>
              <div className="flex-1 flex justify-center mr-10">
                <div>
                  <div className="text-xs text-gray-500 mb-2.5 text-center">
                    Payments
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <img src="/Razorpay.svg" alt="Razorpay" className="h-8 sm:h-10 border border-gray-200 rounded px-2 cursor-pointer" />
                    <img
                      src="/stripe-svgrepo-com.svg"
                      alt="Stripe"
                      className="h-8 sm:h-10 border border-b-gray-200 rounded px-2 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 sm:pr-8"></div>
          </div>

          {/* Contact Information */}
          <div className="sm:absolute sm:top-6 sm:right-6 w-full sm:w-auto">
            <div className="bg-purple-700 text-white p-3 sm:p-4 rounded-lg">
              <div className="text-center mb-3">
                <div className="text-xs font-medium">Need Help? Call Us</div>
                <div className="text-sm sm:text-base font-bold">+91-98xxxx6441</div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="font-medium">Email</div>
                  <div>contact@vigovia.com</div>
                </div>

                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-xs leading-relaxed">
                    HD-120 Chirantar Hillcrest Business
                    <br />
                    Park Bangalore
                    <br />
                    North Bangalore,Karnataka,India- 560011
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Purple Background */}
      <div className="bg-[#5F2EEA] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[10px] sm:text-xs text-white text-center sm:text-left">
              © {new Date().getFullYear()} Vigovia Travel Technologies (P) Ltd. All rights reserved.
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-2 sm:space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </a>
              ))}
            </div>
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4 text-[10px] sm:text-xs text-white">
              <a href="#" className="hover:text-white/80 transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                Legal notice
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
