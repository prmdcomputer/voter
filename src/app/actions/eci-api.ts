'use server';

/**
 * Server Action to fetch voter details from the official ECI API.
 * This bypasses CORS restrictions and uses the exact headers/payload provided.
 */
export async function fetchVoterFromECI() {
  const ECI_API_URL = 'https://gateway-voters.eci.gov.in/api/v1/elastic/search-by-epic-from-national-display-v1';

  // Exact headers from the user's network request dump
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'applicationname': 'ELECTORAL-SEARCH',
    'appname': 'ELECTORAL-SEARCH',
    'channelidobo': 'ELECTORAL-SEARCH',
    'Origin': 'https://electoralsearch.eci.gov.in',
    'Referer': 'https://electoralsearch.eci.gov.in/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
  };

  // The static encrypted payload provided for the Pooja Devi record
  const payload = {
    encryptedKey: "iuIxdgg8lwwIAiNtBLLmch3OFTugtWH/UupBfpNXXI3lJFyMD+IyclcIC5FxQ04fEVe890cg3pBnB0KaTgtK33N+Rd+67wLHRMPBJXn4hohzmRKaeDrb7oKRcWGZkYWWGnE2d6zDV88aO4Dpck4d/kV/ovsmz7FIHUH3/Kx9FK5MSDiaOT51wsP1UGg4NaANeX+e+RWnvIcQQJZhIoy+VFW14Sm2Dctmi6l2jRnuWqOk5Qy+I4qwTAjq4iKB6dUn0iqKkwrxRYORQTJhED6D2vnzQO6xtQ8KS3Z/kQJ3V7I4FlDLOM3wWXWfskPeKOVx4+FNBivKs3LJgKSl+mXNhQ==",
    encryptedPayload: "IQA6b/zjj4R/Qm/sb5J6BFp2XBOWuaYKkHiK4JJ8mqABOlFeMztnz9zCnQmwVeF2//Tuw8NJdotx0Nd7Kgev8jOEce2hLoIa3xIbRabKjlfgq3Tq2oHT1Z2oPTZX4Q7YWpKqDm9FeiuJEt5sp7IBtjhP15qJaetKX3CBqJUJ2Gy+pWqJG+m2NwTriPfjaSzkQGu0Og==",
    iv: "ermkiXy/TMs3IhJR"
  };

  try {
    const response = await fetch(ECI_API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { 
        error: true, 
        message: `ECI API returned ${response.status}: ${errorText.substring(0, 100)}` 
      };
    }

    const data = await response.json();
    return { error: false, data };
  } catch (error: any) {
    return { 
      error: true, 
      message: error.message || 'Network error occurred while fetching from ECI Gateway' 
    };
  }
}
