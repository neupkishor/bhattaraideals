import type { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ProgressBar } from '@/components/layout/progress-bar';
import { SiteHeadLayout } from '@/components/sitehead/sitehead';

export interface BaseLayoutProps {
	children: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	headChildren?: ReactNode;
	bodyPrefix?: ReactNode;
	bodySuffix?: ReactNode;
	htmlLang?: string;
	htmlClassName?: string;
	bodyClassName?: string;
	mainClassName?: string;
}

export function BaseLayout({
	children,
	header = <Header />,
	footer = <Footer />,
	headChildren,
	bodyPrefix,
	bodySuffix,
	htmlLang,
	htmlClassName,
	bodyClassName,
	mainClassName,
}: BaseLayoutProps) {
	return (
		<SiteHeadLayout
			headChildren={
				<>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
						rel="stylesheet"
					/>
					{headChildren}
				</>
			}
			header={header}
			footer={footer}
			bodyPrefix={
				<>
					<ProgressBar />
					{bodyPrefix}
				</>
			}
			bodySuffix={
				<>
					{bodySuffix}
					<Toaster />
				</>
			}
			htmlLang={htmlLang}
			htmlClassName={htmlClassName}
			bodyClassName={bodyClassName}
			mainClassName={mainClassName}
		>
			{children}
		</SiteHeadLayout>
	);
}
