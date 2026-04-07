import type { ReactNode } from 'react';
import siteHeadConfig from './sitehead.json';

type SiteHeadNode = {
	tag: 'meta' | 'script' | 'noscript' | 'link';
	props?: Record<string, string | number | boolean | undefined>;
	html?: string;
};

type SiteHeadConfig = {
	head?: SiteHeadNode[];
	body?: SiteHeadNode[];
};

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

