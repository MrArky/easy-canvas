import React, { Suspense } from 'react';
import logo from './../logo.svg';
import '@/layout/DemoLayout.less';
import { HashRouter, Navigate, PathRouteProps, Route, Routes } from 'react-router-dom';

const Layout: React.FC = () => {
  const desc: (PathRouteProps & { title: string; conponent?: any; })[] = [
    { title: '实现像使用dom一样绘制对象元素', path: '/hello-world', conponent: React.lazy(() => import('../pages/HelloWorld')) },
  ]
  return (
    <div className='DemoLayout'>
      <div className='layout' style={{ flexDirection: 'column' }}>
        <header>
          <img className='logo' src={logo} alt='logo' />
          <strong>
            EASYCANVAS
          </strong>
        </header>
        <div className='content'>
          <div className='sider'>
            <ul style={{ listStyle: 'circle', paddingRight: 5 }}>
              {desc.map((c, i) => <li key={i}>
                <a href={'#' + (c.path?.startsWith('/') ? '' : '/') + c.path}>{c?.title}</a>
              </li>)}
            </ul>
          </div>
          <div className='content' style={{ padding: '0 10px' }}>
            <HashRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/hello-world' />}></Route>
                {desc.map((c, i) => <Route key={i} path={c.path} element={<Suspense>
                  <c.conponent />
                </Suspense>} />)}
              </Routes>
            </HashRouter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
