import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel, faBed, faHouse } from "@fortawesome/free-solid-svg-icons";

export default function HotelTypeTag(props) {
	let typeIcon = faHotel;

	switch (props.type) {
		case "Hotel":
			typeIcon = faHotel;
			break;
		case "B&B":
			typeIcon = faBed;
			break;
		case "Guesthouse":
			typeIcon = faHouse;
			break;
	}

	return (
		<div className={`${props.className ? props.className : ""} hotel-type-tag`}>
			<FontAwesomeIcon icon={typeIcon} />
			<span>{props.type}</span>
		</div>
	);
}

HotelTypeTag.propTypes = {
	type: PropTypes.string.isRequired,
};
