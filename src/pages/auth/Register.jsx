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

import toast from "react-hot-toast";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            toast.success('Registration successful');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Buat Akun Baru
        </h2>

        <form onSubmit={submit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nama
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                         outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Alamat Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                         outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                         outline-none transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({
                  ...form,
                  password_confirmation: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                         outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md
                       text-sm font-medium hover:bg-blue-700 transition"
          >
            Daftar
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Masuk
          </span>
        </p>
      </div>
    </div>
  );
}