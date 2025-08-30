import { createOrder } from "@/actions/order";
import OrderForm from "@/components/orderform";
import Image from "next/image";

const IMAGES = {
	hero1:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/3886ba2d-5a93-448c-ba14-2b2a84e0c8a6.1 (1).png",
	hero2:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/8adf729b-122c-4fb9-9699-7315d42d88a6.2 (2).png",
	hero3:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/6676f63c-6702-4f48-a794-516d130c04dc.3 (1).png",
	hero4:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/f184db7c-177f-4fbb-a46a-7b033529ee18.4.png",
	secA: "https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/142ee13c-fe48-4530-8911-dadb74fc06cd.5.png",
	blockTop:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/eab32024-18fa-44ca-906e-dba5a068ef1c.6 (2).png",
	blockSticker:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/dc2c82b4-fb9e-4822-8399-47f32f8bab7b.7.png",
	blockGrid1:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/4502e032-47c9-4976-b6cb-0ebed19a43b3.8.png",
	blockGrid2:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/18341e29-8195-4b3f-a9e8-af092a120e87.9.png",
	blockGrid3:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/007ea52b-454e-4de4-9df2-44e8f4ecc8e2.rachaqati.shop (3).png",
	blockGif:
		"https://assets.lightfunnels.com/account-31635/images_library/cf58f223-85f7-4611-a891-a7c88476fd86.7eNc9bc0Rmsgoe33F34l73WZEdeD8r4OT3RZ8EuX (1).gif",
	blockWide1:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/2e60ba86-eae3-4285-80f0-1e8dee91b263.rachaqati.shop (6) (1).png",
	blockWide2:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/38cbf1a7-aba4-4aea-ac31-0a41a0650117.rachaqati.shop (6) (2).png",
	blockEnd1:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/db6e9b9f-7807-44f7-8584-d6e101607f31.20.png",
	blockEnd2:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/455c6093-a0ec-40ec-80ac-b3a1340012ad.21.png",
	blockEnd3:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/2f312a88-f37e-4a80-b438-63a0731b4238.12.png",
	blockEnd4:
		"https://assets.lightfunnels.com/cdn-cgi/image/width=3840,quality=80,format=auto/https://assets.lightfunnels.com/account-31635/images_library/94aee1e7-ece6-4d3c-9bf0-bd2675e619a7.SweetSweat - UI-22.png",
};

export default function Page() {
	return (
		<main className="bg-white text-black">
			{/* Hero */}
			<section>
				<section>
					<Image
						src={IMAGES.hero1}
						alt=""
						width={3840}
						height={2160}
						sizes="100vw"
						className="w-full h-auto"
						priority
					/>
					<Image
						src={IMAGES.hero2}
						alt=""
						width={3840}
						height={2160}
						sizes="100vw"
						className="w-full h-auto"
					/>
					<Image
						src={IMAGES.hero3}
						alt=""
						width={3840}
						height={2160}
						sizes="100vw"
						className="w-full h-auto"
					/>
					<Image
						src={IMAGES.hero4}
						alt=""
						width={3840}
						height={2160}
						sizes="100vw"
						className="w-full h-auto"
					/>
				</section>
			</section>

			{/* Order form (server action) */}
			<section id="buy">
				<OrderForm action={createOrder} />
			</section>

			{/* Banner */}
			<section>
				<Image
					src={IMAGES.secA}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>
				<div className="flex justify-center">
					<a href="#buy">اشتر الآن</a>
				</div>
			</section>

			<section>
				<Image
					src={IMAGES.blockTop}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>

				<iframe
					className="w-full aspect-video"
					src="https://player.vimeo.com/video/1083143870?h=7e2e3df1d5&loop=0&title=0"
					allow="autoplay; fullscreen"
				/>

				<Image
					src={IMAGES.blockSticker}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>

				<div className="grid md:grid-cols-3">
					<Image
						src={IMAGES.blockGrid1}
						alt=""
						width={3840}
						height={2160}
						sizes="(min-width: 768px) 33vw, 100vw"
						className="w-full h-auto"
					/>
					<Image
						src={IMAGES.blockGrid2}
						alt=""
						width={3840}
						height={2160}
						sizes="(min-width: 768px) 33vw, 100vw"
						className="w-full h-auto"
					/>
					<Image
						src={IMAGES.blockGrid3}
						alt=""
						width={3840}
						height={2160}
						sizes="(min-width: 768px) 33vw, 100vw"
						className="w-full h-auto"
					/>
				</div>

				{/* Animated GIF — keep original to preserve animation */}
				<Image
					src={IMAGES.blockGif}
					alt=""
					width={1200}
					height={1200}
					sizes="100vw"
					className="w-full h-auto"
					unoptimized
				/>

				<Image
					src={IMAGES.blockWide1}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>

				<iframe
					className="w-full aspect-video"
					src="https://player.vimeo.com/video/1083143898?h=edf22c7235&loop=0&title=0"
				/>

				<Image
					src={IMAGES.blockWide2}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>

				<iframe
					className="w-full aspect-video"
					src="https://player.vimeo.com/video/1083143882?h=08d750cf70&loop=0&title=0"
				/>

				<Image
					src={IMAGES.blockEnd1}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>
				<Image
					src={IMAGES.blockEnd2}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>
				<Image
					src={IMAGES.blockEnd3}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>
				<Image
					src={IMAGES.blockEnd4}
					alt=""
					width={3840}
					height={2160}
					sizes="100vw"
					className="w-full h-auto"
				/>
			</section>
			{/* Footer */}
			<footer>
				<div className="flex justify-between">
					<nav className="flex gap-4">
						<a href="#buy">اتصل بنا</a>
						<a href="#buy">سياسة الاسترداد</a>
					</nav>
					<div>.جميع الحقوق محفوظة .Sweet Sweat Co 2025 ©</div>
				</div>
			</footer>
		</main>
	);
}
