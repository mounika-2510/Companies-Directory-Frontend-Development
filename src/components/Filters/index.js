import React, { useMemo } from 'react';
import { useCompanies } from '../../context/CompanyContext';
import './index.css';

export default function Filters() {
  const {
    all, search, setSearch,
    location, setLocation,
    industry, setIndustry,
    sortBy, setSortBy,
    order, setOrder,
    setError
  } = useCompanies();

  const locations = useMemo(() => {
    const s = new Set(all.map(c => c.location));
    return ['','All',...Array.from(s)];
  }, [all]);

  const industries = useMemo(() => {
    const s = new Set(all.map(c => c.industry));
    return ['','All',...Array.from(s)];
  }, [all]);

  return (
    <div className="filters">
      <input
        className="f-input"
        placeholder="Search name or industry"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select className="f-select" value={location} onChange={e => setLocation(e.target.value || '')}>
        <option value="">All locations</option>
        {Array.from(new Set(locations)).filter(Boolean).map(loc => <option key={loc} value={loc}>{loc}</option>)}
      </select>

      <select className="f-select" value={industry} onChange={e => setIndustry(e.target.value || '')}>
        <option value="">All industries</option>
        {Array.from(new Set(industries)).filter(Boolean).map(ind => <option key={ind} value={ind}>{ind}</option>)}
      </select>

      <select className="f-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="employees">Employees</option>
        <option value="founded">Founded</option>
      </select>

      <select className="f-select" value={order} onChange={e => setOrder(e.target.value)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <button className="f-btn" onClick={() => {
        setSearch('');
        setLocation('');
        setIndustry('');
        setSortBy('name');
        setOrder('asc');
        setError('');
      }}>
        Reset
      </button>
    </div>
  );
}
