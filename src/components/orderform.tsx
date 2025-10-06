"use client";

import { CreateOrderState } from "@/actions/order";
import { useMemo, useState, useActionState, useEffect } from "react";
import { phone as normalizePhone } from "phone";
import { toast } from "sonner";
import Countdown from "./countdown";

export type Bundle = 1 | 2 | 3;
const PRICES: Record<
  Bundle,
  { current: number; compareAt?: number; badge?: string }
> = {
  1: { current: 10.0 },
  2: { current: 15.0, badge: "أكثر مبيعا" },
  3: { current: 17.0 },
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
  const [qty] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const price = useMemo(() => {
    const p = PRICES[bundle];
    return { unit: p.current, compareAt: p.compareAt, total: p.current * qty };
  }, [bundle, qty]);

  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.ok === false) {
      toast.error(state.error ?? "تعذر إتمام الطلب. يرجى التحقق من صحة البيانات والمحاولة مرة أخرى.");
    }
  }, [state]);

  // Wrap formAction to normalize phone and track LEAD to Snap
  async function onSubmit(formData: FormData) {
    // Normalize phone number for KSA
    const raw = String(formData.get("phone") || "");
    const result = normalizePhone(raw, { country: "SA" });
    if (result.isValid && result.phoneNumber) {
      formData.set("phone", result.phoneNumber);
    }

    // Fire Snap LEAD with normalized phone if available
    try {
      if (typeof window !== "undefined" && typeof window.snaptr === "function") {
        window.snaptr("track", "Purchase", {
          user_phone_number:
            result.isValid && result.phoneNumber ? result.phoneNumber : raw,
        });
      }
    } catch {}

    // Continue to server action
    return formAction(formData);
  }

  return (
    <form action={onSubmit} className="bg-[#FFE9EC]">
      <input type="hidden" name="bundle" value={String(bundle)} />
      <input type="hidden" name="quantity" value={String(qty)} />

      {/* Animated Urgency Banner */}
      <div className="max-w-[420px] mx-auto px-3 pt-4">
        <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-r from-[#FF5A8C] to-[#FF3D7F] text-white p-4 shadow-[0_4px_12px_rgba(255,90,140,0.4)]">
          {/* Pulsing animation background */}
          <div className="absolute inset-0 bg-white opacity-0 animate-pulse" style={{animationDuration: '2s'}}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-[16px] font-bold tracking-wide">عرض محدود لفترة قصيرة جداً</span>
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
            
            <div className="text-center mb-3">
              <div className="text-[28px] font-black leading-tight mb-1">
                خصم يصل إلى <span className="text-[#FFED4E]">258 ريال!</span>
              </div>
              <div className="text-[14px] opacity-95">وفر أكثر من 50% على طلبك الآن</div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-[12px] px-4 py-2.5 border-2 border-white/30">
              <svg className="w-5 h-5 text-[#FFED4E] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-[16px] font-bold">ينتهي العرض خلال</span>
              <Countdown 
                className="bg-white text-[#FF5A8C] border-none px-3 py-1 rounded-[10px] text-[18px] font-black shadow-lg" 
                variant="pill" 
                format="mm:ss" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bundles */}
      <div className="max-w-[420px] mx-auto px-3 pt-4">
        <div className="text-center mb-3">
          <h3 className="text-[20px] font-bold text-[#2B2B2B]">اختر باقتك الآن</h3>
          <p className="text-[14px] text-[#6B6B6B]">كل الباقات تشمل توصيل مجاني</p>
        </div>
        
        {[1, 2, 3].map((b) => {
          const bb = b as Bundle;
          const p = PRICES[bb];
          const active = bundle === bb;
          const savings = p.compareAt ? p.compareAt - p.current : 0;
          const savingsPercent = p.compareAt ? Math.round(((p.compareAt - p.current) / p.compareAt) * 100) : 0;
          
          return (
            <button
              key={b}
              type="button"
              onClick={() => setBundle(bb)}
              className={[
                "relative w-full mb-3",
                "rounded-[16px] border-[3px]",
                "transition-all duration-200",
                active
                  ? "border-[#FF5A8C] bg-white shadow-[0_4px_12px_rgba(255,90,140,0.25)] scale-[1.02]"
                  : "border-[#FFB6CA] bg-white shadow-[0_1px_4px_rgba(9,39,83,0.08)] hover:border-[#FF5A8C]",
              ].join(" ")}
            >
              {/* Top badges */}
              <div className="absolute -top-3 left-0 right-0 flex justify-center gap-2">
                {p.badge && (
                  <span className="bg-[#FF5A8C] text-white text-[13px] font-bold leading-[24px] px-3 rounded-[12px] shadow-lg">
                    {p.badge}
                  </span>
                )}
                {savings > 0 && (
                  <span className="bg-[#4CAF50] text-white text-[13px] font-bold leading-[24px] px-3 rounded-[12px] shadow-lg">
                    وفر {savings.toFixed(0)} ريال
                  </span>
                )}
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-center flex-1">
                    <div className="text-[14px] text-[#6B6B6B] mb-1">اشتري</div>
                    <div className="text-[32px] font-black text-[#FF5A8C]">{b}</div>
                  </div>
                  
                  <div className="flex-1 text-center">
                    <div className="text-[14px] text-[#6B6B6B] mb-1">السعر</div>
                    <div className="text-[28px] font-black text-[#2B2B2B]">
                      ﷼{p.current.toFixed(0)}
                    </div>
                    {p.compareAt && (
                      <div className="text-[16px] text-[#9B9B9B] line-through mt-1">
                        ﷼{p.compareAt.toFixed(0)}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    <span
                      className={[
                        "inline-flex h-7 w-7 rounded-full border-[3px] items-center justify-center transition-all",
                        active ? "border-[#FF5A8C] bg-[#FF5A8C]" : "border-[#D0D0D0]",
                      ].join(" ")}
                    >
                      {active && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>

                {savingsPercent > 0 && (
                  <div className="text-center bg-[#F0FDF4] text-[#15803D] text-[13px] font-bold py-2 rounded-[10px] mt-2">
                    خصم {savingsPercent}٪ • توصيل مجاني
                  </div>
                )}
                {!savingsPercent && (
                  <div className="text-center bg-[#F5FAF7] text-[#6E7F75] text-[13px] font-semibold py-2 rounded-[10px] mt-2">
                    توصيل مجاني
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="max-w-[420px] mx-auto px-3 pb-6">
        <div className="bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-5 border-2 border-[#FFB6CA]">
          <div className="text-center mb-4">
            <h3 className="text-[22px] font-bold text-[#2B2B2B] mb-1">
              أكمل طلبك الآن 🎁
            </h3>
            <p className="text-[14px] text-[#6B6B6B]">
              أدخل بياناتك وسنتواصل معك فوراً
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <input
                name="firstName"
                placeholder="الاسم الكامل"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-[56px] px-4 bg-[#F9F9F9] rounded-[12px] border-2 border-[#E5E5E5] placeholder-[#9B9B9B] focus:border-[#FF5A8C] focus:bg-white transition-all outline-none text-[16px]"
                required
              />
            </div>
            
            <div>
              <input
                name="phone"
                dir="ltr"
                placeholder="05XXXXXXXX"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-[56px] px-4 bg-[#F9F9F9] rounded-[12px] border-2 border-[#E5E5E5] placeholder-[#9B9B9B] focus:border-[#FF5A8C] focus:bg-white transition-all outline-none text-[16px]"
                required
              />
            </div>
            
            <div>
              <input
                name="address"
                placeholder="العنوان الكامل (المدينة - الحي - الشارع)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full h-[56px] px-4 bg-[#F9F9F9] rounded-[12px] border-2 border-[#E5E5E5] placeholder-[#9B9B9B] focus:border-[#FF5A8C] focus:bg-white transition-all outline-none text-[16px]"
                required
              />
            </div>

            {/* Total with discount highlight */}
            <div className="bg-gradient-to-r from-[#FFF5F7] to-[#FFE9EC] rounded-[12px] p-4 border-2 border-[#FFB6CA]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[16px] text-[#6B6B6B]">الإجمالي</span>
                <span className="text-[28px] font-black text-[#FF5A8C]">
                  ﷼{price.total.toFixed(0)}
                </span>
              </div>
              {price.compareAt && (
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#9B9B9B]">السعر قبل الخصم</span>
                  <span className="text-[#9B9B9B] line-through">
                    ﷼{price.compareAt.toFixed(0)}
                  </span>
                </div>
              )}
              <div className="mt-2 pt-2 border-t border-[#FFB6CA]/30">
                <div className="flex items-center justify-center gap-2 text-[#4CAF50] font-bold text-[14px]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>توصيل مجاني لكل السعودية</span>
                </div>
              </div>
            </div>

            <input type="hidden" name="utmSource" value="" />
            <input type="hidden" name="utmMedium" value="" />
            <input type="hidden" name="utmCampaign" value="" />

            <button
              disabled={pending}
              className="w-full h-[60px] rounded-[16px] bg-gradient-to-r from-[#FF5A8C] to-[#FF3D7F] text-white text-[20px] font-black shadow-[0_6px_20px_rgba(255,90,140,0.4)] hover:shadow-[0_8px_25px_rgba(255,90,140,0.5)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  جار الإرسال...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  أطلب الآن واحصل على خصمك 🔥
                </span>
              )}
            </button>

            {state?.ok === true && (
              <div className="bg-[#F0FDF4] border-2 border-[#4CAF50] text-[#15803D] text-center py-3 rounded-[12px] font-bold">
                ✅ تم استلام طلبك! رقم الطلب: {state.orderId}
              </div>
            )}

            <div className="text-center text-[12px] text-[#9B9B9B] mt-2">
              🔒 معلوماتك محمية بالكامل وآمنة
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
