import { Fragment } from "react";
import styles from "./ReviewSummary.module.css";

function Section({
	title,
	children })
{
	return (
		<section>
			<h3>{title}</h3>
			<div>
				{children}
			</div>
		</section>
	);
}

function Field({
	name,
	children })
{
	if (!children) {
		return null;
	}

	return (
		<dl>
			<dt>{name}</dt>
			<dd>
				{children}
			</dd>
		</dl>
	);
}

function HouseholdMembers({
	members })
{
	let children = <Field>None</Field>;

	if (members.length) {
		children = members.map((member) => {
			const { firstName, lastName, relationship, dob } = member;
			const key = firstName + lastName + dob;

			return (
				<Fragment key={key}>
					<Field name="Name">
						{firstName} {lastName}
						<label>{relationship}</label>
					</Field>
					<Field name="Date of Birth">
						{dob}
					</Field>
				</Fragment>
			);
		});
	}

	return (
		<Section title="Household Members">
			{children}
		</Section>
	);
}

export default function ReviewSummary({
	data })
{
	return (
		<div className={styles.review}>
			<Section title="You">
				<Field name="Name">
					{data.firstName} {data.lastName}
				</Field>
				<Field name="Date of Birth">
					{data.dob}
				</Field>
				<Field name="Email">
					{data.email}
				</Field>
				<Field name="Phone Number">
					{data.phoneNumber}
				</Field>
				<Field name="Address">
					{data.proposedAddress}
				</Field>
			</Section>

			<HouseholdMembers
				members={data.householdMembers}
			/>

			<Section title="Income">
				<Field name="Housing Voucher or Rental Subsidy">
					{data.receiveVouchers ? "Yes" : "None"}
				</Field>
				<Field name="Income">
					${data.householdIncome} per {data.incomeTimePeriod}
				</Field>
			</Section>

			<Section title="Preferences">
				<Field>None</Field>
			</Section>

			<Section title="More About You">
				<Field>None</Field>
			</Section>
		</div>
	);
}
