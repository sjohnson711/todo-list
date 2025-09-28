import { NavLink } from "react-router";
import styles from "styled-components";

const StyledLink = styles(NavLink)`
    color: gray
    text-decoration: none;
    padding: 8px 16px;

    &.active {
        color: blue
    }

    &.inactive {
        color: gray
    }
`;

const h1 = styles.h1`
    align-content: center;
`;

export default function Header({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.active : styles.active
          }
        >
          About
        </NavLink>
      </nav>
    </div>
  );
}
