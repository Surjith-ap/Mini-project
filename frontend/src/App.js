import React, {useState, useMemo, useEffect} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import LoginPage from './Components/login/Login';
import SignUppage from './Components/signup/SignUp';



function App() {
  const [active, setActive] = useState(1);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token'));

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])


  const router = createBrowserRouter([
    {
      path: '/',
      element:  <LoginPage />
    },
    {
      path: '/login',
      element:  <LoginPage />
    },
    {
      path: '/dashboard',
      element:  <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled> 
    },
    {
      path: '/signup',
      element: <SignUppage />
    }
  ])



  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;