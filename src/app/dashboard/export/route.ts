import prisma from "@/lib/prisma";
import { isDashboardAuthed } from "../actions";

function toCsvRow(values: (string | number | Date)[]) {
  return values
    .map((v) => {
      if (v instanceof Date) return v.toISOString();
      const s = String(v ?? "");
      if (s.includes(",") || s.includes("\n") || s.includes('"')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    })
    .join(",");
}

export async function GET() {
  const authed = await isDashboardAuthed();
  if (!authed) {
    return new Response("Unauthorized", { status: 401 });
  }

  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "createdAt",
    "id",
    "firstName",
    "phone",
    "address",
    "bundle",
    "quantity",
    "total",
  ];

  const rows = [header.join(","),
    ...orders.map((o) =>
      toCsvRow([
        o.createdAt,
        o.id,
        o.firstName,
        o.phone,
        o.address,
        o.bundle,
        o.quantity,
        o.total,
      ])
    ),
  ].join("\n");

  return new Response(rows, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="orders.csv"`,
      "Cache-Control": "no-store",
    },
  });
}


