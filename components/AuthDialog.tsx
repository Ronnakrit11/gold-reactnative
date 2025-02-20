import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type AuthDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AuthDialog({ visible, onClose }: AuthDialogProps) {
  const router = useRouter();

  const handleSignIn = () => {
    onClose();
    router.push('/(auth)/sign-in');
  };

  const handleSignUp = () => {
    onClose();
    router.push('/(auth)/sign-up');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          <View style={styles.content}>
            <Text style={styles.title}>กรุณาเข้าสู่ระบบ</Text>
            <Text style={styles.message}>
              เข้าสู่ระบบหรือสร้างบัญชีใหม่
            </Text>
            
            <View style={styles.buttons}>
              <TouchableOpacity 
                style={[styles.button, styles.signInButton]}
                onPress={handleSignIn}
              >
                <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.signUpButton]}
                onPress={handleSignUp}
              >
                <Text style={styles.buttonText}>สร้างบัญชี</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>ยกเลิก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
  },
  content: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
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
  signUpButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
});