export const colors = { bg:'#07130E', panel:'#10221A', panel2:'#162D22', line:'#254133', lime:'#C8FF48', paper:'#F5F8E9', muted:'#9EB5A5', orange:'#FF8547', blue:'#78C7FF', red:'#FF6A6A', dark:'#041009' };
export const money = value => 'PHP ' + Number(value).toLocaleString('en-PH');
export const getInitials = name => name.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();
export const statusColor = status => status === 'Available' ? colors.lime : status === 'Rented' ? colors.orange : status === 'Unavailable' ? colors.red : colors.blue;
