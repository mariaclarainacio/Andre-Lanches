import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

const DIFERENCIAIS = [
  ['🍔', 'Feito na hora', 'Cada lanche é montado depois do seu pedido, quentinho e fresco.'],
  ['💸', 'Preço justo', 'Sabor de lanchonete de bairro sem pesar no bolso.'],
  ['🛵', 'Entrega rápida', 'Um telefonema e o lanche chega na sua casa.'],
];

export default function SobreNos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre Nós</Text>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Nossa história</Text>
        <Text style={styles.texto}>
          Tudo começou em uma chapa pequena e muita vontade de agradar. O André
          preparava lanches para os amigos do bairro e, entre uma conversa e
          outra, a fila na porta virou rotina. Hoje o André Lanches é ponto de
          encontro de quem busca um hambúrguer de verdade, com cheiro de casa.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Missão</Text>
        <Text style={styles.texto}>
          Levar felicidade em forma de lanche: ingredientes frescos, atendimento
          simpático e um cardápio que cabe no bolso de todo mundo.
        </Text>
      </View>

      <Text style={[styles.subtitulo, styles.tituloDif]}>Nossos diferenciais</Text>
      {DIFERENCIAIS.map(([icone, titulo, texto]) => (
        <View key={titulo} style={styles.difLinha}>
          <Text style={styles.icone}>{icone}</Text>
          <View style={styles.difTextos}>
            <Text style={styles.difTitulo}>{titulo}</Text>
            <Text style={styles.texto}>{texto}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  titulo: { color: colors.red, fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadow },
  subtitulo: { color: colors.red, fontSize: 20, fontWeight: '800', marginBottom: spacing.sm },
  tituloDif: { marginTop: spacing.sm },
  texto: { color: colors.text, fontSize: 15, lineHeight: 22 },
  difLinha: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.yellowSoft,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  icone: { fontSize: 32, marginRight: spacing.md },
  difTextos: { flex: 1 },
  difTitulo: { color: colors.red, fontWeight: '800', fontSize: 16, marginBottom: 2 },
});
