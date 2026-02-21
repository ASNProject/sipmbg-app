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
import { AttendanceService } from "../services/services";

export default function useAttendance() {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await AttendanceService.getAll();

            const todayIndonesia = new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });

            const filtered = res.data.data.filter(
                (item) => item.attendance_date === todayIndonesia
            );

            setAttendances(filtered);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAttendance = async (id) => {
        await AttendanceService.delete(id);
        await loadData();
    };

    useEffect(() => {
        loadData();
    }, []);

    return { attendances, loading, deleteAttendance };
}