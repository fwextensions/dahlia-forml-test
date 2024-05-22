export default {
	beforeNext(
		currentPage,
		submission,
		next)
	{
		if (currentPage.key === "contact") {
			const { data } = submission;
			const { homeAddress } = data;

			fetch("https://track-interest.vercel.app/dahlia/addresses/validate.json", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					address: { ...homeAddress }
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
