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
import { SchoolService } from "../services/services";

export default function useSchool() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ last_page: 1, total: 0 });

    const PER_PAGE = 20;

    const loadSchools = async () => {
        setLoading(true);
        try {
            const res = await SchoolService.getAll();
            const allData = res?.data?.data || [];
            
            const total = allData.length;
            const lastPage = Math.ceil(total / PER_PAGE);

            const start = (page - 1) * PER_PAGE;
            const end = start + PER_PAGE;

            setSchools(allData.slice(start, end));
            setMeta({ last_page: lastPage, total });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSchools();
    }, [page]);

    const addSchool = async (data) => {
        try {
            await SchoolService.post(data);
            await loadSchools();
        } catch (err) {
            console.error(err);
           throw err;
        }
    }

    const updateSchool = async (id, data) => {
        try {
            await SchoolService.update(id, data);
            await loadSchools();
        } catch (err) {
           throw err;
        }
    }

    const deleteSchool = async (id) => {
        try {
            await SchoolService.delete(id);
            await loadSchools();
        } catch (err) {
           throw err;
        }
    }

    return { 
        schools, 
        loading, 
        error, 
        meta, 
        page,
        setPage, 
        addSchool, 
        updateSchool, 
        deleteSchool ,
        reload: loadSchools,
        goToPage: (p) => setPage(p),
        nextPage: () => setPage((p) => p + 1),
        prevPage: () => setPage((p) => p - 1),
    };
}