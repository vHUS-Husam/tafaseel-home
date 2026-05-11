import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, Category, Product, Setting } from './models/index.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Setting.deleteMany();

    // Create Admin Accounts
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admins = await User.create([
      { name: 'مدير 1', email: 'admin1@tafasel.ps', phone: '+970599111111', password: adminPassword, role: 'admin', isVerified: true },
      { name: 'مدير 2', email: 'admin2@tafasel.ps', phone: '+970599222222', password: adminPassword, role: 'admin', isVerified: true },
      { name: 'مدير 3', email: 'admin3@tafasel.ps', phone: '+970599333333', password: adminPassword, role: 'admin', isVerified: true }
    ]);

    // Create Staff Accounts
    const staffPassword = await bcrypt.hash('staff123', 12);
    const staff = await User.create([
      { name: 'موظف 1', email: 'staff1@tafasel.ps', phone: '+970599444444', password: staffPassword, role: 'staff', isVerified: true },
      { name: 'موظف 2', email: 'staff2@tafasel.ps', phone: '+970599555555', password: staffPassword, role: 'staff', isVerified: true },
      { name: 'موظف 3', email: 'staff3@tafasel.ps', phone: '+970599666666', password: staffPassword, role: 'staff', isVerified: true }
    ]);

    // Create Categories
    const categories = await Category.create([
      { name: 'غرف نوم', description: 'تشكيلة فاخرة من غرف النوم العصرية والكلاسيكية', order: 1 },
      { name: 'غرف معيشة', description: 'أثاث معيشة أنيق ومريح', order: 2 },
      { name: 'غرف سفرة', description: 'طاولات سفرة وكراسي فاخرة', order: 3 },
      { name: 'مكاتب', description: 'مكاتب عمل احترافية', order: 4 },
      { name: 'أطفال', description: 'أثاث غرف أطفال آمن وجميل', order: 5 },
      { name: 'إكسسوارات', description: 'إكسسوارات وأدوات منزلية', order: 6 }
    ]);

    // Create Products
    const products = await Product.create([
      {
        name: 'غرفة نوم ملكية كاملة',
        description: 'غرفة نوم فاخرة بتصميم ملكي، تتضمن سرير كينج، خزانة ملابس كبيرة، تسريحة مع مرآة، و2 كومود. مصنوعة من خشب الزان الطبيعي مع طلاء عالي الجودة.',
        price: 4500,
        discount: 10,
        images: ['/uploads/products/bedroom-1.jpg'],
        category: categories[0]._id,
        colors: [
          { name: 'بني داكن', hex: '#3E2723', quantity: 5 },
          { name: 'بيج فاتح', hex: '#F5F5DC', quantity: 3 },
          { name: 'أبيض كريمي', hex: '#FFFDD0', quantity: 4 }
        ],
        stock: 12,
        isFeatured: true,
        dimensions: { length: 200, width: 180, height: 210 },
        material: 'خشب زان طبيعي',
        tags: ['غرفة نوم', 'فاخر', 'ملكي']
      },
      {
        name: 'طقم كنب مودرن 3+2+1',
        description: 'طقم كنب عصري بتصميم مودرن، يتضمن كنبة 3 مقاعد، كنبة 2 مقعد، وكرسي فردي. تنجيد من الجلد الاصطناعي الفاخر.',
        price: 3200,
        discount: 15,
        images: ['/uploads/products/sofa-1.jpg'],
        category: categories[1]._id,
        colors: [
          { name: 'رمادي', hex: '#808080', quantity: 4 },
          { name: 'بيج', hex: '#F5F5DC', quantity: 3 },
          { name: 'كحلي', hex: '#000080', quantity: 2 }
        ],
        stock: 9,
        isFeatured: true,
        dimensions: { length: 220, width: 90, height: 85 },
        material: 'جلد اصطناعي فاخر',
        tags: ['كنب', 'معيشة', 'مودرن']
      },
      {
        name: 'طاولة سفرة 8 مقاعد',
        description: 'طاولة سفرة كبيرة تتسع لـ 8 أشخاص مع 8 كراسي مبطنة. تصميم كلاسيكي أنيق مناسب للمناسبات والولائم.',
        price: 2800,
        discount: 0,
        images: ['/uploads/products/dining-1.jpg'],
        category: categories[2]._id,
        colors: [
          { name: 'خشبي طبيعي', hex: '#8B4513', quantity: 3 },
          { name: 'أبيض', hex: '#FFFFFF', quantity: 2 }
        ],
        stock: 5,
        dimensions: { length: 200, width: 100, height: 75 },
        material: 'خشب بلوط',
        tags: ['سفرة', 'طاولة', 'كلاسيك']
      },
      {
        name: 'مكتب تنفيذي فاخر',
        description: 'مكتب تنفيذي كبير مع خزانة ملفات وكرسي مريح. تصميم احترافي يناسب المكاتب المنزلية والشركات.',
        price: 1800,
        discount: 5,
        images: ['/uploads/products/desk-1.jpg'],
        category: categories[3]._id,
        colors: [
          { name: 'بني غامق', hex: '#5D4037', quantity: 6 },
          { name: 'أسود', hex: '#000000', quantity: 4 }
        ],
        stock: 10,
        isFeatured: true,
        dimensions: { length: 160, width: 80, height: 75 },
        material: 'خشب MDF مع قشرة خشبية',
        tags: ['مكتب', 'تنفيذي', 'عمل']
      },
      {
        name: 'غرفة أطفال كاملة',
        description: 'غرفة أطفال جميلة تتضمن سرير مفرد، خزانة ملابس، مكتب دراسة، وكرسي. تصميم آمن وملون يناسب الأطفال.',
        price: 2200,
        discount: 8,
        images: ['/uploads/products/kids-1.jpg'],
        category: categories[4]._id,
        colors: [
          { name: 'أزرق', hex: '#2196F3', quantity: 3 },
          { name: 'وردي', hex: '#E91E63', quantity: 3 },
          { name: 'أخضر', hex: '#4CAF50', quantity: 2 }
        ],
        stock: 8,
        dimensions: { length: 120, width: 100, height: 180 },
        material: 'خشب MDF صديق للبيئة',
        tags: ['أطفال', 'غرفة', 'آمن']
      },
      {
        name: 'مرآة جدارية فاخرة',
        description: 'مرآة جدارية كبيرة بإطار ذهبي فاخر. مناسبة لغرف النوم والمداخل.',
        price: 450,
        discount: 0,
        images: ['/uploads/products/mirror-1.jpg'],
        category: categories[5]._id,
        colors: [
          { name: 'ذهبي', hex: '#FFD700', quantity: 10 },
          { name: 'فضي', hex: '#C0C0C0', quantity: 8 }
        ],
        stock: 18,
        dimensions: { length: 120, width: 5, height: 80 },
        material: 'زجاج مع إطار معدني',
        tags: ['مرآة', 'ديكور', 'فاخر']
      }
    ]);

    // Create Settings
    await Setting.create({});

    console.log('✅ Seed data created successfully!');
    console.log(`👤 Admins: ${admins.length}`);
    console.log(`👥 Staff: ${staff.length}`);
    console.log(`📂 Categories: ${categories.length}`);
    console.log(`📦 Products: ${products.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
