import { type NextRequest, NextResponse } from "next/server"

// Mock products data that syncs with admin
const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Organic Apple",
    description: "Fresh organic apples from Himachal Pradesh",
    category: "FRUITS",
    price: 180,
    wholesalePrice: 150,
    stock: 50,
    minStock: 10,
    unit: "per kg",
    isActive: true,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Lemongrass Oil",
    description: "Pure lemongrass essential oil",
    category: "AROMATICS",
    price: 450,
    wholesalePrice: 400,
    stock: 25,
    minStock: 5,
    unit: "per 50ml",
    isActive: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Organic Honey",
    description: "Raw organic honey from mountain flowers",
    category: "OTHER",
    price: 350,
    wholesalePrice: 300,
    stock: 30,
    minStock: 8,
    unit: "per 500g",
    isActive: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let products = [...MOCK_PRODUCTS]

    // Filter by category
    if (category && category !== "all") {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by search
    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // For demo, just return the product with an ID
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...productData,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
