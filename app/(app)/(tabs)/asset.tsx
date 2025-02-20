import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

export default function Asset() {
  const { isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, !isDark && styles.lightContainer]}>
      <View style={[styles.header, !isDark && styles.lightHeader]}>
        <Text style={[styles.title, !isDark && styles.lightText]}>มูลค่าพอร์ตโฟลิโอ</Text>
        <Text style={[styles.totalValue, !isDark && styles.lightText]}>฿825,890.50</Text>
        <Text style={styles.change}>+฿41,234.20 (4.8%)</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, !isDark && styles.lightText]}>ทองคำที่ถือครอง</Text>
        <View style={[styles.assetCard, !isDark && styles.lightAssetCard]}>
          <View style={styles.assetInfo}>
            <View style={[styles.assetIcon, !isDark && styles.lightAssetIcon]}>
              <Ionicons name="trending-up" size={24} color="#FFD700" />
            </View>
            <View>
              <Text style={[styles.assetName, !isDark && styles.lightText]}>ทองคำแท่ง</Text>
              <Text style={styles.assetQuantity}>10.5 บาท</Text>
            </View>
          </View>
          <View style={styles.assetValue}>
            <Text style={[styles.assetPrice, !isDark && styles.lightText]}>฿619,894.25</Text>
            <Text style={styles.assetChange}>+2.3%</Text>
          </View>
        </View>

        <View style={[styles.assetCard, !isDark && styles.lightAssetCard]}>
          <View style={styles.assetInfo}>
            <View style={[styles.assetIcon, !isDark && styles.lightAssetIcon]}>
              <Ionicons name="analytics" size={24} color="#FFD700" />
            </View>
            <View>
              <Text style={[styles.assetName, !isDark && styles.lightText]}>กองทุนทองคำ</Text>
              <Text style={styles.assetQuantity}>25 หน่วย</Text>
            </View>
          </View>
          <View style={styles.assetValue}>
            <Text style={[styles.assetPrice, !isDark && styles.lightText]}>฿205,996.25</Text>
            <Text style={styles.assetChange}>+1.8%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, !isDark && styles.lightText]}>ผลการดำเนินงาน</Text>
        <View style={[styles.performanceCard, !isDark && styles.lightPerformanceCard]}>
          <Text style={[styles.periodLabel, !isDark && styles.lightPeriodLabel]}>1 เดือน</Text>
          <Text style={styles.performanceValue}>+5.2%</Text>
        </View>
        <View style={[styles.performanceCard, !isDark && styles.lightPerformanceCard]}>
          <Text style={[styles.periodLabel, !isDark && styles.lightPeriodLabel]}>3 เดือน</Text>
          <Text style={styles.performanceValue}>+12.8%</Text>
        </View>
        <View style={[styles.performanceCard, !isDark && styles.lightPerformanceCard]}>
          <Text style={[styles.periodLabel, !isDark && styles.lightPeriodLabel]}>1 ปี</Text>
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
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  lightHeader: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  lightText: {
    color: '#000',
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
  lightAssetCard: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  lightAssetIcon: {
    backgroundColor: '#f5f5f5',
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
  lightPerformanceCard: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodLabel: {
    color: '#666',
    fontSize: 16,
  },
  lightPeriodLabel: {
    color: '#666',
  },
  performanceValue: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});