import prisma from "@/lib/prisma";
import Link from "next/link";
import ThankYouPixel from "@/app/thank-you/pixel";

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
					<div className="rounded-[16px] border-2 border-[#FFB6CA] bg-[#FFE9EC] shadow-[0_1px_4px_rgba(9,39,83,0.08)] p-6 text-center">
						<div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-[#FFB6CA]">
							<span className="text-[#FF5A8C] text-2xl">!</span>
						</div>
						<h1 className="text-2xl font-bold mb-2">لا يوجد طلب</h1>
						<p className="text-[#4A4A4A]">لم نستلم رقم الطلب. الرجاء العودة وإعادة المحاولة.</p>

						<div className="mt-6">
							<Link
								href="/"
								className="inline-flex w-full sm:w-auto h-[56px] items-center justify-center rounded-[12px] bg-[#FF5A8C] px-6 text-white text-[18px] font-bold"
							>
								العودة إلى الصفحة الرئيسية
							</Link>
						</div>
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
					<div className="rounded-[16px] border-2 border-[#FFB6CA] bg-[#FFE9EC] shadow-[0_1px_4px_rgba(9,39,83,0.08)] p-6 text-center">
						<div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-[#FFB6CA]">
							<span className="text-[#FF5A8C] text-2xl">!</span>
						</div>
						<h1 className="text-2xl font-bold mb-2">الطلب غير موجود</h1>
						<p className="text-[#4A4A4A]">لم نتمكن من العثور على هذا الطلب.</p>

						<div className="mt-6">
							<Link
								href="/"
								className="inline-flex w-full sm:w-auto h-[56px] items-center justify-center rounded-[12px] bg-[#FF5A8C] px-6 text-white text-[18px] font-bold"
							>
								العودة إلى الصفحة الرئيسية
							</Link>
						</div>
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
			{/* Snap purchase tracking */}
			<ThankYouPixel orderId={order.id} total={order.total} phone={order.phone} />
			<section className="max-w-[640px] mx-auto px-4 py-10">
				{/* Header / Confirmation Banner */}
				<div className="text-center">
					<div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FCE2E8] border-2 border-[#FFB6CA] shadow-sm">
						{/* Check icon */}
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 12.5l2 2 4-4" stroke="#FF5A8C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
							<circle cx="12" cy="12" r="9" stroke="#FF5A8C" strokeWidth="1.6" />
						</svg>
					</div>
					<h1 className="mt-3 text-2xl font-bold">شكراً لطلبك!</h1>
					<p className="mt-2 text-[#4A4A4A]">
						تم استلام طلبك بنجاح. <b>الرجاء إبقاء هاتفك قيد التشغيل</b> وسيتواصل
						معك فريق التأكيد قريباً لإتمام الطلب.
					</p>
				</div>

				{/* Order Summary Card */}
				<div className="mt-8 rounded-[16px] border-2 border-[#FFB6CA] bg-white shadow-[0_1px_4px_rgba(9,39,83,0.08)] overflow-hidden">
					<div className="bg-[#FFE9EC] px-4 py-3 text-[#2B2B2B] text-[16px] font-semibold">
						تفاصيل الطلب
					</div>
					<div className="p-4">
						<div className="grid grid-cols-2 gap-y-3 text-[15px]">
							<div className="text-[#6E6E6E]">رقم الطلب</div>
							<div className="font-mono">{order.id}</div>

							<div className="text-[#6E6E6E]">تاريخ الطلب</div>
							<div>{created}</div>

							<div className="text-[#6E6E6E]">الإسم</div>
							<div>{order.firstName}</div>

							<div className="text-[#6E6E6E]">الهاتف</div>
							<div dir="ltr">{order.phone}</div>

							<div className="text-[#6E6E6E]">العنوان</div>
							<div>{order.address}</div>

							<div className="text-[#6E6E6E]">الخيار</div>
							<div>اشتري {order.bundle}</div>

							<div className="text-[#6E6E6E]">الكمية</div>
							<div>{order.quantity}</div>

							<div className="text-[#6E6E6E]">الإجمالي</div>
							<div className="font-semibold">﷼ {formatNum(order.total)}</div>
						</div>
					</div>
				</div>

				{/* Notes */}
				<div className="mt-6 rounded-[12px] border border-[#FFB6CA] bg-[#FFF6F8] p-4 text-[#4A4A4A] text-sm leading-6">
					<ul className="list-disc ps-6">
						<li>سيتصل بك فريقنا لتأكيد الطلب خلال أقرب وقت.</li>
						<li>يرجى التأكد من إمكانية استقبال المكالمات على رقمك.</li>
						<li>لأي تعديل أو استفسار، تواصل معنا عبر واتساب أو الهاتف.</li>
					</ul>
				</div>

				{/* CTA */}
				<div className="mt-8">
					<Link
						href="/"
						className="inline-flex w-full h-[56px] items-center justify-center rounded-[12px] bg-[#FF5A8C] text-white text-[18px] font-bold"
					>
						العودة إلى الصفحة الرئيسية
					</Link>
				</div>
			</section>
		</main>
	);
}
