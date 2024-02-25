import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/Dashboard';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type='button' className='btn logiut-btn'
        onClick={() => {
          setShowLogout(!showLogout)
        }}
      >
        {user?.avatar ? <img src={user.avatar} alt='avatar' className='img' /> : <FaUserCircle />}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn'
          onClick={logout}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
}

export default LogoutContainer;