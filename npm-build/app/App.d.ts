/// <reference types="react" />
import './App.scss';
declare type AppPropsType = {
    serverApi: string;
};
declare const App: ({ serverApi }: AppPropsType) => JSX.Element;
export default App;
