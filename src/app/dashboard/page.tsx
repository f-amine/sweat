import prisma from "@/lib/prisma";
import { isDashboardAuthed, loginDashboard, logoutDashboard } from "./actions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      firstName: true,
      phone: true,
      address: true,
      bundle: true,
      quantity: true,
      total: true,
    },
  });
}

export default async function Dashboard() {
  const authed = await isDashboardAuthed();

  if (!authed) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="max-w-[520px] mx-auto px-4 py-10">
          <div className="rounded-[16px] border-2 border-[#FFB6CA] bg-white p-6 shadow-[0_1px_4px_rgba(9,39,83,0.08)]">
            <h1 className="text-xl font-bold mb-4">Dashboard Login</h1>
            <form action={async (formData) => { 'use server'; await loginDashboard(formData); }} className="space-y-3">
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full h-[48px] px-3 bg-white rounded-[10px] border-2 border-[#FFB6CA] placeholder-[#9B9B9B]"
                required
              />
              <button className="w-full h-[48px] rounded-[10px] bg-[#FF5A8C] text-white font-semibold">Login</button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  const orders = await getOrders();

  async function onLogout() {
    "use server";
    await logoutDashboard();
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-[1080px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex items-center gap-2">
            <a
              className="inline-flex items-center justify-center h-10 px-4 rounded-[10px] border-2 border-[#FFB6CA]"
              href="/dashboard/export"
            >
              Export CSV
            </a>
            <form action={onLogout}>
              <button className="inline-flex items-center justify-center h-10 px-4 rounded-[10px] bg-[#FF5A8C] text-white">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[12px] border-2 border-[#FFB6CA] bg-white shadow-[0_1px_4px_rgba(9,39,83,0.08)]">
          <table className="min-w-full text-[14px]">
            <thead className="bg-[#FFE9EC]">
              <tr>
                <th className="text-right px-3 py-2">Created</th>
                <th className="text-right px-3 py-2">Order ID</th>
                <th className="text-right px-3 py-2">Name</th>
                <th className="text-right px-3 py-2">Phone</th>
                <th className="text-right px-3 py-2">Address</th>
                <th className="text-right px-3 py-2">Bundle</th>
                <th className="text-right px-3 py-2">Qty</th>
                <th className="text-right px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Intl.DateTimeFormat("ar-MA", { dateStyle: "medium", timeStyle: "short" }).format(o.createdAt)}
                  </td>
                  <td className="px-3 py-2 font-mono">{o.id}</td>
                  <td className="px-3 py-2">{o.firstName}</td>
                  <td className="px-3 py-2">{o.phone}</td>
                  <td className="px-3 py-2 max-w-[360px] truncate" title={o.address}>{o.address}</td>
                  <td className="px-3 py-2">{o.bundle}</td>
                  <td className="px-3 py-2">{o.quantity}</td>
                  <td className="px-3 py-2 font-semibold">﷼{o.total.toFixed(2)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td className="px-3 py-6 text-center text-[#6B6B6B]" colSpan={8}>لا توجد طلبات بعد</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}


