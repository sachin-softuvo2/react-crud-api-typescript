import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllUser from './components/AllUsers'
import CreateUsers from './components/CreateUsers'

const Router = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AllUser/>}/>
            <Route path='/create' element={<CreateUsers/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default Router