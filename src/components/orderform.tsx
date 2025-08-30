"use client";

import { CreateOrderState } from "@/actions/order";
import { useMemo, useState, useActionState } from "react";

export type Bundle = 1 | 2 | 3;
const PRICES: Record<
	Bundle,
	{ current: number; compareAt?: number; badge?: string }
> = {
	1: { current: 169.0 },
	2: { current: 199.0, compareAt: 338.0, badge: "أكثر مبيعا" },
	3: { current: 249.0, compareAt: 507.0 },
};

export default function OrderForm({
	action,
}: {
	action: (
		state: CreateOrderState | undefined,
		formData: FormData,
	) => Promise<CreateOrderState>;
}) {
	const [bundle, setBundle] = useState<Bundle>(2);
	const [qty, setQty] = useState(1);
	const [firstName, setFirstName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const price = useMemo(() => {
		const p = PRICES[bundle];
		return { unit: p.current, compareAt: p.compareAt, total: p.current * qty };
	}, [bundle, qty]);

	const [state, formAction, pending] = useActionState(action, undefined);

	return (
		<form action={formAction} className="bg-[#FFE9EC]">
			<input type="hidden" name="bundle" value={String(bundle)} />
			<input type="hidden" name="quantity" value={String(qty)} />

			<div className="max-w-[420px] mx-auto text-center pt-4">
				<b className="text-[18px] leading-6 text-[#2B2B2B]">
					خصم خيالي يصل إلى 100 ريال!!
				</b>
			</div>

			{/* Bundles */}
			<div className="max-w-[420px] mx-auto px-3 pt-3">
				{[1, 2, 3].map((b) => {
					const bb = b as Bundle;
					const p = PRICES[bb];
					const active = bundle === bb;
					return (
						<button
							key={b}
							type="button"
							onClick={() => setBundle(bb)}
							className={[
								"relative w-full text-right mb-3",
								"rounded-[12px] border-[2px]",
								active
									? "border-[#FF5A8C] bg-white"
									: "border-[#FFB6CA] bg-white",
								"shadow-[0_1px_4px_rgba(9,39,83,0.08)]",
							].join(" ")}
						>
							{p.badge && bb === 2 && (
								<span className="absolute -top-3 left-8 bg-[#FF5A8C] text-white text-[12px] leading-[22px] px-2 rounded-[8px] shadow">
									{p.badge}
								</span>
							)}
							<div className="flex items-center justify-between px-4 py-3">
								<div className="text-left">
									<div className="text-[16px] font-semibold">
										﷼ {p.current.toFixed(2)}
									</div>
									{p.compareAt && (
										<div className="text-[14px] text-[#9B9B9B] line-through">
											﷼ {p.compareAt.toFixed(2)}
										</div>
									)}
								</div>
								<div className="flex-1 flex items-center justify-center">
									<span className="inline-block bg-[#F5FAF7] text-[#6E7F75] text-[14px] px-4 py-2 rounded-[8px]">
										توصيل مجاني
									</span>
									<span className="mx-3 text-[16px]">اشتري {b}</span>
								</div>
								<div className="shrink-0">
									<span
										className={[
											"inline-flex h-5 w-5 rounded-full border-2 items-center justify-center",
											active ? "border-[#FF5A8C]" : "border-[#C8C8C8]",
										].join(" ")}
									>
										{active && (
											<span className="h-2.5 w-2.5 rounded-full bg-[#FF5A8C]"></span>
										)}
									</span>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			{/* Form */}
			<div className="max-w-[420px] mx-auto px-3 pb-4">
				<div className="text-center text-[#4A4A4A] text-[18px] leading-7 mb-2">
					المرجوا إدخال معلوماتك أسفله لإتمام الطلب
				</div>
				<div className="space-y-3">
					<input
						name="firstName"
						placeholder="الاسم"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="w-full h-[56px] px-4 bg-white rounded-[12px] border-2 border-[#FFB6CA] placeholder-[#9B9B9B]"
					/>
					<input
						name="phone"
						dir="ltr"
						placeholder="رقم الهاتف"
						inputMode="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="w-full h-[56px] px-4 bg-white rounded-[12px] border-2 border-[#FFB6CA] placeholder-[#9B9B9B]"
					/>
					<input
						name="address"
						placeholder="العنوان كامل"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="w-full h-[56px] px-4 bg-white rounded-[12px] border-2 border-[#FFB6CA] placeholder-[#9B9B9B]"
					/>

					{/* total (client visual only; server recalculates) */}
					<div className="flex items-center justify-between text-[16px] px-1">
						<div>الإجمالي</div>
						<div className="font-semibold">﷼ {price.total.toFixed(2)}</div>
					</div>

					{/* UTM (optional hidden) */}
					<input type="hidden" name="utmSource" value="" />
					<input type="hidden" name="utmMedium" value="" />
					<input type="hidden" name="utmCampaign" value="" />

					<button
						disabled={pending}
						className="w-full h-[56px] rounded-[12px] bg-[#FF5A8C] text-white text-[18px] font-bold"
					>
						{pending ? "جار الإرسال..." : "اضغط هنا للطلب"}
					</button>

					{state?.ok === true && (
						<div className="text-green-600 text-center">
							تم استلام طلبك! رقم الطلب: {state.orderId}
						</div>
					)}
					{state?.ok === false && (
						<div className="text-red-600 text-center">{state.error}</div>
					)}
				</div>
			</div>
		</form>
	);
}
