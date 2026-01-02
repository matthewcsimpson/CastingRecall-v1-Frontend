// Styles
import "./SiteNavItem.scss";

// Libraries
import { NavLink } from "react-router-dom";

const SiteNavItem = ({ to, label, disabled = false, icon = null, onClick }) => {
  const isLink = typeof to === "string" && to.length > 0;

  const actionClass = disabled
    ? "nav__item nav__item--inactivelink"
    : "nav__item nav__item--link";

  const content = (
    <span className="nav__item__content">
      {icon ? (
        <span className="nav__item__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="nav__item__label">{label}</span>
    </span>
  );

  return (
    <li className="nav__item">
      {isLink ? (
        <NavLink className={actionClass} to={to}>
          {content}
        </NavLink>
      ) : (
        <button
          className={`${actionClass} nav__item--button`}
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-haspopup={onClick ? "dialog" : undefined}
        >
          {content}
        </button>
      )}
    </li>
  );
};

export default SiteNavItem;
