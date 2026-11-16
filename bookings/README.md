# Base Bush Lounge staff system

Staff-only workspace at https://basebushlounge.com/bookings/ — Home, Bookings (calendar) and Quotes.

- Database: Supabase project "Base Bush Lounge Bookings" (`aovthooybcksflcxvphw`)
- Double bookings are blocked by the database (`no_double_booking` on `bookings`): same area
  (or Entire venue) + overlapping dates + overlapping session. Only Quoted and Confirmed bookings hold a date.
- Quotes (`quotes` table, numbered BBL-Q1108 onwards) each keep one linked calendar booking in step:
  Draft → Inquired, Sent → Quoted, Confirmed → Confirmed, Declined → Cancelled. Changing the linked
  booking's status or dates on the calendar updates the quote too. Totals are computed in the database.
- Invoices (`invoices`, BBL-INV1001 onwards) are created from confirmed quotes via `create_invoice()`. `amend_invoice()`
  issues the next revision under the same number and marks the old one superseded; the booking total follows the latest revision.
  Payments are recorded as "Paid to date" on the booking.
- `price_list` feeds the quote editor; managers edit it from the Quotes page.
- Only emails in the `staff` table can see or change data. Managers add staff from the Home page.
- The key in `index.html` is Supabase's publishable key; row-level security restricts all data to staff.
