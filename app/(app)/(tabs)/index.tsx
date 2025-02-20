import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import AuthDialog from '../../../components/AuthDialog';
import GoldPriceDisplay from '../../../components/GoldPriceDisplay';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

export default function GoldTrade() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [actionType, setActionType] = useState<'buy' | 'sell' | null>(null);
  const router = useRouter();
  const { isDark } = useTheme();

  const data = {
    labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
    datasets: [{
      data: [1890.5, 1892.3, 1891.8, 1893.2, 1895.1, 1894.7],
    }],
  };

  const chartConfig = {
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    backgroundGradientFrom: isDark ? '#1a1a1a' : '#ffffff',
    backgroundGradientTo: isDark ? '#1a1a1a' : '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#ffd700'
    },
    ...(Platform.OS === 'web' ? {
      propsForBackgroundLines: {
        strokeDasharray: '',
      },
      propsForLabels: {
        fontFamily: 'Arial',
      },
    } : {}),
  };

  const handleTradeAction = async (type: 'buy' | 'sell') => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session?.user) {
      setActionType(type);
      setShowAuthDialog(true);
      return;
    }
    
    console.log(`Authenticated user attempting to ${type} gold`);
  };

  return (
    <ScrollView style={[styles.container, !isDark && styles.lightContainer]}>
    

      <GoldPriceDisplay />

      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={true}
          withInnerLines={false}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          fromZero={false}
          segments={4}
          {...(Platform.OS === 'web' ? {
            onTouchStart: () => {},
            onTouchMove: () => {},
          } : {})}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.button, styles.buyButton]}
          onPress={() => handleTradeAction('buy')}
        >
          <Text style={styles.buttonText}>ซื้อ</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.sellButton]}
          onPress={() => handleTradeAction('sell')}
        >
          <Text style={styles.buttonText}>ขาย</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.marketInfo, !isDark && styles.lightMarketInfo]}>
        <Text style={[styles.sectionTitle, !isDark && styles.lightText]}>ข้อมูลตลาด</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, !isDark && styles.lightInfoLabel]}>สูงสุด 24 ชม.</Text>
          <Text style={[styles.infoValue, !isDark && styles.lightText]}>฿32,897.20</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, !isDark && styles.lightInfoLabel]}>ต่ำสุด 24 ชม.</Text>
          <Text style={[styles.infoValue, !isDark && styles.lightText]}>฿32,889.50</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, !isDark && styles.lightInfoLabel]}>ปริมาณ 24 ชม.</Text>
          <Text style={[styles.infoValue, !isDark && styles.lightText]}>1,234.5 บาท</Text>
        </View>
      </View>

      <AuthDialog 
        visible={showAuthDialog} 
        onClose={() => {
          setShowAuthDialog(false);
          setActionType(null);
        }}
      />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  lightText: {
    color: '#000',
  },
  chartContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
  },
  sellButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marketInfo: {
    padding: 20,
    backgroundColor: '#2a2a2a',
    margin: 16,
    borderRadius: 12,
  },
  lightMarketInfo: {
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#666',
    fontSize: 16,
  },
  lightInfoLabel: {
    color: '#666',
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
  },
});