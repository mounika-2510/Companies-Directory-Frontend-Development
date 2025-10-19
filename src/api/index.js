// simple client fetch from public/companies.json
export async function getAllCompanies() {
  const res = await fetch('/companies.json');
  if (!res.ok) throw new Error('failed to load companies');
  const json = await res.json();
  return json.companies || [];
}
