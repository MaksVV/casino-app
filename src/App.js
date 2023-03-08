import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getName, getBalance, getDeposit } from "./redux/userSlice";
import './App.css';

import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MainPage from "./pages/MainPage/MainPage";
import DoorGamePage from "./pages/DoorGamePage/DoorGamePage";
import NumberGamePage from "./pages/NumberGamePage/NumberGamePage"
import CoinGamePage from "./pages/CoinGamePage/CoinGamePage"
import CongratulationPage from "./pages/CongratulationPage/CongratulationPage";
import TryAgainPage from "./pages/TryAgainPage/TryAgainPage";



export default function App() {
  const name = useSelector(getName);
  const deposit = useSelector(getDeposit);
  const balance = useSelector(getBalance);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    name && setIsMounted(true);
    !name && setIsMounted(false);
  }, [name]);
  useEffect(() => {
    if (name === "") {
      navigate("/", { replace: true });
    }
  }, [name, navigate]);

  useEffect(() => {
    if (isMounted && balance <= 0) {
      navigate("/loss", { replace: true });
    }
  }, [balance, isMounted, navigate]);

  useEffect(() => {
    if (balance / deposit > 2) {
      navigate("/winner", { replace: true });
    }
  }, [balance, deposit, navigate]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/door" element={<DoorGamePage />} />
        <Route path="/number" element={<NumberGamePage />} />
        <Route path="/coin" element={<CoinGamePage />} />
        <Route path="/winner" element={<CongratulationPage />} />
        <Route path="/loss" element={<TryAgainPage />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
}