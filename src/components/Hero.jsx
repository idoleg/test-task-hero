import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Draw information about the hero with control links – edit and delete
 * @param {String} props.name
 * @param {String} props.description
 * @param {Number} props.id
 * @return {React.ReactElement}
 */
export function Hero({ name, description, id }) {
  return (
    <li>
      <dl>
        <dt>
          <strong>{name}:</strong> {description}
        </dt>
        <dd>
          <Link to={"/update/" + id}>Edit</Link>
          {" | "}
          <Link to={"/delete/" + id}>Delete</Link>
        </dd>
      </dl>
    </li>
  );
}

export const heroPropTypes = (Hero.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});

export default memo(Hero);
