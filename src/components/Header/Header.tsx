import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LeftArrow, MainLogo } from '../../assets';
import { PATHS } from '../../constants/PATHS';
import * as S from './Header.style';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === PATHS.ROOT || location.pathname === PATHS.ERROR;
  const isOrderConfirmPage = location.pathname === PATHS.ORDER_CONFIRM;

  const MainLogoButton = (
    <Link to={PATHS.ROOT}>
      <img src={MainLogo} alt="메인 로고" />
    </Link>
  );

  const GoBackButton = (
    <S.GoBackButton onClick={() => navigate(-1)}>
      <img src={LeftArrow} alt="뒤로 가기" />
    </S.GoBackButton>
  );

  return (
    <S.HeaderWrapper>
      {isMainPage && MainLogoButton}
      {isOrderConfirmPage && GoBackButton}
    </S.HeaderWrapper>
  );
}

export default Header;
