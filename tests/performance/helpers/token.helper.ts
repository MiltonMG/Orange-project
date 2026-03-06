import http from 'k6/http';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php';

export function getCsrfToken(): string {
  const res = http.get(`${BASE_URL}/auth/login`);

  if (res.status !== 200) {
    console.error(`Error al cargar página de login: ${res.status}`);
    return '';
  }

  const match = res.body!.toString().match(/:token="&quot;([^&]+)&quot;"/);

  if (!match) {
    console.error('❌ CSRF Token no encontrado');
    return '';
  }

  return match[1];
}