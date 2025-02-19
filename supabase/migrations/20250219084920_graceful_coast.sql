/*
  # Gold Trading Platform Schema

  1. New Tables
    - `profiles`
      - User profiles with balance information
    - `transactions`
      - Record of all deposits and trades
    - `gold_holdings`
      - Current gold holdings for each user
    - `gold_prices`
      - Historical gold price data

  2. Security
    - Enable RLS on all tables
    - Policies for user data access
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  balance decimal(15,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'buy', 'sell')),
  amount decimal(15,2) NOT NULL,
  gold_amount decimal(15,4),
  price_per_oz decimal(15,2),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Gold holdings table
CREATE TABLE IF NOT EXISTS gold_holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  amount decimal(15,4) NOT NULL DEFAULT 0,
  avg_purchase_price decimal(15,2),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gold_holdings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own holdings"
  ON gold_holdings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Gold prices table
CREATE TABLE IF NOT EXISTS gold_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  price decimal(15,2) NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE gold_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gold prices"
  ON gold_prices FOR SELECT
  TO authenticated
  USING (true);

-- Trigger to update profile timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create profile after user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_profile_for_user
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();