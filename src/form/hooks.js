export default {
	beforeNext(
		currentPage,
		submission,
		next)
	{
		if (currentPage.key === "contact") {
			const { data } = submission;

			fetch("https://track-interest.vercel.app/dahlia/addresses/validate.json", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					address: {
						street1: data.appStreet1,
						street2: data.appStreet2,
						city: data.appCity,
						state: data.appState,
						zip: data.appZip
					}
				})
			})
				.then(res => res.json())
				.then(({ address }) => {
					data.proposedAddress =
						`${address.street1} ${address.street2}, ${address.city}, ${address.state} ${address.zip}`;
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(next);
		} else {
			return next();
		}
	}
};
