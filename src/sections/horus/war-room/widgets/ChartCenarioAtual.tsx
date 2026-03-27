'use client';

import DonutChart from 'sections/horus/simulacoes/DonutChart';
import { CANDIDATOS, CENARIO_ATUAL } from 'data/horus';

export default function ChartCenarioAtual() {
  return (
    <DonutChart
      labels={[CANDIDATOS.gabriel.nome, CANDIDATOS.juliana.nome, CANDIDATOS.zucco.nome, CANDIDATOS.edegar.nome, CANDIDATOS.brancos.nome]}
      series={[CENARIO_ATUAL.gabriel, CENARIO_ATUAL.juliana, CENARIO_ATUAL.zucco, CENARIO_ATUAL.edegar, CENARIO_ATUAL.brancos]}
      colors={[CANDIDATOS.gabriel.cor, CANDIDATOS.juliana.cor, CANDIDATOS.zucco.cor, CANDIDATOS.edegar.cor, CANDIDATOS.brancos.cor]}
      centerLabel={`${CENARIO_ATUAL.gabriel}%`}
      height={280}
    />
  );
}
