# Base Bush Lounge Bookings

Staff-only booking calendar at https://basebushlounge.com/bookings/

- Database: Supabase project "Base Bush Lounge Bookings" (`aovthooybcksflcxvphw`)
- Double bookings are blocked by the database (`no_double_booking` constraint on `bookings`):
  same area (or Entire venue) + overlapping dates + overlapping session. Cancelled bookings don't block.
- Only emails in the `staff` table can see or change data. Managers add staff from the page.
- The key in `index.html` is Supabase's publishable key; it is safe to be public because
  row-level security restricts all data to staff.
