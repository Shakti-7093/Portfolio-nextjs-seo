import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const performanceData = await request.json()

    // Log performance data (in production, you'd save to database)
    console.log("Performance Metric Received:", {
      name: performanceData.name,
      value: performanceData.value,
      rating: performanceData.rating,
      timestamp: new Date(performanceData.timestamp).toISOString(),
      userAgent: request.headers.get("user-agent"),
      url: request.headers.get("referer"),
    })

    // Here you would typically:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Trigger alerts for poor performance
    // 4. Aggregate metrics for reporting

    // Example database save (uncomment and adapt for your database):
    /*
    await db.performanceMetrics.create({
      data: {
        name: performanceData.name,
        value: performanceData.value,
        rating: performanceData.rating,
        timestamp: new Date(performanceData.timestamp),
        userAgent: request.headers.get('user-agent'),
        url: request.headers.get('referer'),
      }
    })
    */

    // Example alert for poor performance
    if (performanceData.rating === "poor") {
      console.warn(`Poor performance detected: ${performanceData.name} = ${performanceData.value}`)
      // Send alert to monitoring service
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing performance data:", error)
    return NextResponse.json({ error: "Failed to process performance data" }, { status: 500 })
  }
}

export async function GET() {
  // Return recent performance metrics (for dashboard)
  return NextResponse.json({
    message: "Performance analytics endpoint",
    endpoints: {
      POST: "Submit performance metrics",
      GET: "Retrieve performance data",
    },
  })
}
