import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import * as htmlToImage from "html-to-image";

export default function CardPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    getUserById(id)
      .then(res => setUser(res.data))
      .catch(console.error);
  }, [id]);

  // Generate card image (1080 × 1350)
  useEffect(() => {
    if (!user) return;

    const generateImage = async () => {
      // wait for images to load
      await new Promise(r => setTimeout(r, 600));

      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        width: 1080,
        height: 1350,
        pixelRatio: 1, 
        cacheBust: true,
        useCORS: true,
      });

      setCardImage(dataUrl);
    };

    generateImage();
  }, [user]);

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // Download PNG
  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = cardImage;
    a.download = `${user.name}-card.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center">

      {/* DOWNLOAD BUTTON */}
      {cardImage && (
        <button
          onClick={downloadImage}
          className="absolute top-5 right-5 z-10 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Download Image
        </button>
      )}

      {/* PREVIEW IMAGE */}
      {cardImage ? (
        <img
          src={cardImage}
          alt="Card"
          className="w-[270px] sm:w-[540px] shadow-xl"
        />
      ) : (
        <div
          ref={cardRef}
          style={{
            width: "1080px",
            height: "1350px",
            position: "relative",
            background: "white",
          }}
        >
          {/* FRAME */}
          <img
            src={`${import.meta.env.VITE_BASE_URL}/frame/frame.jpg`}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full"
          />

          {/* NAME + LOCATION */}
          <div
            className="absolute text-right bg-[#713F98] px-7 py-4 text-white rounded-l-xl shadow"
            style={{
              top: "750px",
              left: "50%",
              transform: "translateX(-100%)",
            }}
          >
            <h1 className="text-4xl font-semibold">{user.name}</h1>
            {user.place && (
              <p className="text-3xl mt-2">{user.place}</p>
            )}
          </div>

          {/* USER PHOTO */}
          {user.photo && (
            <img
              src={user.photo}
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                top: "650px",
                left: "50%",
                height: "400px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          )}

          {/* QR CODE */}
          {user.qr && (
            <img
              src={user.qr}
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                bottom: "50px",
                left: "50px",
                width: "150px",
                background: "white",
                borderRadius: "10px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}