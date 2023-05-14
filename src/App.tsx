import './App.scss'
import Calendar from './components/Calendar/Calendar'
// import Calendar from './components/Calendar/Calendar'

function App() {

  return (
    <>
     <div className="app">
        <div className="container">
          <div className="header">
            <h1>Home</h1>
          </div>
          <div className="row-1 row">
            <div className="calendar-col col-1">
              <Calendar />
            </div>
            <div className="todo-col col-1"></div>
            <div className="socials-col col-1"></div>
            <div className="historic-col col-1"></div>
          </div>
          <div className="row-2 row"></div>
        </div>
     </div>
    </>
  )
}

export default App
