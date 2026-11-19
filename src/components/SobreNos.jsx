import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

// Linha do tempo da história (texto fictício — edite com a história real, se quiser)
const TRAJETORIA = [
  { titulo: 'A chapa de 1 metro', texto: 'Tudo começou na garagem de casa: uma chapa pequena, uma receita de molho da avó e o André testando lanches nos amigos do bairro.' },
  { titulo: 'A fila que virou rotina', texto: 'Num sábado de jogo, os amigos trouxeram os amigos. Em duas horas o pão acabou e a fila dobrou a esquina. Ali o André entendeu: era uma lanchonete.' },
  { titulo: '“Entregamos na sua casa!”', texto: 'Teve gente que não conseguia sair para buscar, então o André passou a levar o lanche, ainda quentinho, na própria bicicleta. Daí vem o nosso telefone no canto da tela.' },
  { titulo: 'Agora, no seu bolso', texto: 'Hoje você monta o pedido, acompanha cada etapa e chama a gente no WhatsApp, sem perder o jeitinho de lanchonete de bairro.' },
];

const VALORES = [
  ['🍔', 'Feito na hora', 'Nada de lanche pronto esperando: a chapa só acende depois do seu pedido.'],
  ['🥬', 'Ingredientes frescos', 'Pão, salada e carne escolhidos todo dia, do jeito que o André compraria para a família.'],
  ['💸', 'Preço justo', 'Sabor de lanchonete de bairro sem pesar no bolso.'],
  ['🛵', 'Entrega rápida', 'Seu lanche chega quente, e você acompanha o pedido pelo app.'],
];

export default function SobreNos({ onPedir }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre Nós</Text>

      <View style={styles.destaque}>
        <Text style={styles.aspas}>“</Text>
        <Text style={styles.frase}>Todo lanche carrega um pedaço da cozinha da minha avó.</Text>
        <Text style={styles.autor}>— André, fundador</Text>
      </View>

      <Text style={styles.secao}>Nossa história</Text>
      {TRAJETORIA.map((etapa, i) => (
        <View key={etapa.titulo} style={styles.etapa}>
          <View style={styles.coluna}>
            <View style={styles.ponto}><Text style={styles.pontoTxt}>{i + 1}</Text></View>
            {i < TRAJETORIA.length - 1 && <View style={styles.linha} />}
          </View>
          <View style={styles.etapaCard}>
            <Text style={styles.etapaTitulo}>{etapa.titulo}</Text>
            <Text style={styles.texto}>{etapa.texto}</Text>
          </View>
        </View>
      ))}

      <View style={styles.missao}>
        <Text style={styles.missaoTitulo}>Nossa missão</Text>
        <Text style={styles.missaoTxt}>
          Transformar a fome em um momento feliz: lanches de verdade, atendimento
          que chama você pelo nome e um cardápio que cabe no bolso de todo mundo.
        </Text>
      </View>

      <Text style={styles.secao}>O que nos diferencia</Text>
      <View style={styles.grade}>
        {VALORES.map(([icone, titulo, texto]) => (
          <View key={titulo} style={styles.valor}>
            <Text style={styles.icone}>{icone}</Text>
            <Text style={styles.valorTitulo}>{titulo}</Text>
            <Text style={styles.valorTxt}>{texto}</Text>
          </View>
        ))}
      </View>

      {onPedir && (
        <TouchableOpacity style={styles.botao} onPress={onPedir} activeOpacity={0.85}>
          <Text style={styles.botaoTxt}>Bateu a fome? Ver cardápio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  titulo: { color: colors.red, fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
  destaque: { backgroundColor: colors.red, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.lg, ...shadow },
  aspas: { color: colors.yellow, fontSize: 56, fontWeight: '900', lineHeight: 50 },
  frase: { color: colors.white, fontSize: 20, fontWeight: '700', lineHeight: 28 },
  autor: { color: colors.yellow, fontWeight: '700', marginTop: spacing.sm },
  secao: { color: colors.red, fontSize: 22, fontWeight: '900', marginBottom: spacing.md, marginTop: spacing.sm },
  etapa: { flexDirection: 'row' },
  coluna: { alignItems: 'center', marginRight: spacing.md },
  ponto: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' },
  pontoTxt: { color: colors.white, fontWeight: '900' },
  linha: { width: 3, flex: 1, backgroundColor: colors.border, marginVertical: 2 },
  etapaCard: { flex: 1, backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadow },
  etapaTitulo: { color: colors.red, fontWeight: '800', fontSize: 16, marginBottom: 4 },
  texto: { color: colors.text, fontSize: 15, lineHeight: 22 },
  missao: { backgroundColor: colors.yellowSoft, borderRadius: radius.md, padding: spacing.md, marginVertical: spacing.md, borderWidth: 1.5, borderColor: colors.border },
  missaoTitulo: { color: colors.red, fontWeight: '900', fontSize: 18, marginBottom: spacing.xs },
  missaoTxt: { color: colors.text, fontSize: 15, lineHeight: 22 },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  valor: { width: '48%', backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadow },
  icone: { fontSize: 30, marginBottom: spacing.xs },
  valorTitulo: { color: colors.red, fontWeight: '800', fontSize: 15, marginBottom: 2 },
  valorTxt: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  botao: { backgroundColor: colors.red, borderRadius: radius.pill, paddingVertical: 14, alignItems: 'center', marginTop: spacing.sm },
  botaoTxt: { color: colors.white, fontWeight: '800', fontSize: 16 },
});
