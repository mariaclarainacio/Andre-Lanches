import { Alert, Platform } from 'react-native';

// Alert.alert não funciona no navegador (react-native-web), então usamos window.alert na web.
export function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export const formatarDataHora = (data) => {
  const p = (n) => String(n).padStart(2, '0');
  return `${p(data.getDate())}/${p(data.getMonth() + 1)} às ${p(data.getHours())}:${p(data.getMinutes())}`;
};
