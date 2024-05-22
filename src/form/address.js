import skeleton from "./address.yaml";

export function address(
	data,
	context)
{
		// create a copy of the skeleton so each component is separate
	const component = JSON.parse(JSON.stringify(skeleton));

	component.key = data.key;

	return component;
}
