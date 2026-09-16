import { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { colors, money } from '../theme';
import { PrimaryButton, StatusPill } from './UI';

export function VehicleSheet({ car, visible, onClose, onReserve, onRent, onEdit, onRemove }) {
  if (!car) return null;
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><View style={s.backdrop}><View style={s.vehicleSheet}>
    <View style={s.handle}/><Pressable onPress={onClose} style={s.close}><Text style={s.closeText}>x</Text></Pressable>
    <Image source={{uri:car.image}} style={s.vehicleImage}/>
    <View style={s.vehicleBody}><Text style={s.eyebrow}>{car.kind.toUpperCase()} / {car.year}</Text>
      <View style={s.vehicleTitle}><View style={s.vehicleTitleCopy}><Text style={s.make}>{car.make.toUpperCase()}</Text><Text numberOfLines={1} style={s.model}>{car.model}</Text></View><StatusPill status={car.status}/></View>
      <Text style={s.price}>{money(car.rate)} <Text style={s.perDay}>PER DAY</Text></Text>
      <View style={s.specs}><Spec value={car.plate} label="PLATE"/><Spec value="Automatic" label="TRANSMISSION"/><Spec value={car.id.slice(-3)} label="QR ASSET"/></View>
      <Text style={s.conditionTitle}>VEHICLE CONDITION</Text>
      <View style={s.conditionGrid}><Condition label="MILEAGE" value={car.condition?.mileage||'Not recorded'}/><Condition label="FUEL" value={car.condition?.fuel||'Not recorded'}/><Condition label="EXTERIOR" value={car.condition?.exterior||'Not recorded'}/><Condition label="INTERIOR" value={car.condition?.interior||'Not recorded'}/><Condition label="MECHANICAL" value={car.condition?.mechanical||'Not recorded'}/><Condition label="LAST SERVICE" value={car.condition?.serviceDate||'Not recorded'}/></View>
      <Text style={s.conditionNote}><Text style={s.noteLabel}>DAMAGE: </Text>{car.condition?.damage||'No condition notes recorded.'}</Text>
      {!!car.condition?.notes&&<Text style={s.conditionNote}><Text style={s.noteLabel}>INSPECTION: </Text>{car.condition.notes}</Text>}
      {car.status==='Available'&&<View style={s.actions}><PrimaryButton label="RESERVE" onPress={onReserve}/><PrimaryButton label="CHECK OUT" secondary onPress={onRent}/></View>}
      {car.status!=='Available'&&<View style={s.note}><Text style={s.noteText}>This vehicle is currently {car.status.toLowerCase()}. You can update its details or current status below.</Text></View>}
      <View style={s.manageActions}><PrimaryButton label="EDIT VEHICLE" secondary onPress={onEdit}/><Pressable onPress={onRemove} style={s.removeButton}><Text style={s.removeText}>REMOVE</Text></Pressable></View>
    </View>
  </View></View></Modal>;
}

export function ReservationSheet({ car, visible, onClose, onSave }) {
  const [name,setName]=useState('');
  const [days,setDays]=useState('3');
  if(!car) return null;
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><View style={s.backdrop}><View style={s.formSheet}>
    <View style={s.handle}/><Text style={s.formTitle}>Create booking</Text><Text style={s.formSub}>Reserve <Text style={s.lime}>{car.make} {car.model}</Text> for a customer.</Text>
    <Field label="CUSTOMER NAME" value={name} onChangeText={setName} placeholder="e.g. Jamie Cruz"/>
    <Field label="RENTAL DAYS" value={days} onChangeText={setDays} placeholder="3" number/>
    <View style={s.quote}><Text style={s.quoteLabel}>ESTIMATED TOTAL</Text><Text style={s.quoteValue}>{money(car.rate*Number(days||0))}</Text></View>
    <View style={s.actions}><PrimaryButton label="CANCEL" secondary onPress={onClose}/><PrimaryButton label="CONFIRM" onPress={()=>onSave(name,days)}/></View>
  </View></View></Modal>;
}

export function CustomerSheet({ visible, onClose, onSave }) {
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><View style={s.backdrop}><View style={s.formSheet}>
    <View style={s.handle}/><Text style={s.formTitle}>New customer</Text><Text style={s.formSub}>Create a customer record for future rentals.</Text>
    <Field label="FULL NAME" value={name} onChangeText={setName} placeholder="Customer name"/>
    <Field label="PHONE NUMBER" value={phone} onChangeText={setPhone} placeholder="+63 9xx xxx xxxx"/>
    <View style={s.actions}><PrimaryButton label="CANCEL" secondary onPress={onClose}/><PrimaryButton label="SAVE" onPress={()=>onSave(name,phone)}/></View>
  </View></View></Modal>;
}

export function VehicleFormSheet({ vehicle, visible, onClose, onSave }) {
  const [make,setMake]=useState('');
  const [model,setModel]=useState('');
  const [year,setYear]=useState('2024');
  const [kind,setKind]=useState('SUV');
  const [rate,setRate]=useState('');
  const [plate,setPlate]=useState('');
  const [image,setImage]=useState('');
  const [status,setStatus]=useState('Available');
  const [mileage,setMileage]=useState('');
  const [fuel,setFuel]=useState('');
  const [exterior,setExterior]=useState('');
  const [interior,setInterior]=useState('');
  const [mechanical,setMechanical]=useState('');
  const [serviceDate,setServiceDate]=useState('');
  const [damage,setDamage]=useState('');
  const [notes,setNotes]=useState('');
  useEffect(()=>{
    const condition=vehicle?.condition||{};
    setMake(vehicle?.make||'');setModel(vehicle?.model||'');setYear(vehicle?.year||'2024');setKind(vehicle?.kind||'SUV');setRate(vehicle?.rate?String(vehicle.rate):'');setPlate(vehicle?.plate||'');setImage(vehicle?.image||'');setStatus(vehicle?.status||'Available');
    setMileage(condition.mileage||'');setFuel(condition.fuel||'');setExterior(condition.exterior||'');setInterior(condition.interior||'');setMechanical(condition.mechanical||'');setServiceDate(condition.serviceDate||'');setDamage(condition.damage||'');setNotes(condition.notes||'');
  },[vehicle,visible]);
  const pickImage=async()=>{
    const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!permission.granted){Alert.alert('Permission required','Allow RentTrack to access your gallery to choose a vehicle image.');return;}
    const result=await ImagePicker.launchImageLibraryAsync({mediaTypes:['images'],allowsEditing:true,aspect:[4,3],quality:.85});
    if(!result.canceled&&result.assets?.[0]?.uri)setImage(result.assets[0].uri);
  };
  const submit=()=>onSave({make,model,year,kind,rate,plate,image,status,condition:{mileage,fuel,exterior,interior,mechanical,serviceDate,damage,notes}});
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><View style={s.backdrop}><View style={s.manageSheet}>
    <View style={s.handle}/><Text style={s.formTitle}>{vehicle?'Edit vehicle':'Add vehicle'}</Text><Text style={s.formSub}>{vehicle?'Update the vehicle record and its current availability.':'Add a vehicle to the live fleet inventory.'}</Text>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.formScroll}>
      <Field label="BRAND" value={make} onChangeText={setMake} placeholder="e.g. Toyota"/>
      <Field label="MODEL" value={model} onChangeText={setModel} placeholder="e.g. Fortuner"/>
      <View style={s.fieldRow}><View style={s.fieldHalf}><Field label="YEAR" value={year} onChangeText={setYear} placeholder="2024" number/></View><View style={s.fieldHalf}><Text style={s.fieldLabel}>CLASS</Text><View style={s.pickerWrap}><Picker selectedValue={kind} onValueChange={setKind} style={s.picker} dropdownIconColor={colors.lime}><Picker.Item label="SUV" value="SUV"/><Picker.Item label="Sedan" value="Sedan"/><Picker.Item label="Pickup" value="Pickup"/><Picker.Item label="MPV" value="MPV"/><Picker.Item label="Motorcycle" value="Motorcycle"/><Picker.Item label="Van" value="Van"/></Picker></View></View></View>
      <View style={s.fieldRow}><View style={s.fieldHalf}><Field label="DAILY RATE (PHP)" value={rate} onChangeText={setRate} placeholder="4200" number/></View><View style={s.fieldHalf}><Field label="PLATE NUMBER" value={plate} onChangeText={setPlate} placeholder="NCR 1234"/></View></View>
      <Text style={s.fieldLabel}>VEHICLE IMAGE</Text><View style={s.imagePicker}><View style={s.preview}>{image?<Image source={{uri:image}} style={s.previewImage}/>:<Text style={s.previewText}>NO IMAGE</Text>}</View><View style={s.imagePickerCopy}><Text style={s.imageHint}>Choose a clear photo from your gallery or keep an image URL.</Text><Pressable onPress={pickImage} style={s.galleryButton}><Text style={s.galleryButtonText}>CHOOSE FROM GALLERY</Text></Pressable></View></View><Field label="IMAGE URL (OPTIONAL)" value={image} onChangeText={setImage} placeholder="https://..."/>
      <Text style={s.conditionTitle}>CONDITION INSPECTION</Text>
      <View style={s.fieldRow}><View style={s.fieldHalf}><Field label="MILEAGE" value={mileage} onChangeText={setMileage} placeholder="18,240 km"/></View><View style={s.fieldHalf}><Field label="FUEL LEVEL" value={fuel} onChangeText={setFuel} placeholder="75%"/></View></View>
      <View style={s.fieldRow}><View style={s.fieldHalf}><Field label="EXTERIOR" value={exterior} onChangeText={setExterior} placeholder="Excellent"/></View><View style={s.fieldHalf}><Field label="INTERIOR" value={interior} onChangeText={setInterior} placeholder="Excellent"/></View></View>
      <View style={s.fieldRow}><View style={s.fieldHalf}><Field label="MECHANICAL" value={mechanical} onChangeText={setMechanical} placeholder="Passed"/></View><View style={s.fieldHalf}><Field label="LAST SERVICE" value={serviceDate} onChangeText={setServiceDate} placeholder="Sep 2, 2026"/></View></View>
      <Field label="DAMAGE / WEAR" value={damage} onChangeText={setDamage} placeholder="No visible damage"/><Field label="INSPECTION NOTES" value={notes} onChangeText={setNotes} placeholder="Helmet included..."/>
      <Text style={s.fieldLabel}>CURRENT STATUS</Text><View style={s.statusChoices}>{['Available','Reserved','Rented','Unavailable'].map(item=><Pressable key={item} onPress={()=>setStatus(item)} style={[s.statusChoice,status===item&&s.statusChoiceActive]}><Text style={[s.statusChoiceText,status===item&&s.statusChoiceTextActive]}>{item}</Text></Pressable>)}</View>
    </ScrollView>
    <View style={s.actions}><PrimaryButton label="CANCEL" secondary onPress={onClose}/><PrimaryButton label={vehicle?'SAVE CHANGES':'ADD VEHICLE'} onPress={submit}/></View>
  </View></View></Modal>;
}

