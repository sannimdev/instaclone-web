import { HashRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/banana/is'>
                        <h1>Banana Is</h1>
                    </Route>
                    <Route path='/banana'>
                        <h1>Banana</h1>
                    </Route>
                    <Route path='/potato'>
                        <h1>Potato</h1>
                    </Route>
                    <Route path='/' exact>
                        <h1>Home</h1>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
