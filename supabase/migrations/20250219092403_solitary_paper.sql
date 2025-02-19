/*
  # Add Insert Policies

  1. Changes
    - Add INSERT policies for profiles table
    - Add INSERT policies for gold_holdings table
    - Add INSERT policies for transactions table

  2. Security
    - Enable inserting into profiles for authenticated users
    - Enable inserting into gold_holdings for authenticated users
    - Enable inserting into transactions for authenticated users
*/

-- Add INSERT policy for profiles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON profiles FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Add INSERT policy for gold_holdings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gold_holdings' AND policyname = 'Users can insert own holdings'
  ) THEN
    CREATE POLICY "Users can insert own holdings"
      ON gold_holdings FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Add INSERT policy for transactions
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'transactions' AND policyname = 'Users can insert own transactions'
  ) THEN
    CREATE POLICY "Users can insert own transactions"
      ON transactions FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;