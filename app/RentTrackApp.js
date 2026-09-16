import { useMemo, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initialBookings, initialCustomers, initialFleet, initialHistory } from './data/fleet';
import { colors, getInitials } from './theme';
import BottomNavigation from './components/BottomNavigation';
import { CustomerSheet, ReservationSheet, VehicleFormSheet, VehicleSheet } from './components/Sheets';
import GarageScreen from './screens/GarageScreen';
import BookingsScreen from './screens/BookingsScreen';
import ScanScreen from './screens/ScanScreen';
import CustomersScreen from './screens/CustomersScreen';
import ReportsScreen from './screens/ReportsScreen';

export default function RentTrackApp() {
  const [tab,setTab]=useState('Garage');
  const [cars,setCars]=useState(initialFleet);
  const [bookings,setBookings]=useState(initialBookings);
  const [customers,setCustomers]=useState(initialCustomers);
  const [history,setHistory]=useState(initialHistory);
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(null);
  const [sheet,setSheet]=useState('');
  const [toast,setToast]=useState('');
  const [scanMode,setScanMode]=useState('Check-out');
  const visibleCars=useMemo(()=>cars.filter(car=>(filter==='All'||car.status===filter)&&(car.make+' '+car.model).toLowerCase().includes(query.toLowerCase())),[cars,filter,query]);
  const notify=message=>{setToast(message);setTimeout(()=>setToast(''),2600)};
  const fallbackImage='https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=82';
  const openReservation=()=>{const car=cars.find(item=>item.status==='Available');if(car){setSelected(car);setSheet('reservation')}};
  const openAddVehicle=()=>{setSelected(null);setSheet('vehicle')};
  const saveVehicle=data=>{
    const make=data.make.trim(),model=data.model.trim(),plate=data.plate.trim().toUpperCase(),rate=Number(data.rate);
    if(!make||!model||!plate||!Number.isFinite(rate)||rate<=0) return Alert.alert('Complete vehicle details','Brand, model, plate number, and a valid daily rate are required.');
    const duplicate=cars.find(car=>car.plate.toUpperCase()===plate&&car.id!==selected?.id);
    if(duplicate) return Alert.alert('Duplicate plate number',plate+' is already assigned to '+duplicate.make+' '+duplicate.model+'.');
    const saved={id:selected?.id||'QR-TRK-'+String(Date.now()).slice(-6),make,model,year:data.year.trim()||'2024',kind:data.kind||'Vehicle',rate,status:data.status,plate,image:data.image.trim()||selected?.image||fallbackImage,condition:data.condition||selected?.condition||{}};
    if(selected){setCars(items=>items.map(car=>car.id===selected.id?saved:car));setHistory(items=>[{id:'H-'+Date.now(),text:saved.make+' '+saved.model+' vehicle record updated',time:'Just now',type:'EDIT'},...items]);notify(saved.make+' updated')}else{setCars(items=>[saved,...items]);setHistory(items=>[{id:'H-'+Date.now(),text:saved.make+' '+saved.model+' added to fleet',time:'Just now',type:'NEW'},...items]);notify(saved.make+' added to fleet')}
    setSelected(null);setSheet('');
  };
  const removeSelected=()=>{
    if(!selected) return;
    const linkedBooking=bookings.some(item=>item.carId===selected.id&&['Confirmed','Upcoming'].includes(item.status));
    if(selected.status==='Rented'||selected.status==='Reserved'||linkedBooking) return Alert.alert('Vehicle cannot be removed','Check in or cancel its active reservation before removing this vehicle.');
    Alert.alert('Remove vehicle','Remove '+selected.make+' '+selected.model+' from the fleet?',[{text:'Cancel',style:'cancel'},{text:'Remove',style:'destructive',onPress:()=>{setCars(items=>items.filter(item=>item.id!==selected.id));setHistory(items=>[{id:'H-'+Date.now(),text:selected.make+' '+selected.model+' removed from fleet',time:'Just now',type:'REMOVE'},...items]);notify(selected.make+' removed from fleet');setSelected(null)}}]);
  };
  const saveReservation=(name,days)=>{
    if(!name.trim()) return Alert.alert('Customer required','Enter a customer name to create this booking.');
    if(selected.status!=='Available') return Alert.alert('Schedule conflict',selected.make+' '+selected.model+' is '+selected.status.toLowerCase()+' and cannot be booked.');
    const customer=name.trim(), rentalDays=Math.max(1,Number(days||1)), id='RT-'+(2411+bookings.length), start=new Date(), end=new Date(start);
    end.setDate(start.getDate()+rentalDays);
    const dateLabel=date=>date.toLocaleDateString('en-US',{month:'short',day:'numeric'});
    setBookings(items=>[{id,carId:selected.id,customer,initials:getInitials(customer),dates:dateLabel(start)+' - '+dateLabel(end),status:'Upcoming',total:selected.rate*rentalDays},...items]);
    setCars(items=>items.map(car=>car.id===selected.id?{...car,status:'Reserved'}:car));
    setHistory(items=>[{id:'H-'+Date.now(),text:selected.make+' '+selected.model+' reservation confirmed',time:'Just now',type:'BOOKED'},...items]);
    if(!customers.some(item=>item.name.toLowerCase()===customer.toLowerCase())) setCustomers(items=>[{name:customer,initials:getInitials(customer),rentals:0,phone:'New customer',tone:colors.lime},...items]);
    setSelected(null);setSheet('');notify('Reservation '+id+' confirmed');
  };
  const updateBooking=(booking,action)=>{
    const car=cars.find(item=>item.id===booking.carId);
    if(!car) return;
    if(action==='cancel'){
      setBookings(items=>items.map(item=>item.id===booking.id?{...item,status:'Cancelled'}:item));
      if(car.status==='Reserved') setCars(items=>items.map(item=>item.id===car.id?{...item,status:'Available'}:item));
      notify(booking.id+' cancelled');
    } else if(action==='checkout'){
      if(!['Reserved','Available'].includes(car.status)) return Alert.alert('Vehicle unavailable',car.make+' '+car.model+' is '+car.status.toLowerCase()+'.');
      setBookings(items=>items.map(item=>item.id===booking.id?{...item,status:'Active'}:item));
      setCars(items=>items.map(item=>item.id===car.id?{...item,status:'Rented'}:item));
      notify(booking.id+' checked out');
    } else if(action==='complete'){
      setBookings(items=>items.map(item=>item.id===booking.id?{...item,status:'Completed'}:item));
      setCars(items=>items.map(item=>item.id===car.id?{...item,status:'Available'}:item));
      notify(booking.id+' completed');
    }
  };
  const handoff=code=>{
    const car=cars.find(item=>item.id===code)||cars[0];
    if(scanMode==='Check-out'){
      if(!['Available','Reserved'].includes(car.status)) return Alert.alert('Vehicle unavailable',car.make+' '+car.model+' is '+car.status.toLowerCase()+'.');
      setCars(items=>items.map(item=>item.id===car.id?{...item,status:'Rented'}:item));
      setBookings(items=>items.map(item=>item.carId===car.id&&['Confirmed','Upcoming'].includes(item.status)?{...item,status:'Active'}:item));
      setHistory(items=>[{id:'H-'+Date.now(),text:car.make+' '+car.model+' checked out',time:'Just now',type:'OUT'},...items]);
      notify(car.make+' '+car.model+' checked out');
    } else {
      if(car.status!=='Rented') return Alert.alert('No active rental',car.make+' '+car.model+' is not currently checked out.');
      setCars(items=>items.map(item=>item.id===car.id?{...item,status:'Available'}:item));
      setBookings(items=>items.map(item=>item.carId===car.id&&item.status==='Active'?{...item,status:'Completed'}:item));
      setHistory(items=>[{id:'H-'+Date.now(),text:car.make+' '+car.model+' checked in',time:'Just now',type:'IN'},...items]);
      notify(car.make+' '+car.model+' checked in');
    }
  };
  const checkOutSelected=()=>{if(!['Available','Reserved'].includes(selected.status)) return Alert.alert('Vehicle unavailable',selected.make+' '+selected.model+' is '+selected.status.toLowerCase()+'.');setCars(items=>items.map(item=>item.id===selected.id?{...item,status:'Rented'}:item));setBookings(items=>items.map(item=>item.carId===selected.id&&['Confirmed','Upcoming'].includes(item.status)?{...item,status:'Active'}:item));setHistory(items=>[{id:'H-'+Date.now(),text:selected.make+' '+selected.model+' checked out',time:'Just now',type:'OUT'},...items]);notify(selected.make+' moved to active rentals');setSelected(null)};
  return <SafeAreaView style={s.safe}><StatusBar style="light"/><View style={s.app}>
    {tab==='Garage'&&<GarageScreen cars={visibleCars} fleet={cars} filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} onVehicle={setSelected} onNew={openReservation} onAddVehicle={openAddVehicle}/>}
    {tab==='Bookings'&&<BookingsScreen bookings={bookings} cars={cars} onNew={openReservation} onBookingAction={updateBooking}/>}
    {tab==='Scan'&&<ScanScreen mode={scanMode} setMode={setScanMode} onScan={handoff}/>}
    {tab==='Customers'&&<CustomersScreen customers={customers} onAdd={()=>setSheet('customer')}/>}
    {tab==='Reports'&&<ReportsScreen cars={cars} bookings={bookings} history={history}/>}
    <BottomNavigation current={tab} onChange={setTab}/>{!!toast&&<View style={s.toast}><Text style={s.toastText}>OK  {toast}</Text></View>}
  </View>
  <VehicleSheet car={selected} visible={!!selected&&!sheet} onClose={()=>setSelected(null)} onReserve={()=>setSheet('reservation')} onRent={checkOutSelected} onEdit={()=>setSheet('vehicle')} onRemove={removeSelected}/>
  <ReservationSheet car={selected} visible={sheet==='reservation'} onClose={()=>{setSheet('');setSelected(null)}} onSave={saveReservation}/>
  <VehicleFormSheet vehicle={selected} visible={sheet==='vehicle'} onClose={()=>{setSheet('');setSelected(null)}} onSave={saveVehicle}/>
  <CustomerSheet visible={sheet==='customer'} onClose={()=>setSheet('')} onSave={(name,phone)=>{if(!name.trim())return;setCustomers(items=>[{name:name.trim(),initials:getInitials(name),rentals:0,phone:phone||'No phone provided',tone:colors.lime},...items]);setSheet('');notify('Customer profile added')}}/>
  </SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:colors.bg},app:{flex:1,backgroundColor:colors.bg},toast:{position:'absolute',bottom:93,alignSelf:'center',maxWidth:'88%',backgroundColor:colors.lime,borderRadius:10,paddingVertical:11,paddingHorizontal:15,elevation:5},toastText:{color:colors.dark,fontSize:11,fontWeight:'900'}});
