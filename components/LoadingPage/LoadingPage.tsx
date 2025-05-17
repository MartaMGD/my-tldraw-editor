import React from 'react';

import './LoadingPage.css';

export function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="loader  mb-4"></div>

      <h3>Unpacking watercolors and preparing canvas...</h3>
    </div>
  );
}
