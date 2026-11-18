import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviar = () => {
    if (!nome.trim() || !contato.trim() || !mensagem.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail/WhatsApp e mensagem.');
      return;
    }
    Alert.alert('Mensagem enviada!', `Obrigado, ${nome.trim()}! Recebemos sua mensagem e responderemos em breve.`);
    setNome('');
    setContato('');
    setMensagem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contato</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          placeholderTextColor={colors.muted}
        />

        <Text style={styles.label}>E-mail ou WhatsApp</Text>
        <TextInput
          style={styles.input}
          value={contato}
          onChangeText={setContato}
          placeholder="voce@email.com ou (11) 90000-0000"
          placeholderTextColor={colors.muted}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mensagem</Text>
        <TextInput
          style={[styles.input, styles.inputMulti]}
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Escreva sua mensagem"
          placeholderTextColor={colors.muted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.botao} onPress={enviar} activeOpacity={0.8}>
          <Text style={styles.botaoTexto}>Enviar mensagem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  titulo: { color: colors.red, fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: spacing.md },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, ...shadow },
  label: { color: colors.red, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.sm },
  input: {
    borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 10, fontSize: 15,
    color: colors.text, backgroundColor: colors.yellowSoft,
  },
  inputMulti: { minHeight: 100 },
  botao: { backgroundColor: colors.red, borderRadius: radius.pill, paddingVertical: 14, alignItems: 'center', marginTop: spacing.lg },
  botaoTexto: { color: colors.white, fontWeight: '800', fontSize: 16 },
});
