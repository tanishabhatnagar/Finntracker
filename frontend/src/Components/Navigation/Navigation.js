import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout, menuIcon } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';

function Navigation({ active, setActive, onSignOut, username }) {
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNavVisibility = () => {
        setIsNavVisible(!isNavVisible);
    };

    const handleMenuItemClick = (id) => {
        setActive(id);
        setIsNavVisible(false);
    };

    return (
        <>
            <NavButtonStyled onClick={toggleNavVisibility}>
                {menuIcon}
            </NavButtonStyled>
            <NavStyled isNavVisible={isNavVisible.toString()}>
                <div className="user-con">
                    <img src={avatar} alt="User avatar" />
                    <div className="text">
                        <h2>{username}</h2>
                        <p>Your Money</p>
                    </div>
                </div>
                <ul className="menu-items">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleMenuItemClick(item.id)}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
                <div className="bottom-nav">
                    <li onClick={onSignOut}>
                        {signout} Sign Out
                    </li>
                </div>
            </NavStyled>
        </>
    );
}

const NavButtonStyled = styled.button`
    display: none;
    background: none;
    border: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    font-size: 2rem;
    z-index: 2001;
    cursor: pointer;

    svg {
        fill: black;
    }

    @media (max-width: 768px) {
        display: block;
    }
`;

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    transform: translateX(${props => (props.isNavVisible === 'true' ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;

    .user-con {
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2 {
            color: rgba(34, 34, 96, 1);
        }
        p {
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active {
        color: rgba(34, 34, 96, 1) !important;
        i {
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav {
        li {
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i {
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    @media (max-width: 768px) {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 2000;
        width: 100%;
        border-radius: 0;
    }

    @media (min-width: 769px) {
        transform: none;
        transition: none;
        position: static;
        width: 374px;
    }
`;

export default Navigation;
