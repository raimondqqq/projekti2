import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const EMERGENCY_PASSWORD = process.env.ADMIN_EMERGENCY_PASSWORD

export async function POST(request: NextRequest) {
  if (!EMERGENCY_PASSWORD) {
    return NextResponse.json({ error: "Emergency auth not configured" }, { status: 500 })
  }

  const { password } = await request.json()

  if (password === EMERGENCY_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set("emergency_admin_auth", EMERGENCY_PASSWORD, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 })
}

export async function GET() {
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Admin Emergency Login</title>
      <style>
        body { font-family: system-ui; max-width: 400px; margin: 100px auto; padding: 20px; }
        input { width: 100%; padding: 10px; margin: 10px 0; font-size: 16px; }
        button { width: 100%; padding: 10px; background: #000; color: #fff; border: none; font-size: 16px; cursor: pointer; }
        button:hover { background: #333; }
        .error { color: red; margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>Emergency Admin Access</h1>
      <p>Enter emergency password:</p>
      <input type="password" id="password" placeholder="Password" />
      <button onclick="login()">Login</button>
      <div id="error" class="error"></div>

      <script>
        async function login() {
          const password = document.getElementById('password').value
          const res = await fetch('/api/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
          })

          if (res.ok) {
            window.location.href = '/admin'
          } else {
            document.getElementById('error').textContent = 'Invalid password'
          }
        }

        document.getElementById('password').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') login()
        })
      </script>
    </body>
    </html>
  `, {
    headers: { "Content-Type": "text/html" }
  })
}
