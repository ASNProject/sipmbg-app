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

import { Navigate, Route, Routes } from "react-router-dom";
import Private from "../providers/PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import School from "../pages/data_master/School";
import Student from "../pages/data_master/Student";
import Report from "../pages/Report";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <Private>
                    <Dashboard />
                </Private>
            } >
                <Route index element={
                    <Private>
                        <Home />
                    </Private>
                } />  
                <Route path="home" element={
                    <Private>
                        <Home />
                    </Private>
                } />  
                <Route path="report" element={
                    <Private>
                        <Report />
                    </Private>
                } />  

                {/* Data submenu */}
                <Route path="data/sekolah" element={
                    <Private>
                        <School />
                    </Private>
                } />
                <Route path="data/siswa" element={
                    <Private>
                        <Student />
                    </Private>
                } />
            </Route>
        </Routes>
    )
}