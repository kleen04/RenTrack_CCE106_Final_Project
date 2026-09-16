import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, statusColor } from '../theme';

export function Header({ eyebrow, title, action }) {
  return <View style={styles.header}><View style={styles.titleCopy}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text></View>{action || <View style={styles.avatar}><Text style={styles.avatarText}>JD</Text></View>}</View>;
}
export function StatusPill({ status }) {
  return <View style={[styles.pill,{borderColor:statusColor(status)+'AA'}]}><Text style={[styles.pillText,{color:statusColor(status)}]}>{status.toUpperCase()}</Text></View>;
}
export function PrimaryButton({ label, onPress, secondary=false }) {
  return <Pressable onPress={onPress} style={[styles.button,secondary&&styles.secondary]}><Text numberOfLines={1} style={[styles.buttonText,secondary&&styles.secondaryText]}>{label}</Text></Pressable>;
}
export function SectionTitle({ children, right }) {
  return <View style={styles.section}><Text style={styles.sectionText}>{children}</Text>{right&&<Text style={styles.sectionRight}>{right}</Text>}</View>;
}
export function AddButton({ onPress }) { return <Pressable onPress={onPress} style={styles.add}><Text style={styles.addText}>+</Text></Pressable>; }

const styles=StyleSheet.create({
  header:{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',marginTop:8,marginBottom:18}, titleCopy:{flexShrink:1,paddingRight:16}, eyebrow:{color:colors.lime,fontSize:9,fontWeight:'900',letterSpacing:1.3}, title:{color:colors.paper,fontSize:32,lineHeight:38,fontWeight:'900',letterSpacing:-.8,marginTop:3}, avatar:{width:36,height:36,borderRadius:18,backgroundColor:colors.orange,alignItems:'center',justifyContent:'center'}, avatarText:{color:colors.dark,fontSize:11,fontWeight:'900'},
  pill:{alignSelf:'flex-start',backgroundColor:'rgba(4,16,9,.86)',borderWidth:1,paddingHorizontal:7,paddingVertical:4,borderRadius:5},pillText:{fontSize:8,fontWeight:'900',letterSpacing:.55}, button:{flex:1,minHeight:46,paddingHorizontal:10,borderRadius:10,alignItems:'center',justifyContent:'center',backgroundColor:colors.lime},secondary:{borderWidth:1,borderColor:colors.line,backgroundColor:colors.panel2},buttonText:{color:colors.dark,fontSize:9,letterSpacing:.5,fontWeight:'900'},secondaryText:{color:colors.paper},
  section:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:11},sectionText:{color:colors.paper,fontSize:10,letterSpacing:1.05,fontWeight:'900'},sectionRight:{color:colors.muted,fontSize:9,letterSpacing:.55,fontWeight:'800'}, add:{height:36,width:36,borderRadius:18,backgroundColor:colors.lime,alignItems:'center',justifyContent:'center'},addText:{color:colors.dark,fontSize:25,lineHeight:28,fontWeight:'400'},
});
