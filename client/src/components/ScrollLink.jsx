import { useNavigate } from 'react-router-dom';
import { scrollToId } from '../scroll.js';

export default function ScrollLink({ id, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const href = id === 'home' ? '/' : `/#${id}`;
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        if (!scrollToId(id)) navigate(href); // e.g. coming from /admin
      }}
    >
      {children}
    </a>
  );
}
