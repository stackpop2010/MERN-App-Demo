import {Link} from 'react-router-dom'


function Navigation(){
    return (
        <nav className="app-nav">
            <Link to="/">
            <button>Home</button></Link>&nbsp;
            
            <Link to="/create-exercise">
            <button>Create</button></Link>
            
        </nav>
    )
}

export default Navigation;

