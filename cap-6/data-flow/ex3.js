// Crie o aplicativo ao lado que mostra dois contadores
// Inclua os componentes Text (título e número) e um Button para cada contador
// O valor do contador deve ser salvo no estado de cada componente

import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

function Contador({ name }) { // componente reutilizável: cada contador terá seu próprio estado interno. Recebe 1 prop (name).
  const [count, setCount] = useState(0); // estado local deste contador específico.
  // em ex1.js há apenas 1 contador e em ex2.js há apenas 1 formulário/cálculo só, então colocamos diretamente em App.
  // em ex3.js, como há dois contadores iguais, criamos o componente Contador para reutilizar.

  function handleCount() { // função executada ao pressionar o botão deste contador.
    setCount((currentCount) => currentCount + 1);
  }

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>Nome {name}: {count}</Text>
      <Button title="CONTAR" onPress={handleCount} />
    </View>
  );
}

export default function App() { // componente principal do aplicativo.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Contador name="Contador 1" />
        <Contador name="Contador 2" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  counterContainer: {
    width: '100%',
    marginBottom: 8,
  },
  counterText: {
    marginBottom: 4,
    fontSize: 14,
    color: '#222',
  },
});
