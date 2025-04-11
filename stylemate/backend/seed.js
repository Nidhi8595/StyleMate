import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cloth from './models/Cloth.js'; // make sure path is correct

dotenv.config();

const clothesData =[
    {
      "imageUrl": "https://images.unsplash.com/photo-1602024290087-19fd8ab421ff?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDE5fHx3aGl0ZSUyMHRzaGlydHxlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "white",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1593032457869-2be6e93f2686?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDgwfHxibHVlJTIwYm90dG9tfGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "bottom",
      "color": "blue",
      "season": "all",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1595373995725-c263a7c2de45?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDMwfHxjdXAlMjBiaXJlY2VxJTIwdG9wfGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "black",
      "season": "winter",
      "occasion": "party"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1582818885717-0da11563a430?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDg5fHxzaG9lcyUyMG1vY2t8ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "shoes",
      "color": "brown",
      "season": "all",
      "occasion": "sports"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1600227483775-54553147b8f4?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDU2fHxjZW1lbnR8ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "accessory",
      "color": "silver",
      "season": "all",
      "occasion": "party"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1593642634367-22bfa2f79c2d?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDk4fHxjaGVhdCUyMHRvbHN8ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "green",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1531297512550-99e1d160c474?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDg2fHxibGFjayUyMGJvdHRvbXxlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "bottom",
      "color": "black",
      "season": "winter",
      "occasion": "formal"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1583948400811-b1393a0212c1?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDE3fHxmb3JtYWx8ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "layer",
      "color": "red",
      "season": "winter",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1590080874400-e9d1ec73ae66?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDk2fHxzaG9lcyUyMGJyb3duJTIwc2h1ZXN8ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "shoes",
      "color": "white",
      "season": "all",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1568539189-622e9f729f4c?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDY0fHxzaG9lcyUyMG9mJTIwd2hlZWxlfGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "accessory",
      "color": "gold",
      "season": "summer",
      "occasion": "party"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1566221523-63d07a799bf0?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDEwMXx8c3Byb3V0fGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "yellow",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1587445227176-b01c3dcd6f96?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDk4fHxnZW5kZXIlMkZib3R0b218ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "bottom",
      "color": "grey",
      "season": "winter",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1596327040547-91ee4b2324f7?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDJ8fGNoYW5uZWwlMjBsb25nJTIwY2VtcHxlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "layer",
      "color": "brown",
      "season": "winter",
      "occasion": "formal"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1582542028496-8832e539933c?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDE4fHxibGFjayUyMGJvdHRvbXxlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "bottom",
      "color": "black",
      "season": "all",
      "occasion": "formal"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1616696168890-17c56c3d5d6b?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDJ8fGZpbmUlMkZsb25nJTIwY2VtcHxlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "purple",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1608324286022-70ee3454e2fa?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDk4fHxncmlmeSUyMHRoaXxlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "layer",
      "color": "grey",
      "season": "winter",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1606336617799-4575acb57775?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDQ4fHxwYW5kYWhvbmF8ZW58MHx8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "shoes",
      "color": "red",
      "season": "all",
      "occasion": "sports"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1604527387813-dc9c4d58bc9f?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDkxfHxjaGFubmVscyUyMGtpbmxlbWV4fGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "accessory",
      "color": "black",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1612292378757-6f55e9c9b1ed?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDJ8fGZpbmUlMkZsb25nJTIwdG9wc3xlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "blue",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1592156795675-4a34d52ac342?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDg1fHxjb2F0aGVyfGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "shoes",
      "color": "black",
      "season": "all",
      "occasion": "sports"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1582830998043-ec9636cf1974?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDJ8fGxvY2slMkYwMDAzJTIwc3Byb3V0fGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "bottom",
      "color": "white",
      "season": "summer",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1603891690512-0f0e22ea9114?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDMxfHxmYWFuJTIwc2xhdXNoYWFpc3xlbnwwfDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "layer",
      "color": "blue",
      "season": "winter",
      "occasion": "casual"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1598980367735-b0f870f963e1?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhcmNofDJ8fG5lZWRlciUyMGZpbmUlMkZyb25nJTIwbGVnYWwlMjBhcnRsZ3JvdXBlfGVufDB8fDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      "type": "top",
      "color": "orange",
      "season": "summer",
      "occasion": "casual"
    }
  ]
  
  ;

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Cloth.deleteMany(); // optional: clear existing clothes
    // await Cloth.insertMany(clothesData);
    console.log('✅ Clothes Data Inserted!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

seedData();

