import React, { useState, useMemo, useEffect } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/layout';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import SignupForm from './Components/SignUp/SignUp';
import LoginForm from './Components/Login/Login';
import { useGlobalContext } from './context/globalContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

function App() {
  const [active, setActive] = useState(1);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const global = useGlobalContext();
  console.log(global);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setUsername(user.displayName || '');
      } else {
        setIsSignedIn(false);
        setUsername('');
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const displayData = () => {
    if (initializing) {
      return <div>Loading...</div>; // Show a loading indicator while initializing
    }
    if (!isSignedIn) {
      return showLogin ? (
        <LoginForm onLogin={() => setIsSignedIn(true)} switchToSignup={() => setShowLogin(false)} />
      ) : (
        <SignupForm onSignup={() => setIsSignedIn(true)} switchToLogin={() => setShowLogin(true)} />
      );
    }
    switch(active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4: 
        return <Expenses />;
      default: 
        return <Dashboard />;
    }
  }

  const orbMemo = useMemo(() => <Orb />, []);

  const handleSignOut = () => {
    auth.signOut();
    setIsSignedIn(false);
  };

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {isSignedIn && <Navigation active={active} setActive={setActive} onSignOut={handleSignOut} username={username} />}
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
