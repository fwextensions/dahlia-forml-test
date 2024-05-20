import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App.jsx";
import { generateForm } from "@/form/generateForm.js";
import formData from "../form.yaml";
import submission from "../submission.yaml";
import { listing } from "../listing.json";
import "./global.css";

let form;
let errorMessage;

try {
	form = generateForm(formData);
} catch (e) {
	errorMessage = e.message;
}

console.log(form);

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
