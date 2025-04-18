import { Outlet } from 'react-router';
import { Fragment, useContext } from 'react';

import './navigation.styles.jsx';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

import {NavigationContainer, LogoContainer,NavLinks,NavLink} from './navigation.styles.jsx'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector.js';

const Navigation = () => {

//const {currentUser} = useContext(UserContext);
const currentUser = useSelector(selectCurrentUser);
//console.log( currentUser);
 const {isCartOpen} = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
      <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink className="nav-link" to="/auth">
            SIGN IN
          </NavLink> )}
          <CartIcon />
          
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
