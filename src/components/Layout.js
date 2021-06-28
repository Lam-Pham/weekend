
export default function Layout({ children }) {
    return (
      <>
        <div class="min-w-screen min-h-screen bg-yellow-100">
          <main>{children}</main>
        </div>
      </>
    )
  }