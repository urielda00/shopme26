import { RefObject, useEffect } from "react";

interface UseIntersectionLoadMoreOptions {
	targetRef: RefObject<HTMLElement | null>;
	enabled: boolean;
	onLoadMore: () => void;
	rootMargin?: string;
}

export const useIntersectionLoadMore = ({
	targetRef,
	enabled,
	onLoadMore,
	rootMargin = "300px",
}: UseIntersectionLoadMoreOptions) => {
	useEffect(() => {
		const target = targetRef.current;

		if (!target || !enabled) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onLoadMore();
				}
			},
			{ rootMargin },
		);

		observer.observe(target);

		return () => observer.disconnect();
	}, [enabled, onLoadMore, rootMargin, targetRef]);
};
