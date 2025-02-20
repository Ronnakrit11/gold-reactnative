import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

export default function Deposit() {
  const { isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, !isDark && styles.lightContainer]}>
      <View style={[styles.balanceCard, !isDark && styles.lightBalanceCard]}>
        <Text style={[styles.balanceTitle, !isDark && styles.lightText]}>ยอดเงินที่ใช้ได้</Text>
        <Text style={[styles.balanceAmount, !isDark && styles.lightText]}>฿10,000.00</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, !isDark && styles.lightText]}>ฝากเงิน</Text>
        <TextInput
          style={[styles.input, !isDark && styles.lightInput]}
          placeholder="ระบุจำนวนเงิน"
          placeholderTextColor={isDark ? "#666" : "#999"}
          keyboardType="numeric"
        />
        
        <Text style={[styles.label, !isDark && styles.lightText]}>เลือกวิธีการชำระเงิน</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity style={[styles.paymentMethod, !isDark && styles.lightPaymentMethod]}>
            <Ionicons name="card" size={24} color="#FFD700" />
            <Text style={[styles.paymentText, !isDark && styles.lightText]}>บัตรเครดิต</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentMethod, !isDark && styles.lightPaymentMethod]}>
            <Ionicons name="business" size={24} color="#FFD700" />
            <Text style={[styles.paymentText, !isDark && styles.lightText]}>โอนเงิน</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ดำเนินการชำระเงิน</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, !isDark && styles.lightText]}>รายการล่าสุด</Text>
        <View style={[styles.transaction, !isDark && styles.lightTransaction]}>
          <View style={styles.transactionLeft}>
            <Ionicons name="arrow-down" size={24} color="#4CAF50" />
            <View style={styles.transactionInfo}>
              <Text style={[styles.transactionTitle, !isDark && styles.lightText]}>ฝากเงิน</Text>
              <Text style={styles.transactionDate}>2024-02-20 14:30</Text>
            </View>
          </View>
          <Text style={styles.transactionAmount}>+฿5,000.00</Text>
        </View>
        <View style={[styles.transaction, !isDark && styles.lightTransaction]}>
          <View style={styles.transactionLeft}>
            <Ionicons name="arrow-down" size={24} color="#4CAF50" />
            <View style={styles.transactionInfo}>
              <Text style={[styles.transactionTitle, !isDark && styles.lightText]}>ฝากเงิน</Text>
              <Text style={styles.transactionDate}>2024-02-18 09:15</Text>
            </View>
          </View>
          <Text style={styles.transactionAmount}>+฿3,000.00</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  balanceCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  lightBalanceCard: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceTitle: {
    color: '#666',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#000',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  lightInput: {
    backgroundColor: '#ffffff',
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  paymentMethods: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  paymentMethod: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  lightPaymentMethod: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  paymentText: {
    color: '#fff',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 12,
  },
  lightTransaction: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    marginLeft: 12,
  },
  transactionTitle: {
    color: '#fff',
    fontSize: 16,
  },
  transactionDate: {
    color: '#666',
    fontSize: 14,
  },
  transactionAmount: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});