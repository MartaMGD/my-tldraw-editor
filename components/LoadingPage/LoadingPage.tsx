import React from 'react';
import './LoadingPage.css';

interface LoadingPageProps {
  bgColor?: string;
  opacity?: string;
  textColor?: string;
  message?: string;
}

export function LoadingPage({ bgColor, opacity, textColor, message }: LoadingPageProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bgColor} ${opacity} ${textColor}`}
    >
      <div className="loader  mb-4"></div>

      <h3>{message}</h3>
    </div>
  );
}
