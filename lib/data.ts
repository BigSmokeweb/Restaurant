export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  veg: boolean
  category: "starters" | "mains" | "desserts" | "drinks"
  image?: string
}

export const menuItems: MenuItem[] = [
  // Starters
  { id: "paneer-tikka", name: "Paneer Tikka", description: "Marinated cottage cheese grilled on charcoal", price: 249, veg: true, category: "starters" },
  { id: "chicken-seekh", name: "Chicken Seekh Kebab", description: "Minced chicken with herbs and spices, live grilled", price: 329, veg: false, category: "starters" },
  { id: "veg-manchurian", name: "Veg Manchurian (Dry)", description: "Crispy vegetable balls in ginger-soy glaze", price: 229, veg: true, category: "starters" },
  { id: "drums-heaven", name: "Drums of Heaven", description: "Chicken lollipops in fiery Schezwan sauce", price: 349, veg: false, category: "starters" },
  { id: "hara-bhara", name: "Hara Bhara Kebab", description: "Spinach & pea patty, pan-grilled", price: 209, veg: true, category: "starters" },
  { id: "fish-tikka", name: "Fish Tikka", description: "Marinated fish fillet grilled with ajwain", price: 379, veg: false, category: "starters" },
  // Mains
  { id: "mutton-biryani", name: "Mumbra Mutton Biryani", description: "Slow-cooked dum biryani with tender mutton", price: 449, veg: false, category: "mains" },
  { id: "butter-chicken", name: "Butter Chicken", description: "Classic North Indian tomato-cream curry", price: 379, veg: false, category: "mains" },
  { id: "dal-makhani", name: "Dal Makhani", description: "Black lentils slow-cooked overnight with cream", price: 269, veg: true, category: "mains" },
  { id: "paneer-lababdar", name: "Paneer Lababdar", description: "Cottage cheese in tangy onion-tomato gravy", price: 299, veg: true, category: "mains" },
  { id: "schezwan-rice", name: "Schezwan Fried Rice", description: "Wok-tossed rice with Schezwan sauce", price: 249, veg: true, category: "mains" },
  { id: "chicken-biryani", name: "Chicken Biryani", description: "Aromatic rice with spiced chicken", price: 399, veg: false, category: "mains" },
  // Desserts
  { id: "gulab-jamun", name: "Gulab Jamun", description: "Milk-solid dumplings in rose syrup", price: 149, veg: true, category: "desserts" },
  { id: "shahi-tukda", name: "Shahi Tukda", description: "Bread pudding with saffron rabri", price: 179, veg: true, category: "desserts" },
  { id: "kulfi-falooda", name: "Kulfi Falooda", description: "Indian ice cream with rose syrup", price: 199, veg: true, category: "desserts" },
  { id: "choc-brownie", name: "Chocolate Brownie", description: "Fudge brownie with vanilla ice cream", price: 219, veg: true, category: "desserts" },
  // Drinks
  { id: "masala-chai", name: "Masala Chai", description: "Ginger-cardamom tea in clay kullhad", price: 30, veg: true, category: "drinks" },
  { id: "lime-soda", name: "Fresh Lime Soda", description: "Sweet or salted, freshly prepared", price: 60, veg: true, category: "drinks" },
  { id: "mango-lassi", name: "Mango Lassi", description: "Yogurt-based mango smoothie", price: 99, veg: true, category: "drinks" },
  { id: "fresh-juice", name: "Fresh Juices", description: "Orange, watermelon, pomegranate", price: 79, veg: true, category: "drinks" },
]

export const categories = [
  { key: "starters", label: "Starters" },
  { key: "mains", label: "Mains" },
  { key: "desserts", label: "Desserts" },
  { key: "drinks", label: "Drinks" },
] as const

export type Deal = {
  id: number
  title: string
  description: string
  discount: string
  price: string
  tag: string
}

export const deals: Deal[] = [
  { id: 1, title: "Couple Special", description: "Dinner for 2 with live grill & unlimited starters", discount: "20% OFF", price: "From ₹1,299", tag: "Weekend Only" },
  { id: 2, title: "Family Package", description: "Lunch buffet for 4 with complimentary desserts", discount: "15% OFF", price: "From ₹2,199", tag: "Mon–Fri" },
  { id: 3, title: "Birthday Celebration", description: "Special table decoration + complimentary cake", discount: "Free Cake", price: "₹599/person", tag: "Advance Booking" },
  { id: 4, title: "Corporate Lunch", description: "Group lunch for 10+ with dedicated service", discount: "25% OFF", price: "₹449/person", tag: "Weekdays" },
]

export const locations = [
  { city: "Mumbra", status: "1 Outlet", open: true, image: "/assets/biryani_hero.png" },
  { city: "Thane", status: "Coming Soon", open: false, image: "/assets/grill_hero.png" },
  { city: "Kalyan", status: "Coming Soon", open: false, image: "/assets/breakfast_hero.png" },
  { city: "Navi Mumbai", status: "Coming Soon", open: false, image: "/assets/dine_interior.png" },
]

export const timeSlots = {
  lunch: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"],
  dinner: ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"],
}

export const restaurantInfo = {
  name: "Mumbra Restaurant",
  address: "Railway Station Road, Mumbra, Thane - 400612",
  phone: "+91 98765 43210",
  hours: "Mon–Sun: 6:00 AM – 11:30 PM",
}
