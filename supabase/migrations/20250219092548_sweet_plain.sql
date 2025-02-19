/*
  # Add Update Policies

  1. Changes
    - Add UPDATE policies for gold_holdings table
    - Add UPDATE policies for profiles table for balance updates

  2. Security
    - Enable updating gold holdings for authenticated users
    - Enable updating profile balance for authenticated users
*/

-- Add UPDATE policy for gold_holdings
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gold_holdings' AND policyname = 'Users can update own holdings'
  ) THEN
    CREATE POLICY "Users can update own holdings"
      ON gold_holdings FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Add UPDATE policy for profiles balance
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update own balance'
  ) THEN
    CREATE POLICY "Users can update own balance"
      ON profiles FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;