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

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SchoolFormModal({ onClose, onSubmit, initialData }) {

    const [form, setForm] = useState({
        school_name: "",
        school_address: "",
        school_phone: "",
        school_capacity: "",
    });

    useEffect(() => {
        setForm({
            school_name: initialData?.school_name || "",
            school_address: initialData?.school_address || "",
            school_phone: initialData?.school_phone || "",
            school_capacity: initialData?.school_capacity || "",
        });
    }, [initialData]);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit(
                {
                    ...form,
                }
            );
            toast.success(
                initialData
                    ? "Sekolah berhasil diperbarui"
                    : "Sekolah berhasil ditambahkan"
            );
        } catch (err) {
            toast.error(err?.response?.data?.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">{initialData ? "Edit Sekolah" : "Tambah Sekolah"}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="school_name"
                        placeholder="Masukkan Nama Sekolah"
                        value={form.school_name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="school_address"
                        placeholder="Masukkan Alamat Sekolah"
                        value={form.school_address}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="school_phone"
                        placeholder="Masukkan Nomor Telepon"
                        value={form.school_phone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        type="tel"
                        required
                    />
                    <input
                        name="school_capacity"
                        placeholder="Masukkan Kapasitas Sekolah"
                        type="number"
                        min="0"
                        value={form.school_capacity}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}