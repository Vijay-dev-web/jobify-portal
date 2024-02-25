import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDashboardContext } from '../pages/Dashboard';
import Wrapper from '../assets/wrappers/ThemeToggle';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {
        isDarkTheme ? (
          <BsFillMoonFill className='toggle-icon' />
        ) :
          (
            <BsFillSunFill />
          )
      }
    </Wrapper>
  )
}

export default ThemeToggle;
