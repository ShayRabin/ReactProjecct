import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Account from './user/Account';
import Cards from './CardsPages/Cards';
import MyCards from './CardsPages/MyCards';
import FavCards from './CardsPages/FavCards';
import UserManagement from './admin/UserManagement';
import About from './pages/About';
import CreateCards from './CardBusiness/CreateCards';

export default function Router({ theme }) {
    return (
        <Routes>
            <Route path="/" element={<Cards theme={theme} />} />
            <Route path="/about" element={<About theme={theme} />} />
            <Route path="/my-cards" element={<MyCards theme={theme} />} />
            <Route path="/favorite" element={<FavCards theme={theme} />} />
            <Route path="/admin" element={<UserManagement theme={theme} />} />
            <Route path="/login" element={<Login theme={theme} />} />
            <Route path="/SignUp" element={<SignUp theme={theme} />} />
            <Route path="/account" element={<Account theme={theme} />} />
            <Route path="/create-cards" element={<CreateCards theme={theme} />} />
        </Routes>
    )
}