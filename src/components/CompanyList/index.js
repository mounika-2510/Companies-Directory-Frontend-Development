import React from 'react';
import { useCompanies } from '../../context/CompanyContext';
import CompanyCard from '../CompanyCard';
import Filters from '../Filters';
import Loader from '../Loader';
import ErrorBox from '../ErrorBox';
import './index.css';

export default function CompanyList() {
  const { paginated, loading, error, page, setPage, totalPages } = useCompanies();

  if (loading) return <Loader />;

  if (error) return <ErrorBox message={error} />;

  return (
    <div className="list-wrap">
      <Filters />
      <div className="grid">
        {paginated.length === 0 && <div className="empty">No results</div>}
        {paginated.map(c => <CompanyCard key={c.id} company={c} />)}
      </div>

      <div className="pager">
        <button disabled={page <= 1} onClick={() => setPage(1)}>First</button>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
        <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>Last</button>
      </div>
    </div>
  );
}
