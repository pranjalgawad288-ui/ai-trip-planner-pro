-- ============================================
-- AI Trip Planner Pro — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLE: trips
-- ============================================
create table if not exists trips (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  destination text not null,
  duration int not null,
  travelers int not null default 1,
  budget numeric not null default 0,
  travel_style text,
  transport text,
  notes text,
  image_url text,
  ai_itinerary jsonb,
  is_favorite boolean default false,
  status text default 'planned',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- TABLE: destinations (reference data)
-- ============================================
create table if not exists destinations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  country text,
  description text,
  image_url text,
  avg_cost numeric,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE: hotels
-- ============================================
create table if not exists hotels (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references trips(id) on delete cascade,
  name text not null,
  price_per_night numeric,
  rating numeric,
  image_url text,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE: restaurants
-- ============================================
create table if not exists restaurants (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references trips(id) on delete cascade,
  name text not null,
  cuisine text,
  rating numeric,
  price_range text,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE: favorites
-- ============================================
create table if not exists favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  destination_id uuid references destinations(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, destination_id)
);

-- ============================================
-- TABLE: reviews
-- ============================================
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  trip_id uuid references trips(id) on delete cascade,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE: expenses
-- ============================================
create table if not exists expenses (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references trips(id) on delete cascade not null,
  category text not null,
  amount numeric not null,
  note text,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE: notifications
-- ============================================
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- TABLE: settings
-- ============================================
create table if not exists settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text default 'light',
  currency text default 'USD',
  language text default 'en',
  updated_at timestamptz default now()
);

-- ============================================
-- TABLE: ai_history
-- ============================================
create table if not exists ai_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  prompt text,
  response jsonb,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table trips enable row level security;
alter table favorites enable row level security;
alter table reviews enable row level security;
alter table expenses enable row level security;
alter table notifications enable row level security;
alter table settings enable row level security;
alter table ai_history enable row level security;

-- TRIPS policies
create policy "Users can view their own trips"
  on trips for select using (auth.uid() = user_id);
create policy "Users can insert their own trips"
  on trips for insert with check (auth.uid() = user_id);
create policy "Users can update their own trips"
  on trips for update using (auth.uid() = user_id);
create policy "Users can delete their own trips"
  on trips for delete using (auth.uid() = user_id);

-- FAVORITES policies
create policy "Users can manage their own favorites"
  on favorites for all using (auth.uid() = user_id);

-- REVIEWS policies
create policy "Users can manage their own reviews"
  on reviews for all using (auth.uid() = user_id);

-- EXPENSES policies (scoped through trip ownership)
create policy "Users can manage expenses on their own trips"
  on expenses for all using (
    exists (select 1 from trips where trips.id = expenses.trip_id and trips.user_id = auth.uid())
  );

-- NOTIFICATIONS policies
create policy "Users can manage their own notifications"
  on notifications for all using (auth.uid() = user_id);

-- SETTINGS policies
create policy "Users can manage their own settings"
  on settings for all using (auth.uid() = user_id);

-- AI HISTORY policies
create policy "Users can manage their own ai history"
  on ai_history for all using (auth.uid() = user_id);

-- ============================================
-- SAMPLE DATA (destinations reference table — public read)
-- ============================================
insert into destinations (name, country, description, image_url, avg_cost) values
('Bali', 'Indonesia', 'Tropical beaches and vibrant culture', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', 900),
('Santorini', 'Greece', 'Iconic white buildings and sunsets', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', 1300),
('Kyoto', 'Japan', 'Historic temples and gardens', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', 1050),
('Marrakech', 'Morocco', 'Colorful souks and desert adventures', 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25', 750)
on conflict do nothing;

alter table destinations enable row level security;
create policy "Anyone can view destinations"
  on destinations for select using (true);
