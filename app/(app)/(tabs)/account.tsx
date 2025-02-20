import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

export default function Account() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, setTheme, isDark } = useTheme();

  useEffect(() => {
    fetchUserProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    setUserEmail(user?.email || null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/(auth)/sign-in');
  }

  function handleSignIn() {
    router.replace('/(auth)/sign-in');
  }

  const handleThemeChange = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleSystemTheme = () => {
    setTheme('system');
  };

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, isDark && styles.darkContainer]}>
        <View style={styles.signInContainer}>
          <Text style={[styles.signInTitle, isDark && styles.darkText]}>ยินดีต้อนรับ</Text>
          <Text style={styles.signInMessage}>กรุณาเข้าสู่ระบบเพื่อจัดการบัญชีของคุณ</Text>
          <TouchableOpacity 
            style={[styles.button, styles.signInButton]}
            onPress={handleSignIn}
          >
            <Text style={styles.signInButtonText}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, isDark && styles.darkContainer]}>
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800' }}
          style={styles.profileImage}
        />
        <Text style={[styles.email, isDark && styles.darkText]}>{userEmail}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.darkText]}>ตั้งค่าบัญชี</Text>
        
        <TouchableOpacity style={[styles.menuItem, isDark && styles.darkMenuItem]}>
          <Ionicons name="person-outline" size={24} color="#FFD700" />
          <Text style={[styles.menuText, isDark && styles.darkText]}>แก้ไขโปรไฟล์</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, isDark && styles.darkMenuItem]}>
          <Ionicons name="notifications-outline" size={24} color="#FFD700" />
          <Text style={[styles.menuText, isDark && styles.darkText]}>การแจ้งเตือน</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, isDark && styles.darkMenuItem]}>
          <Ionicons name="shield-outline" size={24} color="#FFD700" />
          <Text style={[styles.menuText, isDark && styles.darkText]}>ความปลอดภัย</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.darkText]}>การตั้งค่า</Text>
        
        <View style={[styles.menuItem, isDark && styles.darkMenuItem]}>
          <Ionicons name="moon-outline" size={24} color="#FFD700" />
          <Text style={[styles.menuText, isDark && styles.darkText]}>โหมดมืด</Text>
          <Switch
            value={isDark}
            onValueChange={handleThemeChange}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDark ? '#FFD700' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity 
          style={[styles.menuItem, isDark && styles.darkMenuItem]}
          onPress={handleSystemTheme}
        >
          <Ionicons name="settings-outline" size={24} color="#FFD700" />
          <Text style={[styles.menuText, isDark && styles.darkText]}>ใช้ธีมระบบ</Text>
          <Text style={[styles.systemThemeText, theme === 'system' && styles.activeSystemTheme]}>
            {theme === 'system' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>ออกจากระบบ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  signInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signInTitle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  darkText: {
    color: '#fff',
  },
  signInMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#FFD700',
  },
  signInButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkHeader: {
    backgroundColor: '#2a2a2a',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  email: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  darkMenuItem: {
    backgroundColor: '#2a2a2a',
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  systemThemeText: {
    fontSize: 14,
    color: '#666',
  },
  activeSystemTheme: {
    color: '#FFD700',
  },
  signOutButton: {
    margin: 20,
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});