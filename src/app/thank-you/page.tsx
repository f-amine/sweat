import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ThankYou({
	searchParams,
}: {
	searchParams: { order?: string };
}) {
	const id = searchParams.order;
	if (!id) {
		return (
			<main className="min-h-screen bg-white text-black">
				<section className="max-w-[640px] mx-auto px-4 py-10">
					<h1 className="text-2xl font-bold mb-3">لا يوجد طلب</h1>
					<p className="text-neutral-700">
						لم نستلم رقم الطلب. الرجاء العودة وإعادة المحاولة.
					</p>
					<div className="mt-6">
						<Link href="/" className="underline">
							عودة إلى الصفحة الرئيسية
						</Link>
					</div>
				</section>
			</main>
		);
	}

	const order = await prisma.order.findUnique({ where: { id } });

	if (!order) {
		return (
			<main className="min-h-screen bg-white text-black">
				<section className="max-w-[640px] mx-auto px-4 py-10">
					<h1 className="text-2xl font-bold mb-3">الطلب غير موجود</h1>
					<p className="text-neutral-700">لم نتمكن من العثور على هذا الطلب.</p>
					<div className="mt-6">
						<Link href="/" className="underline">
							عودة إلى الصفحة الرئيسية
						</Link>
					</div>
				</section>
			</main>
		);
	}

	const formatNum = (n: number) =>
		new Intl.NumberFormat("ar", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(n);

	const created = new Intl.DateTimeFormat("ar-MA", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(order.createdAt);

	return (
		<main className="min-h-screen bg-white text-black">
			<section className="max-w-[640px] mx-auto px-4 py-10">
				<h1 className="text-2xl font-bold mb-2">شكرا لطلبك!</h1>
				<p className="text-neutral-700">
					تم استلام طلبك بنجاح. <b>الرجاء إبقاء هاتفك قيد التشغيل</b> وسيتواصل
					معك فريق التأكيد قريبا لإتمام الطلب.
				</p>

				<div className="mt-8 border border-neutral-200 p-4">
					<div className="grid grid-cols-2 gap-y-2 text-sm">
						<div className="text-neutral-600">رقم الطلب</div>
						<div className="font-mono">{order.id}</div>

						<div className="text-neutral-600">تاريخ الطلب</div>
						<div>{created}</div>

						<div className="text-neutral-600">الإسم</div>
						<div>{order.firstName}</div>

						<div className="text-neutral-600">الهاتف</div>
						<div dir="ltr">{order.phone}</div>

						<div className="text-neutral-600">العنوان</div>
						<div>{order.address}</div>

						<div className="text-neutral-600">الخيار</div>
						<div>اشتري {order.bundle}</div>

						<div className="text-neutral-600">الكمية</div>
						<div>{order.quantity}</div>

						<div className="text-neutral-600">الإجمالي</div>
						<div>﷼ {formatNum(order.total)}</div>
					</div>
				</div>

				<div className="mt-8 text-neutral-700 text-sm leading-6">
					<ul className="list-disc ps-6">
						<li>سيتصل بك فريقنا لتأكيد الطلب خلال أقرب وقت.</li>
						<li>يرجى التأكد من إمكانية استقبال المكالمات على رقمك.</li>
						<li>لأي تعديل أو استفسار، تواصل معنا عبر واتساب أو الهاتف.</li>
					</ul>
				</div>

				<div className="mt-8">
					<Link href="/" className="underline">
						عودة إلى الصفحة الرئيسية
					</Link>
				</div>
			</section>
		</main>
	);
}
