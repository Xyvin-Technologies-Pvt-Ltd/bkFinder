import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getStalls, getUsers, getAwards } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import AdminUserCreation from "../components/AdminUserCreation";

function ViewExcel() {
  const [data, setData] = useState([]);
  const [vipData, setVipData] = useState([]);
  const [delegateData, setDelegateData] = useState([]);
  const [exhibitorData, setExhibitorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("event");
  const [sortFilter, setSortFilter] = useState("newest");
  const [stallData, setStallData] = useState([]);
  const [awardData, setAwardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        // Filter only event bookings (visitor registrations)
        const eventBookings = (res.data || []).filter(user => 
          user.registrationType === "visitor" || !user.registrationType
        );
        setData(eventBookings);

        const vipBookings = (res.data || []).filter(user => user.registrationType === "vip");
        setVipData(vipBookings);

        const delegateBookings = (res.data || []).filter(user => user.registrationType === "delegate");
        setDelegateData(delegateBookings);

        const exhibitorBookings = (res.data || []).filter(user => user.registrationType === "exhibitor");
        setExhibitorData(exhibitorBookings);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setData([]);
        setVipData([]);
        setDelegateData([]);
        setExhibitorData([]);
      });
  }, []);

  useEffect(() => {
    getStalls()
      .then((res) => setStallData(res.data || []))
      .catch(() => setStallData([]));
  }, []);

  useEffect(() => {
    getAwards()
      .then((res) => setAwardData(res.data || []))
      .catch(() => setAwardData([]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 800);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  
  // Filter data based on search term
  const filteredData = (activeTab === "event" ? data : activeTab === "stall" ? stallData : awardData)
    .filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower) ||
        user.place?.toLowerCase().includes(searchLower) ||
        user.companyName?.toLowerCase().includes(searchLower) ||
        user.position?.toLowerCase().includes(searchLower)
      );
    })
    .filter((user) => {
      if (activeTab === "award" || sortFilter === "newest") return true;

      if (activeTab === "event" && sortFilter === "with_food") {
        return user.packageType !== "without_food";
      }

      if (activeTab === "event" && sortFilter === "without_food") {
        return user.packageType === "without_food";
      }

      return user.paymentStatus === sortFilter;
    })
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();

      if (activeTab === "award" || sortFilter === "newest") {
        return bDate - aDate;
      }
      return bDate - aDate;
    });

  const filteredVipData = (vipData || [])
    .filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower) ||
        user.place?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();
      return bDate - aDate;
    });

  const filteredDelegateData = (delegateData || [])
    .filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower) ||
        user.place?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();
      return bDate - aDate;
    });

  const filteredExhibitorData = (exhibitorData || [])
    .filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower) ||
        user.place?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aDate = new Date(a.createdAt || 0).getTime();
      const bDate = new Date(b.createdAt || 0).getTime();
      return bDate - aDate;
    });

  const activeList =
    activeTab === "vip"
      ? filteredVipData
      : activeTab === "delegate"
        ? filteredDelegateData
      : activeTab === "exhibitor"
        ? filteredExhibitorData
        : filteredData;
  const currentUsers = activeList.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.max(1, Math.ceil(activeList.length / usersPerPage));

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Refresh data after successful user creation
  const refreshData = () => {
    getUsers()
      .then((res) => {
        // Filter only event bookings (visitor registrations)
        const eventBookings = (res.data || []).filter(user => 
          user.registrationType === "visitor" || !user.registrationType
        );
        setData(eventBookings);

        const vipBookings = (res.data || []).filter(user => user.registrationType === "vip");
        setVipData(vipBookings);

        const delegateBookings = (res.data || []).filter(user => user.registrationType === "delegate");
        setDelegateData(delegateBookings);

        const exhibitorBookings = (res.data || []).filter(user => user.registrationType === "exhibitor");
        setExhibitorData(exhibitorBookings);
      })
      .catch(() => setData([]));
    
    getStalls()
      .then((res) => setStallData(res.data || []))
      .catch(() => setStallData([]));
    
    getAwards()
      .then((res) => setAwardData(res.data || []))
      .catch(() => setAwardData([]));
  };

  // Download Excel
  const handleDownload = () => {
    const dataToExport =
      activeTab === "vip"
        ? filteredVipData
        : activeTab === "delegate"
          ? filteredDelegateData
        : activeTab === "exhibitor"
          ? filteredExhibitorData
          : filteredData;

    if (!dataToExport.length) {
      toast.error("No data to export!");
      return;
    }

    const worksheetData =
      activeTab === "event"
        ? dataToExport.map((user) => ({
          Name: user.name,
          Phone: user.phone,
          Place: user.place,
          Package: user.packageType === "without_food" ? "Without Food" : "With Food",
          Payment_Status: user.paymentStatus || "-",
          Registered_At: user.createdAt
            ? new Date(user.createdAt).toLocaleString()
            : "-",
        }))
        : activeTab === "vip"
          ? dataToExport.map((user) => ({
            Name: user.name,
            Phone: user.phone,
            Place: user.place,
            Registered_At: user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "-",
          }))
        : activeTab === "delegate"
          ? dataToExport.map((user) => ({
            Name: user.name,
            Phone: user.phone,
            Place: user.place,
            Registered_At: user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "-",
          }))
        : activeTab === "exhibitor"
          ? dataToExport.map((user) => ({
            Name: user.name,
            Phone: user.phone,
            Place: user.place,
            Registered_At: user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "-",
          }))
        : activeTab === "stall"
          ? dataToExport.map((user) => ({
            Full_Name: user.name,
            Company_Name: user.companyName,
            Position: user.position,
            Phone: user.phone,
            Place: user.place,
            Payment_Status: user.paymentStatus || "-",
            Registered_At: user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "-",
          }))
          : dataToExport.map((user) => ({
            Name: user.name,
            Company_Name: user.companyName,
            Position: user.position,
            Phone: user.phone,
            Registered_At: user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "-",
          }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      activeTab === "event"
        ? "Event Bookings"
        : activeTab === "vip"
          ? "Guest Pass"
        : activeTab === "delegate"
          ? "Delegate Pass"
        : activeTab === "exhibitor"
          ? "Exhibitor Passes"
        : activeTab === "stall"
          ? "Stall Bookings"
          : "Award Nominations"
    );

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      blob,
      activeTab === "event"
        ? "event_bookings.xlsx"
        : activeTab === "vip"
          ? "guest_pass.xlsx"
        : activeTab === "delegate"
          ? "delegate_pass.xlsx"
        : activeTab === "exhibitor"
          ? "exhibitor_passes.xlsx"
        : activeTab === "stall"
          ? "stall_bookings.xlsx"
          : "award_nominations.xlsx"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
      {/* TAB SWITCHER */}
      <div className="flex justify-center mb-6 mt-2">
        <div className="flex rounded-xl overflow-hidden shadow-sm border bg-white">

          {/* EVENT TAB */}
          <button
            onClick={() => {
              setActiveTab("event");
              setSortFilter("newest");
              setCurrentPage(1);
            }}
            className={`px-6 sm:px-10 py-3 font-semibold text-sm sm:text-base transition-all
        ${activeTab === "event"
                ? "bg-blue-100 text-black "
                : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            EVENT BOOKING
          </button>

          {/* STALL TAB */}
          <button
            onClick={() => {
              setActiveTab("stall");
              setSortFilter("newest");
              setCurrentPage(1);
            }}
            className={`px-6 sm:px-10 py-3 font-semibold text-sm sm:text-base transition-all border-l
        ${activeTab === "stall"
                ? "bg-blue-100 text-black"
                : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            STALL BOOKING
          </button>

          {/* AWARD TAB */}
          <button
            onClick={() => {
              setActiveTab("award");
              setSortFilter("newest");
              setCurrentPage(1);
            }}
            className={`px-6 sm:px-10 py-3 font-semibold text-sm sm:text-base transition-all border-l
        ${activeTab === "award"
                ? "bg-blue-100 text-black"
                : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            AWARD NOMINATION
          </button>

          {/* VIP TAB */}
          <button
            onClick={() => {
              setActiveTab("vip");
              setSortFilter("newest");
              setCurrentPage(1);
            }}
            className={`px-6 sm:px-10 py-3 font-semibold text-sm sm:text-base transition-all border-l
        ${activeTab === "vip"
                ? "bg-blue-100 text-black"
                : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            GUEST PASS
          </button>

          {/* DELEGATE TAB */}
          <button
            onClick={() => {
              setActiveTab("delegate");
              setSortFilter("newest");
              setCurrentPage(1);
            }}
            className={`px-6 sm:px-10 py-3 font-semibold text-sm sm:text-base transition-all border-l
        ${activeTab === "delegate"
                ? "bg-blue-100 text-black"
                : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            DELEGATE PASS
          </button>

          {/* EXHIBITOR TAB */}
          <button
            onClick={() => {
              setActiveTab("exhibitor");
              setSortFilter("newest");
              setCurrentPage(1);
            }}
            className={`px-6 sm:px-10 py-3 font-semibold text-sm sm:text-base transition-all border-l
        ${activeTab === "exhibitor"
                ? "bg-blue-100 text-black"
                : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            EXHIBITOR PASS
          </button>

        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header with Add User button and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Registered Users</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                <span className="font-medium">Total Registered</span>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-800">
                  {activeTab === "event"
                    ? data.length
                    : activeTab === "vip"
                      ? vipData.length
                      : activeTab === "delegate"
                        ? delegateData.length
                      : activeTab === "exhibitor"
                        ? exhibitorData.length
                    : activeTab === "stall"
                      ? stallData.length
                      : awardData.length}
                </span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-sm font-semibold text-blue-700">
                  Showing: {activeList.length}
                </span>
              </p>
              <button
                onClick={refreshData}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                title="Refresh data"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name, phone, place..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="h-11 px-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            {(activeTab === "event" || activeTab === "stall") && (
              <div className="relative">
                <select
                  value={sortFilter}
                  onChange={(e) => {
                    setSortFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 pl-4 pr-10 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                  title="Sort by"
                >
                  <option value="newest">Newest</option>
                  {activeTab === "event" && <option value="with_food">With Food</option>}
                  {activeTab === "event" && <option value="without_food">Without Food</option>}
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="admin_created">Admin created</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <button
              onClick={() => setShowAddUser(true)}
              className="h-11 bg-green-600 text-white px-4 rounded-xl hover:bg-green-700 transition flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {/* Table*/}
        <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {activeTab === "event" && (
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Place</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Package</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Card</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
                </tr>
              )}

              {activeTab === "vip" && (
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Place</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Card</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
                </tr>
              )}

              {activeTab === "delegate" && (
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Place</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Card</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
                </tr>
              )}

              {activeTab === "exhibitor" && (
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Place</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Card</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
                </tr>
              )}

              {activeTab === "stall" && (
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Place</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Company Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Card</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
                </tr>
              )}

              {activeTab === "award" && (
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Company Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Registered At</th>
                </tr>
              )}
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {currentUsers.length > 0 ? (
                currentUsers.map((user, i) => (
                  <tr key={user._id ?? i} className="hover:bg-gray-50">
                    {/* Event rows */}
                    {activeTab === "event" && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.place}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.packageType === "without_food" ? "Without Food" : "With Food"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {user.paymentStatus === "paid" ? (
                            <div>
                              <span className="text-green-600 font-medium">Paid</span>
                              {user.paymentId && (
                                <div className="text-xs text-gray-500">ID: {user.paymentId}</div>
                              )}
                            </div>
                          ) : user.paymentStatus === "unpaid" ? (
                            <span className="text-red-600 font-medium">Unpaid</span>
                          ) : user.paymentStatus === "admin_created" ? (
                            <span className="text-orange-600 font-medium">Created by Admin</span>
                          ) : (
                            <span className="text-gray-600 font-medium">Unknown</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`/card/${user._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Card
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                        </td>
                      </>
                    )}

                    {activeTab === "exhibitor" && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.place}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`/card/${user._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Card
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                        </td>
                      </>
                    )}

                    {/* VIP rows */}
                    {activeTab === "vip" && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.place}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`/card/${user._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Card
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                        </td>
                      </>
                    )}

                    {activeTab === "delegate" && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.place}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`/card/${user._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            View Card
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                        </td>
                      </>
                    )}

                    {/* Stall rows */}
                    {activeTab === "stall" && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.place}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.companyName}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.position}</td>
                        <td className="px-4 py-3 text-sm">
                          {user.paymentStatus === "paid" ? (
                            <div>
                              <span className="text-green-600 font-medium">Paid</span>
                              {user.paymentId && (
                                <div className="text-xs text-gray-500">ID: {user.paymentId}</div>
                              )}
                            </div>
                          ) : user.paymentStatus === "unpaid" ? (
                            <span className="text-red-600 font-medium">Unpaid</span>
                          ) : user.paymentStatus === "admin_created" ? (
                            <span className="text-orange-600 font-medium">Created by Admin</span>
                          ) : (
                            <span className="text-gray-600 font-medium">Unknown</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {user.userId ? (
                            <a
                              href={`/card/${user.userId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              View Card
                            </a>
                          ) : (
                            <span className="text-gray-400 text-xs">No card</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                        </td>
                      </>
                    )}

                    {/* Award rows */}
                    {activeTab === "award" && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.companyName}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{user.position}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-sm text-gray-500" colSpan="5">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card list for small screens */}
        <div className="sm:hidden space-y-3">
          {currentUsers.length > 0 ? (
            currentUsers.map((user, i) => (
              <div
                key={user._id ?? i}
                className="bg-white p-4 rounded-lg shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.phone}</div>
                </div>
                <div className="text-xs text-gray-600 mb-1">Place: {user.place}</div>

                {activeTab === "event" && (
                  <div className="text-xs text-gray-600 mb-1">
                    Package: {user.packageType === "without_food" ? "Without Food" : "With Food"}
                  </div>
                )}

                {activeTab === "stall" && (
                  <div className="text-xs text-gray-600 mb-1">
                    Company Name: {user.companyName}
                  </div>
                )}

                {activeTab === "stall" && (
                  <div className="text-xs text-gray-600 mb-1">{`Position: ${user.position}`}</div>
                )}
                {activeTab === "award" && (
                  <div className="text-xs text-gray-600 mb-1">
                    Company Name: {user.companyName}
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-2">
                  Registered: {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
                </div>
                <div className="text-center mt-2">
                  {activeTab === "event" && (
                    <button
                      onClick={() => navigate(`/card/${user._id}`)}
                      className="w-full bg-gray-300 text-gray-900 text-xs font-medium py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      View Card
                    </button>
                  )}

                  {activeTab === "vip" && (
                    <button
                      onClick={() => navigate(`/card/${user._id}`)}
                      className="w-full bg-gray-300 text-gray-900 text-xs font-medium py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      View Card
                    </button>
                  )}

                  {activeTab === "delegate" && (
                    <button
                      onClick={() => navigate(`/card/${user._id}`)}
                      className="w-full bg-gray-300 text-gray-900 text-xs font-medium py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      View Card
                    </button>
                  )}

                  {activeTab === "exhibitor" && (
                    <button
                      onClick={() => navigate(`/card/${user._id}`)}
                      className="w-full bg-gray-300 text-gray-900 text-xs font-medium py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      View Card
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 rounded-lg shadow text-center text-sm text-gray-500">
              No users found
            </div>
          )}
        </div>

        {/* Pagination, Actions */}
        <div className="mt-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-4 px-4 bg-white border-t border-gray-200">

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Previous
            </button>

            <div className="text-sm text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next
            </button>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
          >
            Download Excel
          </button>
        </div>
      </div>

      {/* Admin User Creation Modal */}
      {showAddUser && (
        <AdminUserCreation
          onClose={() => setShowAddUser(false)}
          onSuccess={refreshData}
          activeTab={activeTab}
        />
      )}

    </div>
  );
}

export default ViewExcel;
