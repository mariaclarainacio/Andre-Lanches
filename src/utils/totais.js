import { TAXA_ENTREGA, CUPONS } from '../data/entrega';

// Calcula desconto, taxa e total de acordo com o cupom aplicado (se houver).
export function calcularTotais(subtotal, codigoCupom) {
  const cupom = codigoCupom ? CUPONS[codigoCupom] : null;
  let desconto = 0;
  let taxa = TAXA_ENTREGA;

  if (cupom && cupom.tipo === 'percentual') {
    desconto = Math.round(subtotal * cupom.valor) / 100; // arredonda para centavos
  }
  if (cupom && cupom.tipo === 'frete') {
    taxa = 0;
  }
  return { desconto, taxa, total: subtotal - desconto + taxa };
}
