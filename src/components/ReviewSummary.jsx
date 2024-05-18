function Section({
	title,
	children })
{
	return (
		<section>
			<h3>{title}</h3>
			{children}
		</section>
	);
}

function Field({
	name,
	children })
{
	return (
		<div>
			<h4>{name}</h4>
			{children}
		</div>
	);
}

export default function ReviewSummary({
	data })
{
	return (
		<>
			<Section title="You">
				<Field name="Name">
					{data.appFirstName} {data.appLastName}
				</Field>
				<Field name="Email">
					{data.email}
				</Field>
			</Section>
			<pre className="review-summary">
				{JSON.stringify(data, null, 2)}
			</pre>
		</>
	);
}
