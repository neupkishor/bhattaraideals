import type { ReactNode } from 'react';
import siteHeadConfig from './sitehead.json';

export interface SiteHeadNode {
	tag: 'meta' | 'script' | 'noscript' | 'link';
	props?: Record<string, string | number | boolean | undefined>;
	html?: string;
}

export interface SiteHeadConfig {
	head?: SiteHeadNode[];
	body?: SiteHeadNode[];
}

export interface SiteHeadLayoutProps {
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

const config = siteHeadConfig as SiteHeadConfig;

function renderNode(node: SiteHeadNode, index: number) {
	const key = `${node.tag}-${index}`;

	if (node.tag === 'meta') {
		return <meta key={key} {...node.props} />;
	}

	if (node.tag === 'link') {
		return <link key={key} {...node.props} />;
	}

	if (node.tag === 'noscript') {
		return <noscript key={key} dangerouslySetInnerHTML={{ __html: node.html ?? '' }} />;
	}

	return <script key={key} {...node.props} dangerouslySetInnerHTML={{ __html: node.html ?? '' }} />;
}

export function SiteHeadHead() {
	return <>{(config.head ?? []).map(renderNode)}</>;
}

export function SiteHeadBody({ children }: { children: ReactNode }) {
	return (
		<>
			{(config.body ?? []).map(renderNode)}
			{children}
		</>
	);
}

export function SiteHeadLayout({
	children,
	header,
	footer,
	headChildren,
	bodyPrefix,
	bodySuffix,
	htmlLang = 'en',
	htmlClassName = 'scroll-smooth',
	bodyClassName = 'font-body antialiased',
	mainClassName = 'min-h-screen',
}: SiteHeadLayoutProps) {
	return (
		<html lang={htmlLang} className={htmlClassName}>
			<head>
				{headChildren}
				<SiteHeadHead />
			</head>
			<body className={bodyClassName}>
				{bodyPrefix}
				{header}
				<main className={mainClassName}>
					<SiteHeadBody>{children}</SiteHeadBody>
				</main>
				{footer}
				{bodySuffix}
			</body>
		</html>
	);
}

