import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.event.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "ΒάΛτο Τέρμα",
      description:
        "Μια βραδιά αφιερωμένη στην ελληνική pop μουσική των 2000s — τα τραγούδια που μας μεγάλωσαν, σε μια ατμόσφαιρα που δεν θα ξεχάσεις.",
      date: "2025-05-24",
      time: "21:00",
      location: "Λευκωσία",
      totalTables: 25,
    },
  })

  const bookings = [
    {
      name: "Γιώργος Παπαδόπουλος",
      phone: "6971234567",
      email: "giorgos@example.com",
      tableNo: 1,
      guests: 4,
      notes: "Birthday θα γιορτάσουμε!",
    },
    {
      name: "Μαρία Κωνσταντίνου",
      phone: "6981234567",
      email: null,
      tableNo: 5,
      guests: 6,
      notes: null,
    },
    {
      name: "Νίκος Αλεξίου",
      phone: "6991234567",
      email: "nikos@example.com",
      tableNo: 12,
      guests: 3,
      notes: "Αλλεργία σε γλουτένη",
    },
  ]

  for (const booking of bookings) {
    await prisma.booking.create({ data: booking })
  }

  console.log("Seed completed: 1 event + 3 demo bookings")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