function Field({label,number,...props}){return <View><Text style={s.fieldLabel}>{label}</Text><TextInput {...props} keyboardType={number?'number-pad':'default'} placeholderTextColor="#6F8979" style={s.field}/></View>}
function Spec({value,label}){return <View style={s.spec}><Text numberOfLines={1} style={s.specValue}>{value}</Text><Text style={s.specLabel}>{label}</Text></View>}
function Condition({value,label}){return <View style={s.condition}><Text style={s.conditionValue}>{value}</Text><Text style={s.specLabel}>{label}</Text></View>}
const s=StyleSheet.create({
 backdrop:{flex:1,justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,.65)'},vehicleSheet:{backgroundColor:colors.bg,borderTopLeftRadius:24,borderTopRightRadius:24,overflow:'hidden'},formSheet:{backgroundColor:colors.bg,borderTopLeftRadius:24,borderTopRightRadius:24,padding:20,paddingBottom:32},manageSheet:{maxHeight:'91%',backgroundColor:colors.bg,borderTopLeftRadius:24,borderTopRightRadius:24,padding:20,paddingBottom:25},formScroll:{paddingBottom:4},handle:{width:36,height:4,alignSelf:'center',borderRadius:3,backgroundColor:'#506857',marginVertical:10},close:{position:'absolute',zIndex:2,top:18,right:18,height:30,width:30,borderRadius:15,backgroundColor:'rgba(4,16,9,.82)',alignItems:'center',justifyContent:'center'},closeText:{color:colors.paper,fontSize:18,fontWeight:'800'},
 vehicleImage:{height:145,width:'100%',resizeMode:'cover'},vehicleBody:{padding:18,paddingBottom:22},eyebrow:{color:colors.lime,fontSize:9,letterSpacing:1,fontWeight:'900'},vehicleTitle:{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginTop:5},vehicleTitleCopy:{flex:1,minWidth:0},make:{color:colors.muted,fontSize:10,letterSpacing:.8,fontWeight:'800'},model:{color:colors.paper,fontSize:26,lineHeight:31,letterSpacing:-.6,fontWeight:'900'},price:{color:colors.lime,fontSize:19,fontWeight:'900',marginTop:9},perDay:{color:colors.muted,fontSize:9,letterSpacing:.4},specs:{flexDirection:'row',marginTop:16,paddingVertical:13,borderTopWidth:1,borderBottomWidth:1,borderColor:colors.line},spec:{flex:1,minWidth:0,paddingRight:5},specValue:{color:colors.paper,fontSize:10,fontWeight:'800'},specLabel:{color:colors.muted,fontSize:7,letterSpacing:.55,fontWeight:'900',marginTop:4},conditionTitle:{color:colors.paper,fontSize:10,letterSpacing:1,fontWeight:'900',marginTop:19,marginBottom:10},conditionGrid:{flexDirection:'row',flexWrap:'wrap',gap:8},condition:{width:'31%',backgroundColor:colors.panel,padding:9,borderRadius:8},conditionValue:{color:colors.paper,fontSize:10,fontWeight:'800'},conditionNote:{color:colors.muted,fontSize:11,lineHeight:16,marginTop:9},noteLabel:{color:colors.lime,fontWeight:'900'},actions:{flexDirection:'row',gap:9,marginTop:16},manageActions:{flexDirection:'row',gap:9,alignItems:'center',marginTop:10},removeButton:{paddingHorizontal:12,minHeight:46,alignItems:'center',justifyContent:'center'},removeText:{color:colors.red,fontSize:9,letterSpacing:.6,fontWeight:'900'},note:{backgroundColor:colors.panel,borderRadius:10,padding:12,marginTop:16},noteText:{color:colors.muted,fontSize:12,lineHeight:17},
 formTitle:{color:colors.paper,fontSize:27,letterSpacing:-.5,fontWeight:'900',marginTop:4},formSub:{color:colors.muted,fontSize:13,marginTop:4,marginBottom:21},lime:{color:colors.lime},fieldRow:{flexDirection:'row',gap:10},fieldHalf:{flex:1,minWidth:0},fieldLabel:{color:colors.muted,fontSize:9,letterSpacing:1,fontWeight:'900',marginBottom:7},field:{height:48,color:colors.paper,backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line,borderRadius:9,paddingHorizontal:13,fontSize:14,marginBottom:15},pickerWrap:{height:48,backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line,borderRadius:9,overflow:'hidden',marginBottom:15},picker:{height:48,color:colors.paper},imagePicker:{flexDirection:'row',gap:11,marginBottom:14},preview:{width:88,height:66,borderRadius:9,overflow:'hidden',backgroundColor:colors.panel2,alignItems:'center',justifyContent:'center'},previewImage:{width:'100%',height:'100%',resizeMode:'cover'},previewText:{color:colors.muted,fontSize:8,fontWeight:'900'},imagePickerCopy:{flex:1,justifyContent:'center'},imageHint:{color:colors.muted,fontSize:11,lineHeight:15,marginBottom:8},galleryButton:{alignSelf:'flex-start',borderRadius:7,backgroundColor:colors.lime,paddingVertical:8,paddingHorizontal:10},galleryButtonText:{color:colors.dark,fontSize:8,fontWeight:'900'},statusChoices:{flexDirection:'row',flexWrap:'wrap',gap:7,marginBottom:8},statusChoice:{borderWidth:1,borderColor:colors.line,borderRadius:17,paddingVertical:8,paddingHorizontal:10},statusChoiceActive:{backgroundColor:colors.lime,borderColor:colors.lime},statusChoiceText:{color:colors.muted,fontSize:9,fontWeight:'800'},statusChoiceTextActive:{color:colors.dark},quote:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderRadius:10,padding:13,backgroundColor:colors.panel2},quoteLabel:{color:colors.muted,fontSize:9,letterSpacing:.7,fontWeight:'900'},quoteValue:{color:colors.lime,fontSize:17,fontWeight:'900'},
});
