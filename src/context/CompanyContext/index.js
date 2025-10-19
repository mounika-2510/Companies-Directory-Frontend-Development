import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllCompanies } from '../../api';

const CompanyContext = createContext();

export function useCompanies() {
  return useContext(CompanyContext);
}

export function CompanyProvider({ children }) {
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // filter state
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getAllCompanies()
      .then(data => {
        if (!mounted) return;
        setAll(data);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setError('Unable to load data');
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    // filter, search, sort, pagination (client side)
    let res = [...all];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      res = res.filter(c => c.name.toLowerCase().includes(q) || (c.industry || '').toLowerCase().includes(q));
    }

    if (location) {
      res = res.filter(c => c.location === location);
    }

    if (industry) {
      res = res.filter(c => c.industry === industry);
    }

    res.sort((a,b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'string') {
        return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return order === 'asc' ? (aVal - bVal) : (bVal - aVal);
    });

    setFiltered(res);
    setPage(1); // reset page when filters change
  }, [all, search, location, industry, sortBy, order]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  const value = {
    all,
    filtered,
    paginated,
    loading,
    error,
    search, setSearch,
    location, setLocation,
    industry, setIndustry,
    sortBy, setSortBy,
    order, setOrder,
    page, setPage, totalPages, total, limit,
    setError
  };

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}
