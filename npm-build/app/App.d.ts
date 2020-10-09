/// <reference types="react" />
import '../lib/css/tachyons.min.css';
import './App.scss';
declare type AppPropsType = {
    serverApi: string;
};
declare const App: ({ serverApi }: AppPropsType) => JSX.Element;
export default App;
