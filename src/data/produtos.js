// Dados extraídos do index.html original.
export const TELEFONE_EXIBICAO = '(61) 98654-0564';
// Troque pelo seu número real para testar a discagem nativa (formato internacional).
export const TELEFONE_LINK = 'tel:+5561986540564';

export const promocao = {
  titulo: 'Promoção!',
  descricao: 'X-Salada + Batata',
  preco: 16.9,
};

export const produtos = [
  { id: '1', nome: 'X-Salada', descricao: 'Pão, hambúrguer, queijo, alface e tomate.', preco: 10.0, imagem: require('../../assets/images/xsalada.jpg') },
  { id: '2', nome: 'Cheddar', descricao: 'Hambúrguer coberto com cheddar cremoso.', preco: 20.0, imagem: require('../../assets/images/cheddar.jpg') },
  { id: '3', nome: 'Batata Frita', descricao: 'Porção crocante, sequinha e bem salgadinha.', preco: 15.0, imagem: require('../../assets/images/batata.jpg') },
  { id: '4', nome: 'X-Burguer', descricao: 'O clássico: hambúrguer e queijo derretido.', preco: 14.50, imagem: require('../../assets/images/cheese.jpg') },
  { id: '5', nome: 'Big Tower', descricao: 'Camadas generosas para quem tem muita fome.', preco: 20.5, imagem: require('../../assets/images/bigtower.jpg') },
  { id: '6', nome: 'X-Frango', descricao: 'Frango desfiado com requeijão cremoso.', preco: 12.9, imagem: require('../../assets/images/fragonrequeijao.jpg') },
  { id: '7', nome: 'Nuggets (c/ 8)', descricao: 'Oito nuggets dourados e macios por dentro.', preco: 12.50, imagem: require('../../assets/images/nuggets.jpg') },
  { id: '8', nome: 'Refri (Lata)', descricao: 'Lata gelada, vários sabores.', preco: 8.50, imagem: require('../../assets/images/refri.jpg') },
  { id: '9', nome: 'Sucos', descricao: 'Vários sabores, feitos na hora.', preco: 8.50, imagem: require('../../assets/images/sucos.jpg') },
];

export const formatarPreco = (valor) =>
  'R$ ' + valor.toFixed(2).replace('.', ',');
