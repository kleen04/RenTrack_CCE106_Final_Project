import { colors } from '../theme';

export const initialFleet = [
  { id:'QR-TRK-001', make:'Toyota', model:'Fortuner', year:'2024', kind:'SUV', rate:4200, status:'Available', plate:'NCR 8246', image:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=82', condition:{mileage:'18,240 km',fuel:'75%',exterior:'Excellent',interior:'Excellent',mechanical:'Passed',serviceDate:'Aug 18, 2026',damage:'No visible damage',notes:'Freshly detailed and ready for dispatch.'} },
  { id:'QR-TRK-002', make:'Ford', model:'Ranger Wildtrak', year:'2023', kind:'Pickup', rate:4600, status:'Rented', plate:'NCR 1973', image:'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=800&q=82', condition:{mileage:'42,810 km',fuel:'40%',exterior:'Good',interior:'Good',mechanical:'Passed',serviceDate:'Jul 30, 2026',damage:'Minor rear bumper scuff',notes:'Inspect bumper after current rental.'} },
  { id:'QR-TRK-003', make:'Honda', model:'City', year:'2024', kind:'Sedan', rate:2500, status:'Reserved', plate:'NCR 5638', image:'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=82' },
  { id:'QR-TRK-004', make:'Mitsubishi', model:'Xpander', year:'2023', kind:'MPV', rate:3300, status:'Available', plate:'NCR 4408', image:'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=82' },
  { id:'QR-TRK-005', make:'Nissan', model:'Almera', year:'2024', kind:'Sedan', rate:2300, status:'Available', plate:'NCR 7210', image:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=82' },
  { id:'QR-TRK-006', make:'Hyundai', model:'Tucson', year:'2024', kind:'SUV', rate:3900, status:'Unavailable', plate:'NCR 9921', image:'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=82' },
  { id:'QR-TRK-007', make:'Yamaha', model:'NMAX 155', year:'2025', kind:'Motorcycle', rate:950, status:'Available', plate:'MC 4721', image:'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=82', condition:{mileage:'6,420 km',fuel:'90%',exterior:'Excellent',interior:'Excellent',mechanical:'Passed',serviceDate:'Sep 2, 2026',damage:'No visible damage',notes:'Helmet and rain cover included.'} },
  { id:'QR-TRK-008', make:'Honda', model:'Click 160', year:'2024', kind:'Motorcycle', rate:850, status:'Available', plate:'MC 8390', image:'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=82', condition:{mileage:'9,115 km',fuel:'65%',exterior:'Good',interior:'Good',mechanical:'Passed',serviceDate:'Aug 11, 2026',damage:'Small left fairing scratch',notes:'Helmet included. Check tire pressure before release.'} },
];
export const initialBookings = [
  { id:'RT-2409', carId:'QR-TRK-003', customer:'Mia Santos', initials:'MS', dates:'Today, 10:00 AM - Sep 20', status:'Confirmed', total:7500 },
  { id:'RT-2410', carId:'QR-TRK-001', customer:'Marco Reyes', initials:'MR', dates:'Sep 21 - Sep 24', status:'Upcoming', total:16800 },
];
export const initialCustomers = [
  { name:'Mia Santos', initials:'MS', rentals:4, phone:'+63 917 555 0182', tone:colors.orange },
  { name:'Marco Reyes', initials:'MR', rentals:2, phone:'+63 918 832 4410', tone:colors.blue },
  { name:'Andrea Lim', initials:'AL', rentals:7, phone:'+63 917 120 9045', tone:colors.lime },
  { name:'Paolo Cruz', initials:'PC', rentals:1, phone:'+63 905 877 2091', tone:'#D29EFF' },
];
export const initialHistory = [
  { id:'H-01', text:'Ford Ranger Wildtrak checked out', time:'Today, 8:42 AM', type:'OUT' },
  { id:'H-02', text:'Toyota Fortuner reservation confirmed', time:'Yesterday, 5:20 PM', type:'BOOKED' },
];
