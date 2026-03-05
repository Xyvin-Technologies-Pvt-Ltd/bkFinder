
import React from "react";

import brand1 from "../logos/logo_01.png";
import brand2 from "../logos/logo_02.png";
import brand3 from "../logos/logo_03.png";
import brand4 from "../logos/logo_04.png";
import brand5 from "../logos/logo_05.png";
import brand6 from "../logos/logo_06.png";
import brand7 from "../logos/logo_07.png";
import brand8 from "../logos/logo_08.png";
import brand9 from "../logos/logo_09.png";
import brand10 from "../logos/logo_10.png";
import brand11 from "../logos/logo_11.png";
import brand12 from "../logos/logo_12.png";
import skybertechLogo from "../logos/skybertech_logo.png";
import digitalMarketingPartnerLogo from "../logos/brand2.avif";
import keralaVisionDigitalTV from "../assets/partners/Kerala Vision Digital TV 2 (2).png";
import keralaVisionLogo from "../assets/partners/Kerala Vision Logo.png";
import keeLogo from "../assets/partners/KEE -01.png";
import justPaidLogo from "../assets/partners/just paid.png";
import home4Logo from "../assets/partners/Home4.png";
import racLogo from "../assets/partners/rac.png";
import tenXPropLogo from "../assets/partners/10X Prop Horizontal.png";
import alkoreLogo from "../assets/partners/Alkore.png";
import skybertechTransparentLogo from "../assets/partners/Skybertech transparent Logo (1).png";
import voxbayLogo from "../assets/partners/voxbay.png";
import millionairesKeralaLogo from "../assets/partners/MILLIONAIRES_KERALA.png";
import startupLogo from "../assets/partners/startup.png";
import rabbitAdsLogo from "../assets/partners/rabbit ads.png";
import epicLogo from "../assets/partners/epic.png";
import tantraLogo from "../assets/partners/TANTRA_LOGO_PNGArtboard 1@3x.png";
import ceoSmartLogo from "../assets/partners/ceo smart.png";
import chaiFliqLogo from "../assets/partners/chai fliq.PNG";
import kaizenLogo from "../assets/partners/Kaizen Logo-04.png";
import inspireLogo from "../assets/partners/Inspire.png";
import edmenLogo from "../assets/partners/edmen.png";
import pickadspaceLogo from "../assets/partners/pickadspace.png";
import skyfordLogo from "../assets/partners/skyford.png";
import guinnessRasheedLogo from "../assets/partners/guinness rasheed mission million.png";
import enteBusinessLogo from "../assets/partners/ENTE BUSINESS .png";
import eventhexLogo from "../assets/partners/Eventhex.png";
import businessMalayaliLogo from "../assets/partners/Business Malayali logo copy 7.png";
import sinaiSparkLogo from "../assets/partners/sinai spark.png";
import detailingAcademyLogo from "../assets/partners/Detailing academy.in.png";

