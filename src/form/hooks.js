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
				.then(({ address }) => data.proposedAddress = address)
				.catch(console.error)
				.finally(next);
		} else {
			return next();
		}
	}
};
