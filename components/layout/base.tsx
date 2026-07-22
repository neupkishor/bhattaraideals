import { Suspense, type ReactNode } from 'react';
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
					{headChildren}
				</>
			}
			header={header}
			footer={footer}
			bodyPrefix={
				<>
					<Suspense fallback={null}>
						<ProgressBar />
					</Suspense>
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
