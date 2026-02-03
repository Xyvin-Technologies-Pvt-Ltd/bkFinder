import React from 'react';

// Importing guest images
import mpJosephImg from '../assets/guest/MP JOSEPH IAS.png';
import riyazKiltonImg from '../assets/guest/RIYAZ KILTON.png';
import hashirAliImg from '../assets/guest/Er. TPM. HASHIR ALI.png';
import ayshaRubyImg from '../assets/guest/DR AYSHA RUBY.png';
import arRanjithImg from '../assets/guest/A R RANJITH.png';
import guinnessRasheedImg from '../assets/guest/GUINNESS RASHEED.png';
import casacBenjaliImg from '../assets/guest/CASAC BENJALI.png';
import ashiqueAmImg from '../assets/guest/CS. ASHIQUE AM.png';
import shajahanImg from '../assets/guest/Dr Shajahan Aboobacker.png';
import subilalImg from '../assets/guest/SUBILAL K.png';
import silvanMusthafaImg from '../assets/guest/SILVAN MUSTHAFA.png';
import ibrahimSubhanImg from '../assets/guest/IBRAHIM SUBHAN.png';
import ebaduRahmanImg from '../assets/guest/ebadu rahman.png';
import anfalKvImg from '../assets/guest/anfal kv.png';
import tonySajiImg from '../assets/guest/TONY SAJI.png';
import kadalMachanImg from '../assets/guest/KADAL MACHAN.png';
import mathewJosephImg from '../assets/guest/Mathew Joseph.png';
import sandhyammaImg from '../assets/guest/sandhyamma.png';

const GuestCards = () => {
    const guests = [
        {
            name: "MP JOSEPH IAS",
            designation: "Former Indian and UN Civil Servant",
            image: mpJosephImg,
        },
        {
            name: "RIYAZ KILTON",
            designation: "Chairman of Kiltons Group, Chairman & Cofounder of IPA, Director of Hope Child Cancer Care",
            image: riyazKiltonImg,
        },
        {
            name: "Er. TPM. HASHIR ALI",
            designation: "Senate Member, Calicut University Advisory Board Member, Calicut International Airport",
            image: hashirAliImg,
        },
        {
            name: "DR AYSHA RUBY",
            designation: "CEO - Ruby Vesture Exports",
            image: ayshaRubyImg,
        },
        {
            name: "A R RANJITH",
            designation: "Business Strategist, Corporate Trainer, Entrepreneur, Author",
            image: arRanjithImg,
        },
        {
            name: "GUINNESS RASHEED",
            designation: "The Solution Master",
            image: guinnessRasheedImg,
        },
        {
            name: "CASAC BENJALI",
            designation: "Business Growth Strategist",
            image: casacBenjaliImg,
        },
        {
            name: "CS. ASHIQUE AM, BBA, FCS, BM (IIMK)",
            designation: "Founder - M/S Ashique & Associates, Company Secretary & Business Architect",
            image: ashiqueAmImg,
        },
        {
            name: "DR SHAJAHAN ABOOBACKER",
            designation: "Corporate Trainer, Business Coach, Transformation Guru",
            image: shajahanImg,
        },
        {
            name: "SUBILAL K",
            designation: "Founder and CEO Integrated Business Automation Research Centre",
            image: subilalImg,
        },
        {
            name: "SILVAN MUSTHAFA",
            designation: "Corporate Trainer, Business Coach, Transformation Guru",
            image: silvanMusthafaImg,
        },
        {
            name: "IBRAHIM SUBHAN",
            designation: "Founder and Chairman Skytalks",
            image: ibrahimSubhanImg,
        },
        {
            name: "EBADU RAHMAN",
            designation: "Business Influencer, Podcaster, Content Strategist",
            image: ebaduRahmanImg,
        },
        {
            name: "ANFAL KV",
            designation: "Entrepreneur Safari Cars",
            image: anfalKvImg,
        },
        {
            name: "TONY SAJI",
            designation: "Business Transformation Coach, Managing Director Stepx International Pvt Ltd",
            image: tonySajiImg,
        },
        {
            name: "KADAL MACHAN",
            designation: "Social Media Influencer",
            image: kadalMachanImg,
        },
        {
            name: "MATHEW JOSEPH",
            designation: "COO & Co-Founder Fresh To Home",
            image: mathewJosephImg,
        },
        {
            name: "SANDHYAMMA",
            designation: "Social Media Influencer",
            image: sandhyammaImg,
        },
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden" id="guests">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-amber-100">
                        Elite Speakers
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Distinguished <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Guests</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Meet the industry leaders and visionaries shaping the future of business and technology.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-y-16">
                    {guests.map((guest, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            {/* Image Container with Gold Ring Effect */}
                            <div className="relative mb-6">
                                {/* Layout rings based on image */}
                                <div className="absolute -inset-1 rounded-full border-[3px] border-amber-200/60 scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                                <div className="absolute -inset-3 rounded-full border border-amber-300/40 scale-90 group-hover:scale-105 transition-transform duration-700 delay-75"></div>

                                {/* Main Image Halo/Ring */}
                                <div className="relative rounded-full p-1.5 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 shadow-xl group-hover:shadow-amber-200/50 transition-all duration-300">
                                    <div className="rounded-full bg-white p-1">
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden relative">
                                            <img
                                                src={guest.image}
                                                alt={guest.name}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="max-w-[260px]">
                                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                    {guest.name}
                                </h3>
                                {guest.designation && (
                                    <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed px-1">
                                        ( {guest.designation} )
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GuestCards;
