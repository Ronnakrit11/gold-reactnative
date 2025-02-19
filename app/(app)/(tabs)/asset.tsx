import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Asset() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio Value</Text>
        <Text style={styles.totalValue}>$25,890.50</Text>
        <Text style={styles.change}>+$1,234.20 (4.8%)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gold Holdings</Text>
        <View style={styles.assetCard}>
          <View style={styles.assetInfo}>
            <View style={styles.assetIcon}>
              <Ionicons name="trending-up" size={24} color="#FFD700" />
            </View>
            <View>
              <Text style={styles.assetName}>Physical Gold</Text>
              <Text style={styles.assetQuantity}>10.5 oz</Text>
            </View>
          </View>
          <View style={styles.assetValue}>
            <Text style={styles.assetPrice}>$19,894.25</Text>
            <Text style={styles.assetChange}>+2.3%</Text>
          </View>
        </View>

        <View style={styles.assetCard}>
          <View style={styles.assetInfo}>
            <View style={styles.assetIcon}>
              <Ionicons name="analytics" size={24} color="#FFD700" />
            </View>
            <View>
              <Text style={styles.assetName}>Gold ETF</Text>
              <Text style={styles.assetQuantity}>25 units</Text>
            </View>
          </View>
          <View style={styles.assetValue}>
            <Text style={styles.assetPrice}>$5,996.25</Text>
            <Text style={styles.assetChange}>+1.8%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance History</Text>
        <View style={styles.performanceCard}>
          <Text style={styles.periodLabel}>1 Month</Text>
          <Text style={styles.performanceValue}>+5.2%</Text>
        </View>
        <View style={styles.performanceCard}>
          <Text style={styles.periodLabel}>3 Months</Text>
          <Text style={styles.performanceValue}>+12.8%</Text>
        </View>
        <View style={styles.performanceCard}>
          <Text style={styles.periodLabel}>1 Year</Text>
          <Text style={styles.performanceValue}>+24.5%</Text>
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
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  change: {
    fontSize: 16,
    color: '#4CAF50',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  assetCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  assetQuantity: {
    color: '#666',
    fontSize: 14,
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  assetChange: {
    color: '#4CAF50',
    fontSize: 14,
  },
  performanceCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodLabel: {
    color: '#666',
    fontSize: 16,
  },
  performanceValue: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});