// Minimal helper for tests. Most components here return concrete Instances,
// so we just provide a typed destroy wrapper when needed.
export function wrapInstance<T extends Instance>(instance: T) {
	return { instance, destroy: () => instance.Destroy() };
}
