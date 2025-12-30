// Styles
import "./SiteNavItem.scss";

// Libraries
import { NavLink } from "react-router-dom";

const SiteNavItem = ({
  to,
  label,
  disabled = false,
  icon = null,
  iconPosition = "left",
  onClick,
}) => {
  const isLink = typeof to === "string" && to.length > 0;

  const actionClass = disabled
    ? "nav__item nav__item--inactivelink"
    : "nav__item nav__item--link";

  const hiddenClass = disabled
    ? "nav__item nav__item--hidden nav__item--hideifnull"
    : "nav__item nav__item--hidden";

  const leftIcon =
    icon && iconPosition === "left" ? (
      <span
        className={`${hiddenClass} nav__item__icon nav__item__icon--left`}
        aria-hidden="true"
      >
        {icon}
      </span>
    ) : null;

  const rightIcon =
    icon && iconPosition === "right" ? (
      <span
        className={`${hiddenClass} nav__item__icon nav__item__icon--right`}
        aria-hidden="true"
      >
        {icon}
      </span>
    ) : null;

  const content = (
    <>
      {leftIcon}
      <span className="nav__item__label">{label}</span>
      {rightIcon}
    </>
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
