import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { PrimaryButton } from '../components/UI';

export default function ScanScreen({ mode, setMode, onScan }) {
  const [permission, requestPermission]=useCameraPermissions();
  const [scanned,setScanned]=useState(false);
  const scan=({data})=>{if(!scanned){setScanned(true);onScan(data);setTimeout(()=>setScanned(false),1600)}};
  return <View style={s.page}><View style={s.head}><Text style={s.eyebrow}>RENTTRACK / VEHICLE HANDOFF</Text><Text style={s.title}>QR scanner</Text>
    <View style={s.switch}><Pressable onPress={()=>setMode('Check-out')} style={[s.mode,mode==='Check-out'&&s.modeActive]}><Text style={[s.modeText,mode==='Check-out'&&s.modeTextActive]}>CHECK-OUT</Text></Pressable><Pressable onPress={()=>setMode('Check-in')} style={[s.mode,mode==='Check-in'&&s.modeActive]}><Text style={[s.modeText,mode==='Check-in'&&s.modeTextActive]}>CHECK-IN</Text></Pressable></View>
  </View>
  <View style={s.cameraBox}>{!permission?<View/>:!permission.granted?<View style={s.permission}><Text style={s.permissionTag}>CAMERA</Text><Text style={s.permissionTitle}>Camera access needed</Text><Text style={s.permissionCopy}>Allow camera access to scan a vehicle QR code.</Text><PrimaryButton label="ALLOW CAMERA" onPress={requestPermission}/></View>:<CameraView style={s.camera} barcodeScannerSettings={{barcodeTypes:['qr']}} onBarcodeScanned={scan}/>}<View pointerEvents="none" style={s.reticle}><View style={[s.corner,s.tl]}/><View style={[s.corner,s.tr]}/><View style={[s.corner,s.bl]}/><View style={[s.corner,s.br]}/></View></View>
  <View style={s.note}><Text style={s.step}>01</Text><View style={s.noteCopy}><Text style={s.noteTitle}>Scan vehicle QR code</Text><Text style={s.noteText}>Point the camera at the code placed on the vehicle windshield.</Text></View></View>
  <Pressable onPress={()=>onScan('QR-TRK-003')} style={s.demo}><Text style={s.demoText}>DEMO: SCAN VEHICLE QR</Text></Pressable>
  </View>;
}
const s=StyleSheet.create({
 page:{flex:1,paddingTop:28},head:{paddingHorizontal:20},eyebrow:{color:colors.lime,fontSize:9,letterSpacing:1.3,fontWeight:'900'},title:{color:colors.paper,fontSize:32,lineHeight:38,fontWeight:'900',letterSpacing:-.8,marginTop:3},switch:{height:44,backgroundColor:colors.panel,borderRadius:10,padding:4,marginTop:17,flexDirection:'row'},mode:{flex:1,borderRadius:7,alignItems:'center',justifyContent:'center'},modeActive:{backgroundColor:colors.lime},modeText:{color:colors.muted,fontSize:9,letterSpacing:.65,fontWeight:'900'},modeTextActive:{color:colors.dark},cameraBox:{height:260,marginTop:18,backgroundColor:'#020904',overflow:'hidden'},camera:{flex:1},permission:{flex:1,backgroundColor:colors.panel,alignItems:'center',justifyContent:'center',padding:28},permissionTag:{color:colors.dark,backgroundColor:colors.lime,overflow:'hidden',paddingHorizontal:7,paddingVertical:5,borderRadius:5,fontSize:8,fontWeight:'900',letterSpacing:.7},permissionTitle:{color:colors.paper,fontSize:19,fontWeight:'900',marginTop:10},permissionCopy:{color:colors.muted,fontSize:12,lineHeight:18,textAlign:'center',marginVertical:10},reticle:{...StyleSheet.absoluteFillObject,margin:42},corner:{position:'absolute',height:34,width:34,borderColor:colors.lime},tl:{top:0,left:0,borderTopWidth:3,borderLeftWidth:3},tr:{top:0,right:0,borderTopWidth:3,borderRightWidth:3},bl:{bottom:0,left:0,borderBottomWidth:3,borderLeftWidth:3},br:{bottom:0,right:0,borderBottomWidth:3,borderRightWidth:3},note:{flexDirection:'row',alignItems:'center',gap:12,padding:20},step:{color:colors.dark,backgroundColor:colors.lime,overflow:'hidden',borderRadius:5,paddingVertical:6,paddingHorizontal:8,fontSize:10,fontWeight:'900'},noteCopy:{flex:1},noteTitle:{color:colors.paper,fontSize:15,fontWeight:'800'},noteText:{color:colors.muted,fontSize:11,lineHeight:16,marginTop:3},demo:{marginHorizontal:20,borderWidth:1,borderColor:colors.line,borderRadius:9,paddingVertical:13,alignItems:'center'},demoText:{color:colors.muted,fontSize:9,letterSpacing:.8,fontWeight:'900'},
});
