import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import { generateForm } from "@/form/generateForm.js";
import formData from "../form.yaml";
import data from "../submission.yaml";
import { listing } from "../listing.json";
import "./fonts.css";
import "./global.css";

	// Formio expects the submission data to be on a `data` property
const submission = { data };
let form;
let errorMessage;

try {
	form = generateForm(formData);
} catch (e) {
	errorMessage = e.message;
}

console.log("JSON from form.yaml", form);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{errorMessage
			? <p className="alert-warning">{errorMessage}</p>
			: <App
					form={form}
					listing={listing}
					submission={submission}
				/>
		}
	</React.StrictMode>,
);
