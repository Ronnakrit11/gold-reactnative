import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

// Required for Google Sign In
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the redirect URL for the current platform
  const redirectUrl = makeRedirectUri({
    path: 'auth/callback',
  });

  async function signIn() {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.replace('/(app)/(tabs)/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      
      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

        if (result.type === 'success') {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) throw sessionError;
          if (session) {
            router.replace('/(app)/(tabs)/');
          }
        }
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2a2a2a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Gold Trading Platform</Text>
        
        {error && <Text style={styles.error}>{error}</Text>}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          editable={!loading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={signIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.socialButton, loading && styles.buttonDisabled]}
          onPress={signInWithGoogle}
          disabled={loading}
        >
          <Ionicons name="logo-google" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/(auth)/sign-up')}
          style={styles.link}
          disabled={loading}
        >
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4444',
    marginBottom: 12,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#FFD700',
    fontSize: 14,
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});