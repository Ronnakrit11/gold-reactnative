import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Deposit() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Available Balance</Text>
        <Text style={styles.balanceAmount}>$10,000.00</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deposit Funds</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Select Payment Method</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity style={styles.paymentMethod}>
            <Ionicons name="card" size={24} color="#FFD700" />
            <Text style={styles.paymentText}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentMethod}>
            <Ionicons name="business" size={24} color="#FFD700" />
            <Text style={styles.paymentText}>Bank Transfer</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transaction}>
          <View style={styles.transactionLeft}>
            <Ionicons name="arrow-down" size={24} color="#4CAF50" />
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Deposit</Text>
              <Text style={styles.transactionDate}>2024-02-20 14:30</Text>
            </View>
          </View>
          <Text style={styles.transactionAmount}>+$5,000.00</Text>
        </View>
        <View style={styles.transaction}>
          <View style={styles.transactionLeft}>
            <Ionicons name="arrow-down" size={24} color="#4CAF50" />
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Deposit</Text>
              <Text style={styles.transactionDate}>2024-02-18 09:15</Text>
            </View>
          </View>
          <Text style={styles.transactionAmount}>+$3,000.00</Text>
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
  balanceCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
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
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  paymentMethods: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paymentMethod: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
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