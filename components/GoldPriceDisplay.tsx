import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

type GoldPriceData = {
  name: string;
  bid: string;
  ask: string;
  diff: string;
};

export default function GoldPriceDisplay() {
  const [priceData, setPriceData] = useState<GoldPriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: string | undefined) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fetchGoldPrices = async () => {
    try {
      // Using a CORS proxy to bypass CORS restrictions
      const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('http://www.thaigold.info/RealTimeDataV2/gtdata_.txt'));
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Invalid data format');
      }

      // Find the สมาคมฯ data
      const goldData = Array.isArray(data) ? 
        data.find((item: any) => item.name === "สมาคมฯ") :
        (data.name === "สมาคมฯ" ? data : null);

      if (!goldData) {
        throw new Error('Gold price data not found');
      }

      setPriceData({
        name: goldData.name,
        bid: goldData.bid,
        ask: goldData.ask,
        diff: goldData.diff
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching gold prices:', err);
      setError('ไม่สามารถดึงข้อมูลราคาทองได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldPrices();
    const interval = setInterval(fetchGoldPrices, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (error || !priceData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error || 'ไม่พบข้อมูลราคาทอง'}</Text>
      </View>
    );
  }

  const diffValue = parseInt(priceData.diff || '0');
  const diffColor = diffValue > 0 ? '#4CAF50' : diffValue < 0 ? '#f44336' : '#666';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ราคาทองวันนี้</Text>
      
      <View style={styles.priceRow}>
        <View style={styles.priceInfo}>
          <Text style={styles.label}>รับซื้อคืน</Text>
          <Text style={styles.price}>{formatPrice(priceData.bid)}</Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.priceInfo}>
          <Text style={styles.label}>ขายออก</Text>
          <Text style={styles.price}>{formatPrice(priceData.ask)}</Text>
        </View>
      </View>

      <View style={styles.diffContainer}>
        <Text style={styles.diffLabel}>เปลี่ยนแปลง</Text>
        <Text style={[styles.diffValue, { color: diffColor }]}>
          {diffValue > 0 ? '+' : ''}{priceData.diff}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceInfo: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#444',
    marginHorizontal: 16,
  },
  label: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  diffContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  diffLabel: {
    fontSize: 16,
    color: '#999',
    marginRight: 8,
  },
  diffValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
    fontSize: 16,
  },
});