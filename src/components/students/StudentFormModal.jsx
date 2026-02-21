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
import useSchool from "../../hooks/useSchool";

export default function StudentFormModal({ onClose, onSubmit, initialData }) {
    const { schools, loading: schoolLoading } = useSchool();

    const [form, setForm] = useState({
        fingerprint_id: "",
        student_name: "",
        student_address: "",
        student_phone: "",
        student_class: "",
        school_id: "",
    });

    useEffect(() => {
        setForm({
            fingerprint_id: initialData?.fingerprint_id || "",
            student_name: initialData?.student_name || "",
            student_address: initialData?.student_address || "",
            student_phone: initialData?.student_phone || "",
            student_class: initialData?.student_class || "",
            school_id: initialData?.school?.id
                ? String(initialData.school.id)
                : "",
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
                    ? "Siswa berhasil diperbarui"
                    : "Siswa berhasil ditambahkan"
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
                <h3 className="text-lg font-semibold mb-4">{initialData ? "Edit Siswa" : "Tambah Siswa"}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="fingerprint_id"
                        placeholder="Masukkan Fingerprint ID"
                        value={form.fingerprint_id}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="student_name"
                        placeholder="Masukkan Nama Siswa"
                        value={form.student_name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="student_address"
                        placeholder="Masukkan Alamat Siswa"
                        value={form.student_address}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="student_phone"
                        placeholder="Masukkan Nomor Telepon"
                        value={form.student_phone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        type="tel"
                        required
                    />
                    <input
                        name="student_class"
                        placeholder="Masukkan Kelas Siswa"
                        value={form.student_class}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        type="tel"
                        required
                    />
                    <select
                        name="school_id"
                        value={form.school_id}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        disabled={schoolLoading}
                    >
                        <option value="">
                            {schoolLoading ? "Memuat Sekolah..." : "Pilih Sekolah"}
                        </option>

                        {schools?.map((school) => (
                            <option value={String(school.id)} key={school.id}>
                                {school.school_name}
                            </option>
                        ))}
                    </select>

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