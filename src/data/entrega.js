// Regras de entrega do André Lanches
export const TAXA_ENTREGA = 4.9;
export const PEDIDO_MINIMO = 15.0;
export const PAGAMENTOS = ['Pix', 'Cartão', 'Dinheiro'];

// Cupons de desconto (digite o código no carrinho)
export const CUPONS = {
  COMBO10: { tipo: 'percentual', valor: 10, descricao: '10% de desconto' },
  FRETEGRATIS: { tipo: 'frete', descricao: 'Entrega grátis' },
};

// WhatsApp: derivado do TELEFONE_LINK (produtos.js), então basta trocar o número lá.
import { TELEFONE_LINK } from './produtos';

const NUMERO = TELEFONE_LINK.replace(/\D/g, ''); // ex.: 5561986540564
const MENSAGEM = 'Olá, André Lanches! Gostaria de fazer um pedido.';
export const WHATSAPP_LINK = `https://wa.me/${NUMERO}?text=${encodeURIComponent(MENSAGEM)}`;
