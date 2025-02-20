import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Text, View, StyleSheet } from 'react-native';

function UserEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchUserEmail();
  }, []);

  async function fetchUserEmail() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      setEmail(user.email);
    }
  }

  if (!email) return null;

  return (
    <View style={styles.emailContainer}>
      <Text style={styles.emailText}>{email}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#666',
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerRight: () => <UserEmail />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Aurienn',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deposit"
        options={{
          title: 'Deposit',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="asset"
        options={{
          title: 'Asset',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  emailContainer: {
    marginRight: 16,
  },
  emailText: {
    color: '#FFD700',
    fontSize: 14,
  },
});