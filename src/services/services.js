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

import api from './axios';
import { API_ENDPOINT } from './api_endpoint';

export const AuthService = {
    login: (credentials) => api.post(API_ENDPOINT.AUTH.LOGIN, credentials),
    logout: () => api.post(API_ENDPOINT.AUTH.LOGOUT),
    register: (data) => api.post(API_ENDPOINT.AUTH.REGISTER, data),
    getProfile: () => api.get(API_ENDPOINT.AUTH.PROFILE),
};

export const StudentService = {
    getAll: () => api.get(API_ENDPOINT.STUDENTS.BASE),
    getById: (id) => api.get(API_ENDPOINT.STUDENTS.DETAIL(id)),
    post: (data) => api.post(API_ENDPOINT.STUDENTS.BASE, data),
    update: (id, data) => api.put(API_ENDPOINT.STUDENTS.DETAIL(id), data),
    delete: (id) => api.delete(API_ENDPOINT.STUDENTS.DETAIL(id)),
};

export const SchoolService = {
    getAll: () => api.get(API_ENDPOINT.SCHOOLS.BASE),
    getById: (id) => api.get(API_ENDPOINT.SCHOOLS.DETAIL(id)),
    post: (data) => api.post(API_ENDPOINT.SCHOOLS.BASE, data),
    update: (id, data) => api.put(API_ENDPOINT.SCHOOLS.DETAIL(id), data),
    delete: (id) => api.delete(API_ENDPOINT.SCHOOLS.DETAIL(id)),
};

export const AttendanceService = {
    getAll: () => api.get(API_ENDPOINT.ATTENDANCES.BASE),
    getById: (id) => api.get(API_ENDPOINT.ATTENDANCES.DETAIL(id)),
    post: (data) => api.post(API_ENDPOINT.ATTENDANCES.BASE, data),
    update: (id, data) => api.put(API_ENDPOINT.ATTENDANCES.DETAIL(id), data),
    delete: (id) => api.delete(API_ENDPOINT.ATTENDANCES.DETAIL(id)),

    export: (params) =>
    api.get(API_ENDPOINT.ATTENDANCE_EXPORT, {
        params,
        responseType: "blob", 
    }),
};