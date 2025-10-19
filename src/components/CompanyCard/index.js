import React from 'react';
import './index.css';

export default function CompanyCard({ company }) {
  return (
    <div className="card">
      <h3 className="card-title">{company.name}</h3>
      <p className="card-meta">{company.industry} • {company.location}</p>
      <p>Employees: {company.employees}</p>
      <p>Founded: {company.founded}</p>
      <a className="card-link" href={company.website} target="_blank" rel="noreferrer">Website</a>
    </div>
  );
}
