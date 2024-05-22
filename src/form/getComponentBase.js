import { panelGroup } from "@/form/panelGroup.js";
import { address } from "@/form/address.js";

const TableInputTrue = {
	tableView: true,
	input: true,
};
const TableInputFalse = {
	tableView: false,
	input: false,
};
const ComponentProperties = [
	["panel", {
		collapsible: false,
	}],
	["textfield"],
	["email", {
		validateOn: "blur",
	}],
	["phoneNumber", {
		inputMask: "999-999-9999",
		validateOn: "blur",
	}],
	["number", {
		delimiter: false,
		requireDecimal: false,
		inputFormat: "plain",
		truncateMultipleSpaces: false,
		validateOn: "blur",
	}],
	["checkbox"],
	["radio"],
	["day", {
		hideInputLabels: true,
		fields: {
			day: {
				placeholder: "Day",
				hide: false
			},
			month: {
				placeholder: "Month",
				hide: false
			},
			year: {
				placeholder: "Year",
				hide: false
			}
		},
	}],
	["button"],
	["selectboxes", {
		inputType: "checkbox",
	}],
	["select", {
		widget: "html5",
		searchEnabled: false,
	}],
	["fieldSet",
		TableInputFalse
	],
	["container", {
		hideLabel: true,
		...TableInputFalse
	}],
	["editgrid",
		TableInputFalse
	],
	["htmlelement", {
		// since we allow just the tag key to be included, make sure the actual
		// type is specified as well
		type: "htmlelement",
		...TableInputFalse,
	}],
	["columns",
		TableInputFalse
	],
	["file",
		TableInputTrue
	],
];
export const ComponentBases = ComponentProperties.reduce((
	result,
	[key, props]) => ({
	...result,
	[key]: {
		...TableInputTrue,
		...props
	},
}), {
		// we don't want to add any defaults to these components, but we do want
		// them in this hash so they're not treated as unknown types
	form: {},
	panelGroup,
	address,
});

export function getComponentBase(
	componentData)
{
	return ComponentBases[componentData.type || (componentData.tag && "htmlelement")];
}
