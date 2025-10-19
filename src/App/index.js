import React from 'react';
import { CompanyProvider } from '../context/CompanyContext';
import CompanyList from '../components/CompanyList';
import './index.css';

export default function App() {
  return (
    <CompanyProvider>
      <div className="app">
        <header className="app-header">
          <h1>Companies Directory</h1>
        </header>
        <main>
          <CompanyList />
        </main>
      </div>
    </CompanyProvider>
  );
}
