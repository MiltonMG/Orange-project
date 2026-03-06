import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { getCsrfToken } from '../helpers/token.helper.ts';
import { postLogin, getEmployees } from '../requests/auth.requests.ts';

// Métricas
const loginDuration     = new Trend('login_duration', true);
const loginErrorRate    = new Rate('login_errors');
const loginCount        = new Counter('login_count');

export function loginScenario(): void {

    //======================== get CSRF token ========================
    const token = getCsrfToken();
    if (!token) {
        loginErrorRate.add(1);
        return;
    }

    //======================== Login ========================
    const start = Date.now();
    const loginRes = postLogin(token);
    loginDuration.add(Date.now() - start);
    loginCount.add(1);

    const loginOk = check(loginRes, {
        'status es 200': (r) => r.status === 200,
        'redirige al dashboard': (r) => r.url.includes('/dashboard'),
        'no muestra error login': (r) => !r.body!.toString().includes('Invalid credentials'),
    });

    loginErrorRate.add(!loginOk);

    //======================== Si el login es exitoso, simular actividad del usuario ========================
    if (loginOk) {
        const apiRes = getEmployees();
        check(apiRes, {
            'API retorna empleados': (r) => r.status === 200,
        });
    }

    // PASO 5 — Pausa realista
    sleep(Math.random() * 3 + 1);
}