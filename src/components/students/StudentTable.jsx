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

import StudentRow from "./StudentRow";

export default function StudentTable({ students, page, perPage, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">Fingerprint ID</th>
                        <th className="px-4 py-2">Nama Siswa</th>
                        <th className="px-4 py-2">Alamat</th>
                        <th className="px-4 py-2">Nomor Telepon</th>
                        <th className="px-4 py-2">Kelas</th>
                        <th className="px-4 py-2">Sekolah</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td
                                colSpan={8}
                                className="px-4 py-8 text-center text-gray-500 italic"
                            >
                                Belum ada data siswa
                            </td>
                        </tr>
                    ) : (
                        students.map((student, index) => (
                            <StudentRow
                                key={student.id}
                                student={student}
                                index={index}
                                page={page}
                                perPage={perPage}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            ></StudentRow>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}