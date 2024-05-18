import { useCallback, useEffect, useRef, useState } from "react";
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
			previous: "Back"
		}
	},
	hooks,
};

export default function App({
	form,
	listing })
{
		// use a ref instead of state to store the Formio form instance so that we
		// don't have to recreate the pageChange handler every time the App re-renders.
		// that then causes the Form component to re-render and re-add those event
		// handlers, which seems to deeply confuse Formio.  this way, the event
		// handlers can be created once on mount, and then reference the instance
		// through the ref.
	const instanceRef = useRef();
	const [currentPanelKey, setCurrentPanelKey] = useState();
	const [reviewContainer, setReviewContainer] = useState();
		// make the listing data available wherever JS is eval'd in this form
	const options = {
		...formOptions,
		evalContext: { listing },
	};

	const handleWizardPageSelected = useCallback((panel) => {
			// this event includes the instance of the panel that was clicked, so fish
			// its key out of the component JSON
		setCurrentPanelKey(panel.component.key);
	}, []);

	const handlePageChange = useCallback(({ page }) => {
			// convert the page number into a panel key
		setCurrentPanelKey(instanceRef.value?.currentPanels[page]);
	}, []);

	const handleFormReady = (instance) => {
		if (!instanceRef.value) {
				// when we're first mounted, add a handler to get clicks on the page
				// buttons in the wizard header.  there doesn't appear to be a way of
				// adding this handler via the React Form component itself.
			instance.on("wizardPageSelected", handleWizardPageSelected);
		}

		instanceRef.value = instance;
		setCurrentPanelKey(instance?.currentPanels[instance?.page]);
	};

	useEffect(() => {
		setReviewContainer(document.querySelector("#reviewContainer"));
	}, [currentPanelKey]);

	return (
		<div>
			<Header
				listingName={listing.Name}
				form={form}
				currentPanelKey={currentPanelKey}
			/>
			<Form
				form={form}
				formReady={handleFormReady}
				onNextPage={handlePageChange}
				onPrevPage={handlePageChange}
				onSubmit={console.log}
				options={options}
			/>
			{reviewContainer && createPortal(
				<ReviewSummary data={instanceRef.value?.data} />,
				reviewContainer
			)}
		</div>
	);
}
