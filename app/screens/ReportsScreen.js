import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, money } from '../theme';
import { Header, SectionTitle } from '../components/UI';

export default function ReportsScreen({ cars, bookings, history }) {
  const available=cars.filter(x=>x.status==='Available').length;
  const revenue=bookings.reduce((sum,item)=>sum+item.total,0);
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.page}>
    <Header eyebrow="RENTTRACK / PERFORMANCE" title="Reports"/>
    <View style={s.revenue}><Text style={s.revenueKicker}>ESTIMATED SEPTEMBER REVENUE</Text><Text style={s.revenueValue}>{money(revenue)}</Text><Text style={s.up}>UP 12.4% FROM LAST MONTH</Text></View>
    <SectionTitle>FLEET UTILIZATION</SectionTitle>
    <View style={s.util}><View style={s.utilHead}><Text style={s.utilNumber}>{Math.round((cars.length-available)/cars.length*100)}%</Text><Text style={s.caption}>OF FLEET ON THE ROAD</Text></View>{cars.map(car=><View style={s.barRow} key={car.id}><Text style={s.barName}>{car.make}</Text><View style={s.track}><View style={[s.fill,{width:car.status==='Rented'?'92%':car.status==='Reserved'?'68%':car.status==='Unavailable'?'20%':'38%'}]}/></View></View>)}</View>
    <SectionTitle>RENTAL HISTORY</SectionTitle>
    <View style={s.history}>{history.slice(0,3).map(item=><View style={s.historyRow} key={item.id}><Text style={s.type}>{item.type}</Text><View style={s.historyCopy}><Text style={s.historyText}>{item.text}</Text><Text style={s.historyTime}>{item.time}</Text></View></View>)}</View>
    <SectionTitle>OPERATIONS SNAPSHOT</SectionTitle><View style={s.stats}><Stat value={available+'/'+cars.length} label="AVAILABLE NOW"/><Stat value={String(bookings.length).padStart(2,'0')} label="OPEN BOOKINGS"/><Stat value="PHP 3.1K" label="AVERAGE DAILY"/><Stat value="100%" label="QR READY"/></View>
  </ScrollView>;
}
function Stat({value,label}){return <View style={s.stat}><Text style={s.statValue}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>}
const s=StyleSheet.create({
 page:{padding:20,paddingBottom:102},revenue:{borderRadius:16,backgroundColor:colors.lime,padding:19,marginBottom:25},revenueKicker:{color:'#3D5C19',fontSize:9,letterSpacing:.8,fontWeight:'900'},revenueValue:{color:colors.dark,fontSize:33,fontWeight:'900',letterSpacing:-1.2,marginTop:5},up:{color:colors.dark,backgroundColor:'#A9E83D',borderRadius:5,overflow:'hidden',alignSelf:'flex-start',paddingVertical:5,paddingHorizontal:8,marginTop:7,fontSize:8,fontWeight:'900',letterSpacing:.4},util:{backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line,borderRadius:14,padding:15,marginBottom:24},utilHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'baseline',borderBottomWidth:1,borderColor:colors.line,paddingBottom:13,marginBottom:12},utilNumber:{color:colors.paper,fontSize:28,fontWeight:'900'},caption:{color:colors.muted,fontSize:8,letterSpacing:.55,fontWeight:'900'},barRow:{flexDirection:'row',alignItems:'center',marginVertical:7},barName:{color:colors.paper,fontSize:10,fontWeight:'700',width:74},track:{height:6,flex:1,borderRadius:3,overflow:'hidden',backgroundColor:colors.line},fill:{height:'100%',borderRadius:3,backgroundColor:colors.lime},history:{backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line,borderRadius:14,marginBottom:24,overflow:'hidden'},historyRow:{flexDirection:'row',gap:10,padding:12,borderBottomWidth:1,borderColor:colors.line},type:{color:colors.dark,backgroundColor:colors.lime,overflow:'hidden',borderRadius:4,paddingHorizontal:6,paddingVertical:4,alignSelf:'flex-start',fontSize:8,fontWeight:'900'},historyCopy:{flex:1},historyText:{color:colors.paper,fontSize:11,fontWeight:'800'},historyTime:{color:colors.muted,fontSize:9,marginTop:3},stats:{flexDirection:'row',flexWrap:'wrap',gap:10},stat:{width:'48.3%',backgroundColor:colors.panel2,borderColor:colors.line,borderWidth:1,borderRadius:14,padding:15},statValue:{color:colors.lime,fontSize:20,fontWeight:'900'},statLabel:{color:colors.muted,fontSize:8,letterSpacing:.55,fontWeight:'900',marginTop:5},
});
