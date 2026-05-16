// Prisma seed file for initial data
// Run with: npm run db:seed

import { prisma } from '../src/shared/database/prisma';

async function main() {
  console.log('Seeding database...');

  // Seed festivals
  const festivals = [
    {
      nameEn: 'Mahavir Jayanti',
      nameHi: 'महावीर जयंती',
      month: 4,
      dateEn: 'April 21 (varies)',
      dateHi: 'वैशाख कृष्ण 13',
      significance: 'Birth anniversary of Lord Mahavira',
    },
    {
      nameEn: 'Diwali',
      nameHi: 'दिवाली',
      month: 11,
      dateEn: 'October/November (varies)',
      dateHi: 'कार्तिक अमावस्या',
      significance: 'Festival of lights',
    },
  ];

  for (const festival of festivals) {
    await prisma.festival.upsert({
      where: { nameEn: festival.nameEn },
      update: {},
      create: festival,
    });
  }

  console.log('✅ Seeding completed');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
