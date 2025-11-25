import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import heic2any from "heic2any";
import { ThreeDots } from "react-loader-spinner";

function ImageCropper({ photo, onCancel, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageURL, setImageURL] = useState(null);
  const [processedFile, setProcessedFile] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert HEIC / HEIF if needed
  useEffect(() => {
    const convertImage = async () => {
      if (!photo) return;

      try {
        let finalFile = photo;
        setIsLoading(true);

        if (photo.type === "image/heic" || photo.type === "image/heif") {
          const blob = await heic2any({
            blob: photo,
            toType: "image/jpeg",
            quality: 0.9,
          });

          finalFile = new File(
            [blob],
            photo.name.replace(/\.[^/.]+$/, ".jpg"),
            { type: "image/jpeg" }
          );
        }

        setProcessedFile(finalFile);
        const url = URL.createObjectURL(finalFile);
        setImageURL(url);

        setTimeout(() => setIsLoading(false), 300); // small UI delay for smooth transition
      } catch (err) {
        console.error("HEIC Conversion Error:", err);
        alert("Unable to process HEIC image");
        setIsLoading(false);
      }
    };

    convertImage();
  }, [photo]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImg = async () => {
    if (!processedFile || !imageURL) return;

    const img = new Image();
    img.src = imageURL;
    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      const originalName = processedFile.name || "image.jpg";
      const croppedFile = new File([blob], originalName, { type: "image/jpeg" });
      onCropDone(croppedFile);
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#ffffff"
          ariaLabel="loading"
          visible={true}
        />
      ) : (
        <div className="bg-white p-4 rounded-lg w-80 sm:w-96 animate-fadeIn">
          <div className="relative w-full h-64 bg-gray-200">
            <Cropper
              image={imageURL}
              crop={crop}
              zoom={zoom}
              aspect={5 / 6}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded-lg"
              onClick={getCroppedImg}
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageCropper;