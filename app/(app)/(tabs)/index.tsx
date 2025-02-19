import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import AuthDialog from '../../../components/AuthDialog';

const screenWidth = Dimensions.get('window').width;

export default function GoldTrade() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [actionType, setActionType] = useState<'buy' | 'sell' | null>(null);

  const data = {
    labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
    datasets: [{
      data: [1890.5, 1892.3, 1891.8, 1893.2, 1895.1, 1894.7],
    }],
  };

  const chartConfig = {
    backgroundColor: '#1a1a1a',
    backgroundGradientFrom: '#1a1a1a',
    backgroundGradientTo: '#1a1a1a',
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
    // Web-specific configuration
    ...(Platform.OS === 'web' ? {
      propsForBackgroundLines: {
        strokeDasharray: '', // Remove dashed lines on web
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
    
    // Handle trade action for authenticated users
    console.log(`Authenticated user attempting to ${type} gold`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gold Price</Text>
        <Text style={styles.price}>$1,894.70</Text>
        <Text style={styles.change}>+$2.90 (+0.15%)</Text>
      </View>

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
          // Disable touch events on web
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
          <Text style={styles.buttonText}>Buy Gold</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.sellButton]}
          onPress={() => handleTradeAction('sell')}
        >
          <Text style={styles.buttonText}>Sell Gold</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.marketInfo}>
        <Text style={styles.sectionTitle}>Market Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>24h High</Text>
          <Text style={styles.infoValue}>$1,897.20</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>24h Low</Text>
          <Text style={styles.infoValue}>$1,889.50</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>24h Volume</Text>
          <Text style={styles.infoValue}>1,234.5 oz</Text>
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  change: {
    fontSize: 16,
    color: '#4CAF50',
  },
  chartContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
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
  infoValue: {
    color: '#fff',
    fontSize: 16,
  },
});