import { Outlet } from '@tanstack/react-router';

export function RootLayout() {
  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <h2>3D Configurator</h2>
      </header>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
