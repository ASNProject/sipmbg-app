// Copyright 2026 ariefsetyonugroho
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
    HiMenu,
    HiHome,
    HiLogout,
    HiChartBar,
    HiChevronDown,
    HiOutlineBadgeCheck,
    HiDocumentReport,
} from "react-icons/hi";
import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const { logout, user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});
    
    const menuItems = [
        { path: "home", label: "Beranda", icon: <HiHome className="w-5 h-5 mr-2" /> },
        {
            label: "Data Master",
            icon: <HiChartBar className="w-5 h-5 mr-2" />,
            subItems: [
                { path: "data/sekolah", label: "Data Sekolah" },
                { path: "data/siswa", label: "Data Siswa" },
            ],
        },
        { path: "report", label: "Laporan", icon: <HiDocumentReport className="w-5 h-5 mr-2" /> },
    ];

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
        {/* ================= MOBILE HEADER ================= */}
        <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-white shadow z-40 flex items-center justify-between px-4">
            <h1 className="text-lg font-bold text-gray-800">SIPMBG APP</h1>
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-gray-100"
            >
            <HiMenu className="w-6 h-6 text-gray-700" />
            </button>
        </header>
      {/* ================= MOBILE DROPDOWN MENU ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg z-30">
          <nav className="flex flex-col p-4 space-y-2">
            <p className="text-sm text-gray-500 mb-2">
              Hallo, <span className="font-semibold text-blue-600">{user?.name}</span>
            </p>

            {menuItems.map((item) =>
              item.subItems ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="flex justify-between items-center w-full px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                  >
                    <span className="flex items-center">
                      {item.icon}
                      {item.label}
                    </span>
                    <HiChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openSubmenus[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSubmenus[item.label] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={`/dashboard/${sub.path}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={`/dashboard/${item.path}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              )
            )}

            <button
              onClick={logout}
              className="mt-4 flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <HiLogout className="w-5 h-5 mr-2" />
              Keluar
            </button>
          </nav>
        </div>
      )}
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white shadow-lg px-4 py-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <HiOutlineBadgeCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Hello,</p>
            <p className="text-lg font-semibold text-gray-800">
              {user?.name}
            </p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col space-y-2">
          {menuItems.map((item) =>
            item.subItems ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700 w-full"
                >
                  <span className="flex items-center">
                    {item.icon}
                    {item.label}
                  </span>
                  <HiChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openSubmenus[item.label] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubmenus[item.label] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={`/dashboard/${sub.path}`}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg hover:bg-blue-100 ${
                            isActive
                              ? "bg-blue-200 text-blue-800 font-semibold"
                              : "text-gray-700"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={`/dashboard/${item.path}`}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg hover:bg-blue-100 ${
                    isActive
                      ? "bg-linear-to-r from-blue-200 to-blue-100 text-blue-800 font-semibold shadow"
                      : "text-gray-700"
                  }`
                }
                end
              >
                {item.icon}
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <HiLogout className="w-5 h-5 mr-2" />
          Keluar
        </button>
      </aside>
    </>
  )
}
