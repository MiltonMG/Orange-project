// Define performance thresholds for the tests
export const thresholds = {
  'login_duration':    ['p(95)<3000'],
  'login_errors':      ['rate<0.05'],
  'http_req_duration': ['p(99)<5000'],
};