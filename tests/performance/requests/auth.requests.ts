import http, { RefinedResponse } from 'k6/http';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php';

export function postLogin(token: string): RefinedResponse<'text'> {
  return http.post(
    `${BASE_URL}/auth/validate`,
    `_token=${encodeURIComponent(token)}&username=Admin&password=admin123`,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      redirects: 10,
    }
  );
}

export function getEmployees(): RefinedResponse<'text'> {
  return http.get(
    `${BASE_URL}/api/v2/pim/employees`,
    { headers: { 'Content-Type': 'application/json' } }
  );
}