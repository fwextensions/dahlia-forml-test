import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import styles from "./Header.module.css";

export default function Header({
	listingName,
	...breadcrumbProps })
{
	return (
		<header>
			<h1 className={styles.title}>{listingName} Application</h1>
			<Breadcrumbs {...breadcrumbProps} />
		</header>
	);
}
