import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Form } from "@formio/react";
import Header from "@/components/Header.jsx";
import ReviewSummary from "@/components/ReviewSummary.jsx";
import hooks from "@/form/hooks.js";

const formOptions = {
	buttonSettings: {
		showCancel: false
	},
	i18n: {
		en: {
			previous: "Back",
			submit: "Confirm",
		}
	},
	hooks,
};

export default function App({
	form,
	listing,
	submission })
{
		// use a ref instead of state to store the Formio form instance so that we
		// don't have to recreate the pageChange handler every time the App re-renders.
		// that then causes the Form component to re-render and re-add those event
		// handlers, which seems to deeply confuse Formio.  this way, the event
		// handlers can be created once on mount, and then reference the instance
		// through the ref.
	const instanceRef = useRef();
	const [currentPanelKey, setCurrentPanelKey] = useState();
		// make the listing data available wherever JS is eval'd in this form
	const options = {
		...formOptions,
		evalContext: { listing },
	};
		// whenever we're rendered, check for the review container, which means
		// we're on the review page and can render the summary in a portal
	const reviewContainer = document.querySelector("#review-container");

	const handleRender = useCallback(({ component }) => {
			// the component prop contains metadata about the current panel that was
			// just rendered, but doesn't include the key at the top level.  so dig it
			// out of the component property, which is the original component JSON.
		const { root, component: { key, properties } } = component;
		const rootClasses = root.element.classList;

		setCurrentPanelKey(key);

		if (!instanceRef.current) {
			instanceRef.current = root;
		}

			// customize the display of the wizard nav buttons based on the current
			// panel's properties
		rootClasses.toggle("hide-nav-buttons", properties.hideNavButtons === true);
		rootClasses.toggle("hide-next-button", properties.hideNextButton === true);
	}, []);

	return (
		<div>
			<Header
				listingName={listing.Name}
				form={form}
				currentPanelKey={currentPanelKey}
			/>
			<Form
				form={form}
				onRender={handleRender}
				onSubmit={console.log}
				options={options}
				submission={submission}
			/>
			{reviewContainer && createPortal(
				<ReviewSummary data={instanceRef.current?.data} />,
				reviewContainer
			)}
		</div>
	);
}
