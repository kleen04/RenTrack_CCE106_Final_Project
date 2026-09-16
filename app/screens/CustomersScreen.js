import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { AddButton, Header, SectionTitle } from '../components/UI';

export default function CustomersScreen({ customers, onAdd }) {
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.page}>
    <Header eyebrow="RENTTRACK / CLIENT RECORDS" title="Customers" action={<AddButton onPress={onAdd}/>}/>
    <View style={s.search}><Text style={s.searchMark}>Q</Text><Text style={s.searchText}>Search customer</Text></View>
    <SectionTitle>ALL CUSTOMERS ({customers.length})</SectionTitle>
    {customers.map(customer=><View key={customer.name} style={s.row}><View style={[s.avatar,{backgroundColor:customer.tone}]}><Text style={s.avatarText}>{customer.initials}</Text></View><View style={s.copy}><Text numberOfLines={1} style={s.name}>{customer.name}</Text><Text numberOfLines={1} style={s.phone}>{customer.phone}</Text></View><View style={s.count}><Text style={s.countValue}>{customer.rentals}</Text><Text style={s.countLabel}>RENTALS</Text></View></View>)}
    <Pressable onPress={onAdd} style={s.outline}><Text style={s.outlineText}>+  ADD CUSTOMER</Text></Pressable>
  </ScrollView>;
}
const s=StyleSheet.create({
 page:{padding:20,paddingBottom:102},search:{height:48,backgroundColor:colors.panel,borderWidth:1,borderColor:colors.line,borderRadius:13,flexDirection:'row',alignItems:'center',paddingHorizontal:14,marginBottom:23},searchMark:{color:colors.muted,fontSize:12,fontWeight:'900',marginRight:10},searchText:{color:'#6F8979',fontSize:14},row:{flexDirection:'row',alignItems:'center',paddingVertical:13,borderBottomWidth:1,borderColor:colors.line},avatar:{width:38,height:38,borderRadius:11,alignItems:'center',justifyContent:'center',marginRight:11},avatarText:{color:colors.dark,fontSize:11,fontWeight:'900'},copy:{flex:1,minWidth:0},name:{color:colors.paper,fontSize:15,fontWeight:'800'},phone:{color:colors.muted,fontSize:10,marginTop:3},count:{alignItems:'flex-end'},countValue:{color:colors.lime,fontSize:16,fontWeight:'900'},countLabel:{color:colors.muted,fontSize:7,letterSpacing:.7,fontWeight:'900'},outline:{height:49,borderRadius:10,borderWidth:1,borderColor:colors.lime,alignItems:'center',justifyContent:'center',marginTop:20},outlineText:{color:colors.lime,fontSize:10,letterSpacing:1,fontWeight:'900'},
});
