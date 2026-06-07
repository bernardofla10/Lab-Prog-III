import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function ActionButton({ title, color, onPress }) {
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function Contador({ name, count, onCount, onReset }) {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>{name}: {count}</Text>

      <View style={styles.buttonRow}>
        <ActionButton title="CONTAR" color="#43a047" onPress={onCount} />
        <ActionButton title="ZERAR" color="#f44336" onPress={onReset} />
      </View>
    </View>
  );
}

export default function App() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const total = countA + countB;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.total}>Soma total: {total}</Text>

        <Contador
          name="Contador A"
          count={countA}
          onCount={() => setCountA((currentCount) => currentCount + 1)}
          onReset={() => setCountA(0)}
        />

        <Contador
          name="Contador B"
          count={countB}
          onCount={() => setCountB((currentCount) => currentCount + 1)}
          onReset={() => setCountB(0)}
        />
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
    paddingHorizontal: 12,
  },
  total: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  counterContainer: {
    width: '100%',
    marginBottom: 18,
  },
  counterText: {
    marginBottom: 8,
    fontSize: 16,
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 38,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
