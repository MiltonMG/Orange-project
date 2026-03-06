import { loginScenario } from './scenarios/login.scenario.ts';
import { thresholds }    from './config/thresholds.ts';

export const options = {
  scenarios: {
    carga_sostenida: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
    },
  },
  thresholds,
};

// El archivo principal queda en 3 líneas de lógica
export default function () {
  loginScenario();
}