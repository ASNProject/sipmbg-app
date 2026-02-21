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

import { useState } from "react";
import useAttendanceExport from "../hooks/useAttendanceExport";
import useSchool from "../hooks/useSchool";
import toast from "react-hot-toast";

export default function Report() {
    const { exportAttendance, loading } = useAttendanceExport();
    const { schools } = useSchool();

    const [form, setForm] = useState({
        type: "daily",
        school_id: "",
        start: "",
        end: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.type === "range") {
            if (!form.start || !form.end) {
                toast.error("Tanggal mulai dan selesai wajib diisi");
                return;
            }

            if (form.end < form.start) {
                toast.error("Tanggal selesai tidak boleh lebih kecil dari tanggal mulai");
                return;
            }
        }

        await exportAttendance(form);
    };

    return (
        <div className="p-8 w-full">
            <h1 className="text-2xl font-bold mb-6">
                Export Laporan Presensi
            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Tipe Export
                    </label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="daily">Harian (Hari Ini)</option>
                        <option value="weekly">Mingguan (Senin - Sabtu)</option>
                        <option value="monthly">Bulanan</option>
                        <option value="range">Range Tanggal</option>
                    </select>
                </div>

                {/* SCHOOL */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Sekolah (Opsional)
                    </label>
                    <select
                        name="school_id"
                        value={form.school_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="">Semua Sekolah</option>
                        {schools?.map((school) => (
                            <option key={school.id} value={school.id}>
                                {school.school_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* RANGE DATE */}
                {form.type === "range" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tanggal Mulai (Start Date)
                            </label>
                            <input
                                type="date"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Pilih tanggal awal laporan
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tanggal Selesai (End Date)
                            </label>
                            <input
                                type="date"
                                name="end"
                                value={form.end}
                                onChange={handleChange}
                                min={form.start}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Tidak boleh lebih kecil dari tanggal mulai
                            </p>
                        </div>
                    </>
                )}

                {/* BUTTON FULL WIDTH */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {loading ? "Mengexport..." : "Download Excel"}
                    </button>
                </div>
            </form>
        </div>
    );
}