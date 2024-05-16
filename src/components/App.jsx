import { useCallback, useRef, useState } from "react";
import { Form } from "@formio/react";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";

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
		// make the listing data available wherever JS is eval'd in this form
	const options = {
		evalContext: { listing }
	};

	const handleWizardPageSelected = useCallback((panel) => {
			// this event includes the instance of the panel that was clicked, so fish
			// its key out of the component JSON
		setCurrentPanelKey(panel.component.key);
	}, []);

	const handlePageChange = useCallback(({ page }) => {
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

	return (
		<div>
			<h1>{listing.Name} Application</h1>
			<Breadcrumbs
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
		</div>
	);
}
