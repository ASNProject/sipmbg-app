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

import { useState, useMemo } from "react";
import { HiTrash } from "react-icons/hi";
import useAttendance from "../hooks/useAttendance";
import useSchool from "../hooks/useSchool";
import ConfirmDialog from "../components/common/ConfirmDialog";
import toast from "react-hot-toast";

export default function Home() {
    const { attendances, loading, deleteAttendance } = useAttendance();
    const { schools } = useSchool();

    const [search, setSearch] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const filteredData = useMemo(() => {
        return attendances.filter((item) => {
            const matchName = item.student.student_name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchSchool = selectedSchool
                ? item.school_id === Number(selectedSchool)
                : true;

            return matchName && matchSchool;
        });
    }, [attendances, search, selectedSchool]);

    const openDeleteDialog = (id) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;

        try {
            setDeleting(true);
            await deleteAttendance(selectedId);
            toast.success("Presensi berhasil dihapus");
            setConfirmOpen(false);
            setSelectedId(null);
        } catch (error) {
            toast.error("Gagal menghapus presensi");
        } finally {
            setDeleting(false);
        }
    };

    const totalCapacity = useMemo(() => {
        return schools.reduce((total, school) => {
            return total + Number(school.school_capacity || 0);
        }, 0);
    }, [schools]);

    return (
        <div className="p-4 space-y-8">
            <div>
                <h2 className="text-2xl font-semibold">
                    Selamat Datang di SIPMBG APP
                </h2>
                <p className="mt-2 text-gray-600">
                    Sistem Informasi Presensi Makan Bergizi Gratis
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
                    <p className="text-sm opacity-80">
                        Total Presensi Hari Ini
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {attendances.length}
                    </h2>
                    <p className="text-xs mt-1 opacity-80 italic">
                        * Jumlah presensi yang tercatat untuk hari ini
                    </p>
                </div>

                <div className="bg-green-600 text-white p-6 rounded-xl shadow">
                    <p className="text-sm opacity-80">
                        Total Sekolah Aktif
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {new Set(attendances.map(a => a.school_id)).size}
                    </h2>
                    <p className="text-xs mt-1 opacity-80 italic">
                       * Total dari {schools.length} sekolah yang terdaftar
                    </p>
                </div>

                <div className="bg-purple-600 text-white p-6 rounded-xl shadow">
                    <p className="text-sm opacity-80">
                        Total Kapasitas Siswa
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {totalCapacity}
                    </h2>
                    <p className="text-xs mt-1 opacity-80 italic">
                        * Total kapasitas dari semua sekolah yang terdaftar
                    </p>
                </div>

            </div>

            <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Cari Nama Siswa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />

                    <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    >
                        <option value="">Semua Sekolah</option>
                        {schools?.map((school) => (
                            <option key={school.id} value={school.id}>
                                {school.school_name}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Nama</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Sekolah</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Kelas</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Tanggal</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Jam</th>
                            {/* <th className="px-6 py-3 text-center text-sm font-semibold">Aksi</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500">
                                    Tidak ada presensi hari ini
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-3">{index + 1}</td>

                                    <td className="px-6 py-3 font-medium">
                                        {item.student.student_name}
                                    </td>

                                    <td className="px-6 py-3">
                                        {item.school.school_name}
                                    </td>

                                    <td className="px-6 py-3">
                                        {item.student.student_class}
                                    </td>

                                    <td className="px-6 py-3">
                                        {item.attendance_date}
                                    </td>

                                    <td className="px-6 py-3">
                                        {item.attendance_time}
                                    </td>

                                    {/* <td className="px-6 py-3 text-center">
                                        <button
                                            onClick={() => openDeleteDialog(item.id)}
                                            disabled={deleting}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 justify-center"
                                        >
                                            <HiTrash className="w-4 h-4" />
                                            Hapus
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
            
            <ConfirmDialog
                open={confirmOpen}
                title="Hapus Presensi"
                message="Apakah Anda yakin ingin menghapus presensi ini?"
                confirmText="Hapus"
                cancelText="Batal"
                variant="danger"
                loading={deleting}
                onCancel={() => {
                    if (!deleting) {
                        setConfirmOpen(false);
                        setSelectedId(null);
                    }
                }}
                onConfirm={handleConfirmDelete}
            />

        </div>
    );
}