import React, { useState, useRef } from "react";
import { adminRegisterUser, adminRegisterStall, adminCreateAward, adminRegisterVip, adminRegisterExhibitor } from "../api/userApi";
import { toast } from "sonner";

function AdminUserCreation({ onClose, onSuccess, activeTab }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
  });

  const [vipData, setVipData] = useState({
    name: "",
    phone: "",
    place: "",
  });

  const [exhibitorData, setExhibitorData] = useState({
    name: "",
    phone: "",
    place: "",
  });

  const [stallData, setStallData] = useState({
    name: "",
    companyName: "",
    position: "",
    phone: "",
    place: "",
  });

  const [awardData, setAwardData] = useState({
    name: "",
    companyName: "",
    position: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [errorsVip, setErrorsVip] = useState({});
  const [errorsExhibitor, setErrorsExhibitor] = useState({});
  const [errorsStall, setErrorsStall] = useState({});
  const [errorsAward, setErrorsAward] = useState({});
  const [activeForm, setActiveForm] = useState(activeTab || "event");

  const formRef = useRef(null);

  // Validation functions
  const validateEventForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!formData.place.trim()) newErrors.place = "Place is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStallForm = () => {
    let newErrors = {};
    if (!stallData.name.trim()) newErrors.name = "Full Name is required";
    if (!stallData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!stallData.position.trim()) newErrors.position = "Position is required";
    if (!stallData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(stallData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!stallData.place.trim()) newErrors.place = "Place is required";
    setErrorsStall(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVipForm = () => {
    let newErrors = {};
    if (!vipData.name.trim()) newErrors.name = "Full Name is required";
    if (!vipData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(vipData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!vipData.place.trim()) newErrors.place = "Place is required";
    setErrorsVip(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExhibitorForm = () => {
    let newErrors = {};
    if (!exhibitorData.name.trim()) newErrors.name = "Full Name is required";
    if (!exhibitorData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(exhibitorData.phone)) newErrors.phone = "Enter 10 digit number";
    if (!exhibitorData.place.trim()) newErrors.place = "Place is required";
    setErrorsExhibitor(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAwardForm = () => {
    let newErrors = {};
    if (!awardData.name.trim()) newErrors.name = "Full Name is required";
    if (!awardData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!awardData.position.trim()) newErrors.position = "Position is required";
    if (!awardData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(awardData.phone)) newErrors.phone = "Enter 10 digit number";
    setErrorsAward(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!validateEventForm()) return;

    try {
      const response = await adminRegisterUser(formData);
      toast.success("Event ticket created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create event ticket");
    }
  };

  const handleExhibitorSubmit = async (e) => {
    e.preventDefault();
    if (!validateExhibitorForm()) return;

    try {
      await adminRegisterExhibitor(exhibitorData);
      toast.success("Exhibitor pass created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create exhibitor pass");
    }
  };

  const handleVipSubmit = async (e) => {
    e.preventDefault();
    if (!validateVipForm()) return;

    try {
      await adminRegisterVip(vipData);
      toast.success("Guest pass created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create guest pass");
    }
  };

  const handleStallSubmit = async (e) => {
    e.preventDefault();
    if (!validateStallForm()) return;

    try {
      const response = await adminRegisterStall(stallData);
      toast.success("Stall booking created successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create stall booking");
    }
  };

  const handleAwardSubmit = async (e) => {
    e.preventDefault();
    if (!validateAwardForm()) return;

    try {
      const response = await adminCreateAward(awardData);
      toast.success("Award nomination submitted successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit award nomination");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add User Manually</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form Type Selector */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveForm("event")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "event"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Event Ticket
            </button>
            <button
              onClick={() => setActiveForm("stall")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "stall"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Stall Booking
            </button>
            <button
              onClick={() => setActiveForm("award")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "award"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Award Nomination
            </button>

            <button
              onClick={() => setActiveForm("vip")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "vip"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Guest Pass
            </button>

            <button
              onClick={() => setActiveForm("exhibitor")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeForm === "exhibitor"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Exhibitor Pass
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="px-6 py-6">
          {/* Event Form */}
          {activeForm === "event" && (
            <form ref={formRef} onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter place"
                />
                {errors.place && <p className="text-red-500 text-xs mt-1">{errors.place}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Event Ticket
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Stall Form */}
          {activeForm === "stall" && (
            <form onSubmit={handleStallSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={stallData.name}
                  onChange={(e) => setStallData({ ...stallData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errorsStall.name && <p className="text-red-500 text-xs mt-1">{errorsStall.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={stallData.companyName}
                  onChange={(e) => setStallData({ ...stallData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
                {errorsStall.companyName && <p className="text-red-500 text-xs mt-1">{errorsStall.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  value={stallData.position}
                  onChange={(e) => setStallData({ ...stallData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter position"
                />
                {errorsStall.position && <p className="text-red-500 text-xs mt-1">{errorsStall.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={stallData.phone}
                  onChange={(e) => setStallData({ ...stallData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errorsStall.phone && <p className="text-red-500 text-xs mt-1">{errorsStall.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  type="text"
                  value={stallData.place}
                  onChange={(e) => setStallData({ ...stallData, place: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter place"
                />
                {errorsStall.place && <p className="text-red-500 text-xs mt-1">{errorsStall.place}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Stall Booking
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Award Form */}
          {activeForm === "award" && (
            <form onSubmit={handleAwardSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={awardData.name}
                  onChange={(e) => setAwardData({ ...awardData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errorsAward.name && <p className="text-red-500 text-xs mt-1">{errorsAward.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={awardData.companyName}
                  onChange={(e) => setAwardData({ ...awardData, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
                {errorsAward.companyName && <p className="text-red-500 text-xs mt-1">{errorsAward.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  value={awardData.position}
                  onChange={(e) => setAwardData({ ...awardData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter position"
                />
                {errorsAward.position && <p className="text-red-500 text-xs mt-1">{errorsAward.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={awardData.phone}
                  onChange={(e) => setAwardData({ ...awardData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errorsAward.phone && <p className="text-red-500 text-xs mt-1">{errorsAward.phone}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Award Nomination
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* VIP Form */}
          {activeForm === "vip" && (
            <form ref={formRef} onSubmit={handleVipSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={vipData.name}
                  onChange={(e) => setVipData({ ...vipData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errorsVip.name && <p className="text-red-500 text-xs mt-1">{errorsVip.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={vipData.phone}
                  onChange={(e) => setVipData({ ...vipData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errorsVip.phone && <p className="text-red-500 text-xs mt-1">{errorsVip.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  type="text"
                  value={vipData.place}
                  onChange={(e) => setVipData({ ...vipData, place: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter place"
                />
                {errorsVip.place && <p className="text-red-500 text-xs mt-1">{errorsVip.place}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Guest Pass
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Exhibitor Form */}
          {activeForm === "exhibitor" && (
            <form ref={formRef} onSubmit={handleExhibitorSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={exhibitorData.name}
                  onChange={(e) => setExhibitorData({ ...exhibitorData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
                {errorsExhibitor.name && (
                  <p className="text-red-500 text-xs mt-1">{errorsExhibitor.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={exhibitorData.phone}
                  onChange={(e) => setExhibitorData({ ...exhibitorData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 10 digit phone number"
                />
                {errorsExhibitor.phone && (
                  <p className="text-red-500 text-xs mt-1">{errorsExhibitor.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place *
                </label>
                <input
                  type="text"
                  value={exhibitorData.place}
                  onChange={(e) => setExhibitorData({ ...exhibitorData, place: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter place"
                />
                {errorsExhibitor.place && (
                  <p className="text-red-500 text-xs mt-1">{errorsExhibitor.place}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Exhibitor Pass
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUserCreation;
