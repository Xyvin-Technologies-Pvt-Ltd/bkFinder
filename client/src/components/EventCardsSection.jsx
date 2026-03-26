import React, { useState } from 'react';
import { Check, Star, CreditCard, Phone, Globe, ChevronDown, ChevronUp, Copy, Percent } from 'lucide-react';
import qrCodeImg from '../assets/IMG_2055.PNG';

const EventCardsSection = ({ onBookNow }) => {
  // Reusable Component for individual cards
  const EventCard = ({ card }) => {
    const {
      title,
      subtitle,
      price,
      originalPrice,
      validity,
      highlights,
      themeColor,
      actionType
    } = card;

    // Gradient definitions for borders and accents
    const themes = {
      maroon: {
        gradient: 'from-pink-600 to-rose-600',
        bgSoft: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-100'
      },
      purple: {
        gradient: 'from-violet-600 to-purple-600',
        bgSoft: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-100'
      },
      blue: {
        gradient: 'from-blue-500 to-indigo-600',
        bgSoft: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-100'
      },
      red: {
        gradient: 'from-red-500 to-orange-600',
        bgSoft: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-100'
      },
      burgundy: {
        gradient: 'from-red-800 to-pink-700',
        bgSoft: 'bg-red-50',
        text: 'text-red-900',
        border: 'border-red-100'
      },
      gold: {
        gradient: 'from-amber-400 to-orange-500',
        bgSoft: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-100'
      }
    };

    const theme = themes[themeColor] || themes.maroon;

    return (
      <div
        onClick={() => actionType && onBookNow && onBookNow(actionType)}
        className={`group relative h-full flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden ${actionType ? 'cursor-pointer' : ''}`}
      >
        {/* Top Gradient Line */}
        <div className={`h-2 w-full bg-gradient-to-r ${theme.gradient}`}></div>

        {/* Header content */}
        <div className="p-6 text-center relative">
          <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b ${theme.gradient} opacity-5`}></div>

          <h3 className={`relative text-xl font-black uppercase tracking-wider text-slate-800 mb-2`}>
            {title}
          </h3>
          {subtitle && (
            <span className={`relative inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${theme.bgSoft} ${theme.text}`}>
              {subtitle}
            </span>
          )}
        </div>

        {/* Pricing */}
        {price && (
        <div className="px-6 pb-6 text-center border-b border-slate-100">
          {originalPrice && (
            <div className="text-slate-400 line-through text-lg font-medium relative inline-block mb-1">
              {originalPrice}
              <div className="absolute -left-1 -right-1 top-1/2 h-px bg-slate-400"></div>
            </div>
          )}
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className={`text-4xl font-extrabold ${theme.text} tracking-tight leading-none`}>₹{price}</span>
            {price !== "Free" && (
              <span className="text-slate-500 text-xs font-bold tracking-wide">+ GST</span>
            )}
          </div>
          {validity && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              <Star className={`w-3 h-3 ${theme.text} fill-current`} />
              {validity}
            </div>
          )}
        </div>
        )}

        {/* Highlights */}
        <div className="p-6 flex-grow bg-slate-50/50">
          <ul className="space-y-4">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`mt-0.5 p-1 rounded-full bg-white shadow-sm border ${theme.border} shrink-0`}>
                  <Check className={`w-3 h-3 ${theme.text}`} />
                </div>
                <span className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Section */}
        {price && (
        <div className="mt-auto bg-white border-t border-slate-100 p-5 relative overflow-hidden">
          {/* Subtle decorative background circle */}
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${theme.bgSoft} opacity-50`}></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-1.5 rounded-lg bg-slate-100`}>
                <CreditCard className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bank Details</span>
            </div>

            <div className="grid grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5 text-xs text-slate-500 font-medium">
                <p>
                  <span className="block text-slate-900 font-bold text-[10px] uppercase">Business Kerala</span>
                  <span>Ac: 266105000379</span>
                </p>
                <p>
                  <span className="block text-slate-900 font-bold text-[10px] uppercase">ICICI Bank, Shoranur</span>
                  <span>IFSC: ICIC0002661</span>
                </p>
                <p>
                  <span className="block text-slate-900 font-bold text-[10px] uppercase">GSTIN</span>
                  <span className="tracking-wide">32ADLPE5989Q1ZQ</span>
                </p>
              </div>

              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-lg p-1 shadow-sm mb-2">
                  <img
                    src={qrCodeImg}
                    alt="Scan to Pay"
                    className="w-full h-full object-contain"
                  />
                </div>
                {actionType ? (
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-emerald-600 px-3 py-1.5 rounded-full shadow-md animate-pulse">
                    Click to Book
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-full">
                    Scan & Pay
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  };

  const eventPackages = [
    {
      title: "Visitor Pass",
      subtitle: "With Food",
      themeColor: "maroon",
      price: "1499",
      originalPrice: "",
      validity: "",
      actionType: "event",
      highlights: [
        "Access to all Conclave sessions",
        "Entry to networking area",
        "Business Networking opportunity",
        "Welcome Drink, Lunch, Tea snacks",
        "Business Stall Access"
      ]
    },
    {
      title: "Visitor Pass",
      subtitle: "Without Food",
      themeColor: "blue",
      price: "999",
      originalPrice: "",
      validity: "",
      actionType: "event_without_food",
      highlights: [
        "Access to all Conclave sessions",
        "Entry to networking area",
        "Business Networking opportunity",
        "Business Stall Access"
      ]
    },
    {
      title: "Business Stall",
      subtitle: "2m x 2m (50 sq. ft.)",
      themeColor: "red",
      price: "15,000",
      originalPrice: "20,000 + GST",
      validity: "",
      actionType: "stall",
      highlights: [
        "LED wall advertisement for your brand video",
        "Participation certificate",
        "1 table and 2 chairs",
        "Electricity power point",
        "1-minute video podcast recorded at the stall",
        "Logo branding in the Digital Business Community",
        "Pre-event digital promotion",
        "Sharing of participation video",
        "Logo promotion across digital platforms",
        "Entry passes and food for 2 persons"
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200" id="participation-packages">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
            Unlock Opportunities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Participation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Packages</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choose the perfect gateway to elevate your brand presence at the IT & Business Conclave 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {eventPackages.map((pkg, index) => (
            <EventCard key={index} card={pkg} />
          ))}
        </div>

        {/* Footer Contact */}
        <div className="mt-20 border-t border-slate-200 pt-10 flex flex-col items-center justify-center gap-6 text-center">
          <div>
            <h4 className="text-2xl font-bold text-slate-900 mb-1">Still have questions?</h4>
            <p className="text-slate-500 text-sm">Our support team is ready to assist you 24/7.</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:+917511188200" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCardsSection;