function BrandPartners() {
  const titleSponsors = [
    { name: "Title Sponsor", img: keralaVisionDigitalTV },
    { name: "Title Sponsor", img: keralaVisionLogo },
    { name: "Title Sponsor", img: keeLogo },
  ];

  const coSponsors = [
    { name: "Co-Sponsor", img: justPaidLogo },
    { name: "Co-Sponsor", img: home4Logo },
    { name: "Co-Sponsor", img: racLogo },
    { name: "Co-Sponsor", img: tenXPropLogo },
    { name: "Co-Sponsor", img: sinaiSparkLogo },
  ];

  const associates = [
    { name: "Associated Organisation & Brand Partner", img: millionairesKeralaLogo },
    { name: "Associated Organisation & Brand Partner", img: startupLogo },
    { name: "Associated Organisation & Brand Partner", img: rabbitAdsLogo },
    { name: "Associated Organisation & Brand Partner", img: epicLogo },
    { name: "Associated Organisation & Brand Partner", img: tantraLogo },
    { name: "Associated Organisation & Brand Partner", img: ceoSmartLogo },
    { name: "Associated Organisation & Brand Partner", img: chaiFliqLogo },
    { name: "Associated Organisation & Brand Partner", img: kaizenLogo },
    { name: "Associated Organisation & Brand Partner", img: inspireLogo },
    { name: "Associated Organisation & Brand Partner", img: edmenLogo },
    { name: "Associated Organisation & Brand Partner", img: pickadspaceLogo },
    { name: "Associated Organisation & Brand Partner", img: skyfordLogo },
    { name: "Associated Organisation & Brand Partner", img: guinnessRasheedLogo },
    { name: "Associated Organisation & Brand Partner", img: enteBusinessLogo },
    { name: "Associated Organisation & Brand Partner", img: eventhexLogo },
    { name: "Associated Organisation & Brand Partner", img: businessMalayaliLogo },
    { name: "Associated Organisation & Brand Partner", img: detailingAcademyLogo },
  ];

  const LogosGrid = ({ items, isTitleSponsor = false, isCoSponsor = false, isAssociate = false }) => (
    <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mx-auto">
      <div className={`flex flex-wrap items-center justify-center ${isCoSponsor ? 'gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:gap-y-10' : 'gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-6 md:gap-y-8'}`}>
        {items.map((logo, index) => (
          <div
            key={index}
            className={`flex items-center justify-center ${
              isTitleSponsor 
                ? 'h-20 w-32 sm:h-28 sm:w-48 md:h-36 md:w-64 lg:h-40 lg:w-72'
                : isCoSponsor
                ? 'h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 lg:h-24 lg:w-48'
                : isAssociate
                ? 'h-10 w-20 sm:h-14 sm:w-24 md:h-16 md:w-28 lg:h-20 lg:w-32'
                : 'h-12 w-24 sm:h-16 sm:w-28 md:h-20 md:w-32 lg:h-24 lg:w-36'
            }`}
          >
            <img
              src={logo.img}
              alt={logo.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );

const PartnerTile = ({ title, img, alt }) => (
    <div className="flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-6">
      <div className="inline-flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full bg-slate-900 text-white font-extrabold uppercase tracking-widest text-[8px] sm:text-[9px] md:text-[10px] shadow-md whitespace-nowrap">
        {title}
      </div>
      <div className="flex items-center justify-center h-14 w-28 sm:h-18 sm:w-32 md:h-22 md:w-36 lg:h-26 lg:w-40">
        <img src={img} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );

  const Section = ({ title, items, theme = "amber", isTitleSponsor = false, isCoSponsor = false, isAssociate = false }) => {
    const gradient = "from-slate-900 to-slate-800";

    return (
      <div className="w-full">
        <div className={`flex justify-center ${
          isCoSponsor ? 'mb-4 sm:mb-5 md:mb-6' : 
          isAssociate ? 'mb-2 sm:mb-3 md:mb-4' :
          'mb-6 sm:mb-8 md:mb-10'
        }`}>
          <div
            className={`inline-flex items-center justify-center ${
              isCoSponsor ? 'px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-3' : 
              isAssociate ? 'px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2' :
              'px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4'
            } rounded-full text-white font-black uppercase tracking-widest ${
              isCoSponsor ? 'text-xs sm:text-sm md:text-base' : 
              isAssociate ? 'text-[7px] sm:text-[8px] md:text-[9px]' :
              'text-sm sm:text-base md:text-lg lg:text-xl'
            } shadow-lg bg-gradient-to-r ${gradient}`}
          >
            {title}
          </div>
        </div>
        <LogosGrid items={items} isTitleSponsor={isTitleSponsor} isCoSponsor={isCoSponsor} isAssociate={isAssociate} />
      </div>
    );
  };

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col items-center text-center gap-8 sm:gap-12 md:gap-16">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-gray-900 mb-3 sm:mb-4">
              Featured Brands
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the leading brands and partners joining our event
            </p>
          </div>
          <Section title="Title Sponsor" items={titleSponsors} theme="amber" isTitleSponsor={true} />
          <Section title="Co-Sponsors" items={coSponsors} theme="blue" isCoSponsor={true} />

          <div className="w-full">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 place-items-center">
                <PartnerTile
                  title="Digital Marketing Partner"
                  img={alkoreLogo}
                  alt="Digital Marketing Partner"
                />
                <PartnerTile
                  title="Technology Partner"
                  img={skybertechTransparentLogo}
                  alt="Technology Partner"
                />
                <div className="col-span-2 sm:col-span-2 md:col-span-1 flex justify-center">
                  <PartnerTile
                    title="Communication Partner"
                    img={voxbayLogo}
                    alt="Communication Partner"
                  />
                </div>
              </div>
            </div>
          </div>

          <Section
            title="Associated Organisation & Brand Partners"
            items={associates}
            theme="emerald"
            isAssociate={true}
          />
        </div>
      </div>
    </section>
  );
}

export default BrandPartners;
