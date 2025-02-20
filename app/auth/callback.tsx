import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Callback() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Successfully authenticated, redirect to the app
        router.replace('/(app)/(tabs)/');
      } else {
        // If no session, go back to sign in
        router.replace('/(auth)/sign-in');
      }
    });
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Completing sign in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});