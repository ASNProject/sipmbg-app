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
import StudentTable from "../../components/students/StudentTable";
import useStudent from "../../hooks/useStudent";
import StudentFormModal from "../../components/students/StudentFormModal";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import toast from "react-hot-toast";

export default function Student() {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    page,
    meta,
    goToPage,
  } = useStudent();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Daftar Siswa</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Tambah Siswa
        </button>
      </div>
      <StudentTable 
        students={students}
        page={page}
        perPage={20}
        onEdit={(data) => {
          setEditing(data);
          setOpenModal(true);
        }} 
        onDelete={(id) => {
          setSelectedId(id);
          setConfirmOpen(true);
        }} 
      ></StudentTable>
      <Pagination
        page={page}
        lastPage={meta.last_page}
        onPageChange={goToPage}
      ></Pagination>

      {openModal && (
        <StudentFormModal
          initialData={editing} 
          onClose={() => setOpenModal(false)}
          onSubmit={async(data) => {
           if (editing) {
              await updateStudent(editing.id, data); }
           else { 
            await addStudent(data);
           }
            setOpenModal(false);
          }}
        ></StudentFormModal>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Hapus Siswa"
        message="Yakin ingin menghapus siswa ini?"
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
        onConfirm={async () => {
          if (!selectedId) return;

          try {
            setDeleting(true);

            await deleteStudent(selectedId);

            toast.success("Siswa berhasil dihapus");

            setConfirmOpen(false);
            setSelectedId(null);

          } catch (err) {
            console.error("Gagal menghapus siswa", err);
            toast.error(
              err?.response?.data?.message || "Gagal menghapus siswa"
            );
          } finally {
            setDeleting(false);
          }
        }}
      />
    </div>
  );
}
