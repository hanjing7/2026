import React from 'react';
import { cn } from './ui/utils';
import {
	Check,
	Copy,
	Mail,
	MapPin,
	Phone,
	Codepen,
	Linkedin,
	Youtube,
	PenTool,
	Dribbble
} from 'lucide-react';
import { Button } from './ui/button';
import { CardSpotlight } from './ui/card-spotlight';

const APP_EMAIL = 'hanjing@umich.edu';
const APP_PHONE = '(734)6043327';

interface FooterProps {
	onNavigate?: (page: string) => void;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
	({ onNavigate }, ref) => {
		const socialLinks = [
		{
			icon: Linkedin,
			href: 'https://www.linkedin.com/in/hanjing7/',
			label: 'LinkedIn',
		},
		{
			icon: PenTool,
			href: 'https://medium.com/@hanjing',
			label: 'Medium',
		},
		{
			icon: Youtube,
			href: 'https://www.youtube.com/playlist?list=PLirp1roc1uR3mnjtJ0zDzlkWQVqI1_MD8',
			label: 'YouTube',
		},
		{
			icon: Codepen,
			href: 'https://codepen.io/Jing-Han-the-scripter/collections/',
			label: 'CodePen',
		},
		{
			icon: Dribbble,
			href: 'https://dribbble.com/JingHan4',
			label: 'Dribbble',
		},
	];

		return (
			<footer ref={ref} className="flex min-h-screen w-full flex-col justify-center border-t bg-muted/30 px-4 py-20 md:px-8 lg:px-16">
				<div className="mx-auto max-w-7xl">
					{/* Header */}
					<div className="mb-16 text-center">
						<h2 className="mb-2">Let's Chat</h2>
						<p className="text-muted-foreground">
							Curious about my project or want to geek out on design? <br/> 
                            I'm available for everything from high-level brainstorming to 'vibe coding' ideas into reality.
						</p>
					</div>

					{/* Contact Cards Grid */}
					<div className="mb-20 grid md:grid-cols-3">
						{/* Email Card */}
						<CardSpotlight className="-ml-px -mt-px p-0">
							<div className="bg-gray-50/70 px-8 py-4 border-b border-gray-300">
								<div className="flex items-center gap-3">
									<Mail className="h-5 w-5" />
									<h5>Email</h5>
								</div>
							</div>
							
							<div className="px-8 py-4">
								<div className="mb-4 flex items-center gap-2">
									<span className="">{APP_EMAIL}</span>
									<CopyButton text={APP_EMAIL} />
								</div>
								
							</div>
						</CardSpotlight>

						{/* Office Card */}
						<CardSpotlight className="-ml-px -mt-px p-0">
							<div className="bg-gray-50/70 px-8 py-4 border-b border-gray-300">
								<div className="flex items-center gap-3">
									<MapPin className="h-5 w-5" />
									<h5>Office</h5>
								</div>
							</div>
							
							<div className="px-8 py-4">
								<p className="leading-relaxed">
									Mountain View, CA
								</p>

								<p className="text-sm text-muted-foreground">
									I can come to your office for a chat.
								</p>
							</div>
						</CardSpotlight>

						{/* Phone Card */}
						<CardSpotlight className="-ml-px -mt-px p-0">
							<div className="bg-gray-50/70 px-8 py-4 border-b border-gray-300">
								<div className="flex items-center gap-3">
									<Phone className="h-5 w-5" />
									<h5>Phone</h5>
								</div>
							</div>
							
							<div className="px-8 py-4">
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<span className="">{APP_PHONE}</span>
										<CopyButton text={APP_PHONE} />
									</div>
								</div>

								<p className="text-sm text-muted-foreground">
									24/7 if picked up
								</p>
							</div>
						</CardSpotlight>
					</div>

					{/* Find me online Section */}
					<div className="text-center">
						<h3 className="mb-8">Find me online</h3>
						<div className="flex flex-wrap justify-center gap-4">
							{socialLinks.map((link) => (
								<Button
									key={link.label}
									variant="outline"
									size="lg"
									asChild
									className="gap-2"
								>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										<link.icon className="h-5 w-5" />
										{link.label}
									</a>
								</Button>
							))}
						</div>
					</div>
				</div>
			</footer>
		);
	}
);

Footer.displayName = "Footer";

interface CopyButtonProps {
	text: string;
}

function CopyButton({ text }: CopyButtonProps) {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-6 w-6 disabled:opacity-100"
			onClick={handleCopy}
			aria-label={copied ? 'Copied' : 'Copy to clipboard'}
			disabled={copied}
		>
			<div
				className={cn(
					'transition-all',
					copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
				)}
			>
				<Check className="h-3.5 w-3.5 stroke-emerald-500" aria-hidden="true" />
			</div>
			<div
				className={cn(
					'absolute transition-all',
					copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
				)}
			>
				<Copy aria-hidden="true" className="h-3.5 w-3.5" />
			</div>
		</Button>
	);
}