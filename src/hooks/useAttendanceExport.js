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
import { AttendanceService } from "../services/services";
import toast from "react-hot-toast";

export default function useAttendanceExport() {
    const [loading, setLoading] = useState(false);

    const exportAttendance = async (filters) => {
        try {
            setLoading(true);

            const cleanFilters = {
                type: filters.type,
                school_id: filters.school_id ? Number(filters.school_id) : null,
                start: filters.type === "range" ? filters.start : null,
                end: filters.type === "range" ? filters.end : null,
            };

            const response = await AttendanceService.export(cleanFilters);

            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            let fileName = "Presensi MBG.xlsx";
            const disposition = response.headers["content-disposition"];

            if (disposition) {
                const match = disposition.match(/filename="?(.+)"?/);
                if (match?.length > 1) fileName = match[1];
            }

            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Export berhasil");
        } catch (error) {

            if (error.response?.data?.errors) {
                console.log(error.response.data.errors);
                toast.error("Validasi gagal, cek filter export");
            } else {
                toast.error("Gagal export data");
            }

        } finally {
            setLoading(false);
        }
    };

    return { exportAttendance, loading };
}