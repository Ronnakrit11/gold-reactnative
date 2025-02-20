import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

function UserEmail() {
  const [email, setEmail] = useState<string | null>(null);
  const { isDark } = useTheme();

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
      <Text style={[styles.emailText, !isDark && styles.lightEmailText]}>{email}</Text>
    </View>
  );
}

export default function TabLayout() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          borderTopColor: isDark ? '#333' : '#e0e0e0',
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: isDark ? '#666' : '#999',
        headerStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: isDark ? '#fff' : '#000',
        headerRight: () => <UserEmail />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ซื้อขาย',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deposit"
        options={{
          title: 'ฝากเงิน',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="asset"
        options={{
          title: 'สินทรัพย์',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'บัญชี',
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
  lightEmailText: {
    color: '#000',
  },
});